'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Database,
  LayoutDashboard,
  LogOut,
  Minus,
  Package,
  Pencil,
  Plus,
  Receipt,
  RefreshCw,
  Save,
  Search,
  Shield,
  ShieldAlert,
  User as UserIcon,
  Users,
} from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';
import { getAdminEmails } from '@/lib/auth/roles';
import { getAllUserProfiles, type UserProfile } from '@/lib/firebase/users';
import {
  fetchLiveCatalog,
  getAllOrders,
  seedBaselineCatalog,
  updateVariantStock,
  type StoredOrder,
} from '@/lib/firebase/catalog';
import type { Product } from '@/lib/data/products';
import type { Category, CategorySlug } from '@/lib/data/categories';
import { siteConfig } from '@/lib/data/site';
import { PageBackgroundSet } from '@/components/editorial/PageBackgroundSet';
import { OatSheet } from '@/components/editorial/OatSheet';
import { GlowInput } from '@/components/ui/GlowInput';
import { GlowButton } from '@/components/ui/GlowButton';
import { Skeleton } from '@/components/ui/Skeleton';
import { ProductImageWithFallback } from '@/components/ui/ProductImageWithFallback';
import { AdminAddProductModal } from '@/components/auth/AdminAddProductModal';

interface AdminDashboardClientProps {
  products: Product[];
  categories: Category[];
}

type AdminPanel = 'dashboard' | 'users' | 'catalog' | 'orders' | 'security';
type RoleFilter = 'all' | 'customer' | 'admin';

function formatJoinDate(iso?: string): string {
  if (!iso) return '—';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function formatProviders(providers?: string[]): string[] {
  if (!providers || providers.length === 0) return [];
  return providers.map((p) => {
    if (p === 'google.com') return 'Google';
    if (p === 'password') return 'Email & Password';
    return p;
  });
}

export function AdminDashboardClient({
  products: initialProducts,
  categories,
}: AdminDashboardClientProps) {
  const router = useRouter();
  const { user, loading, isAdmin, configured, signOut } = useAuth();

  const [activePanel, setActivePanel] = useState<AdminPanel>('dashboard');
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Catalog section drill-down ('all' shows all flat, null shows category section cards, CategorySlug shows that section)
  const [selectedSection, setSelectedSection] = useState<CategorySlug | 'all' | null>(null);

  // Live catalog & stock drafts
  const [catalogProducts, setCatalogProducts] = useState<Product[]>(initialProducts);
  const [stockDrafts, setStockDrafts] = useState<Record<string, number>>({});
  const [savingVariantKey, setSavingVariantKey] = useState<string | null>(null);
  const [catalogMessage, setCatalogMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [seedingCatalog, setSeedingCatalog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);

  const [usersState, setUsersState] = useState<{
    loading: boolean;
    rows: UserProfile[];
    error: string | null;
  }>({
    loading: configured,
    rows: [],
    error: null,
  });

  const [ordersState, setOrdersState] = useState<{
    loading: boolean;
    rows: StoredOrder[];
    error: string | null;
  }>({
    loading: configured,
    rows: [],
    error: null,
  });

  const fetchUsers = useCallback(async () => {
    setUsersState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const rows = await getAllUserProfiles();
      setUsersState({ loading: false, rows, error: null });
    } catch (err) {
      setUsersState({
        loading: false,
        rows: [],
        error:
          err instanceof Error
            ? err.message
            : 'Unable to load users. Check Firestore rules for admin access.',
      });
    }
  }, []);

  const refreshCatalog = useCallback(async () => {
    const live = await fetchLiveCatalog();
    setCatalogProducts(live);
  }, []);

  const fetchOrders = useCallback(async () => {
    setOrdersState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const rows = await getAllOrders();
      setOrdersState({ loading: false, rows, error: null });
    } catch (err) {
      setOrdersState({
        loading: false,
        rows: [],
        error:
          err instanceof Error
            ? err.message
            : 'Unable to load orders. Check Firestore rules.',
      });
    }
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login?next=/admin');
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (loading || !user || !isAdmin || !configured) return;

    let active = true;
    getAllUserProfiles()
      .then((rows) => {
        if (active) setUsersState({ loading: false, rows, error: null });
      })
      .catch((err) => {
        if (active) {
          setUsersState({
            loading: false,
            rows: [],
            error:
              err instanceof Error
                ? err.message
                : 'Unable to load users. Check Firestore rules for admin access.',
          });
        }
      });

    getAllOrders()
      .then((rows) => {
        if (active) setOrdersState({ loading: false, rows, error: null });
      })
      .catch((err) => {
        if (active) {
          setOrdersState({
            loading: false,
            rows: [],
            error:
              err instanceof Error
                ? err.message
                : 'Unable to load orders. Check Firestore rules.',
          });
        }
      });

    fetchLiveCatalog().then((live) => {
      if (active) setCatalogProducts(live);
    });

    return () => {
      active = false;
    };
  }, [loading, user, isAdmin, configured]);

  const usersList = usersState.rows;
  const usersLoading = usersState.loading;
  const usersError = usersState.error;

  const ordersList = ordersState.rows;
  const ordersLoading = ordersState.loading;
  const ordersError = ordersState.error;

  const userStats = useMemo(() => {
    const customers = usersList.filter((u) => u.role === 'customer').length;
    const admins = usersList.filter((u) => u.role === 'admin').length;
    const dualLogin = usersList.filter(
      (u) => u.authProviders?.includes('google.com') && u.authProviders?.includes('password')
    ).length;
    return { total: usersList.length, customers, admins, dualLogin };
  }, [usersList]);

  const filteredUsers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return usersList.filter((u) => {
      if (roleFilter !== 'all' && u.role !== roleFilter) return false;
      if (!q) return true;
      return (
        u.email.toLowerCase().includes(q) ||
        (u.displayName || '').toLowerCase().includes(q) ||
        (u.phone || '').includes(q)
      );
    });
  }, [usersList, roleFilter, searchQuery]);

  // Per-category summary cards (photo, product count, variant count, total stock, low-stock alert)
  const sectionSummaries = useMemo(() => {
    return categories.map((cat) => {
      const items = catalogProducts.filter((p) => p.categorySlug === cat.slug);
      const variantCount = items.reduce((sum, p) => sum + p.variants.length, 0);
      const totalStock = items.reduce(
        (sum, p) => sum + p.variants.reduce((s, v) => s + v.stock, 0),
        0
      );
      const outOfStockCount = items.reduce(
        (sum, p) => sum + p.variants.filter((v) => v.stock <= 0).length,
        0
      );
      const lowStockCount = items.reduce(
        (sum, p) => sum + p.variants.filter((v) => v.stock > 0 && v.stock <= 10).length,
        0
      );
      return {
        category: cat,
        productCount: items.length,
        variantCount,
        totalStock,
        outOfStockCount,
        lowStockCount,
      };
    });
  }, [categories, catalogProducts]);

  const activeSectionCategory = useMemo(
    () =>
      selectedSection && selectedSection !== 'all'
        ? categories.find((c) => c.slug === selectedSection) ?? null
        : null,
    [categories, selectedSection]
  );

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return catalogProducts.filter((p) => {
      if (selectedSection && selectedSection !== 'all' && p.categorySlug !== selectedSection) {
        return false;
      }
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.variants.some((v) => v.sku.toLowerCase().includes(q))
      );
    });
  }, [catalogProducts, selectedSection, searchQuery]);

  const totalStockUnits = useMemo(
    () => catalogProducts.reduce((sum, p) => sum + p.variants.reduce((s, v) => s + v.stock, 0), 0),
    [catalogProducts]
  );

  const getDraftStock = (productId: string, variantId: string, fallbackStock: number) => {
    const key = `${productId}:${variantId}`;
    return key in stockDrafts ? stockDrafts[key] : fallbackStock;
  };

  const setDraftStock = (productId: string, variantId: string, value: number) => {
    const key = `${productId}:${variantId}`;
    setStockDrafts((prev) => ({
      ...prev,
      [key]: Math.max(0, Math.floor(Number.isFinite(value) ? value : 0)),
    }));
  };

  const handleSaveVariantStock = async (product: Product, variantId: string, currentStock: number) => {
    const key = `${product.id}:${variantId}`;
    const nextStock = getDraftStock(product.id, variantId, currentStock);
    setSavingVariantKey(key);
    setCatalogMessage(null);
    try {
      const updated = await updateVariantStock(product, variantId, nextStock);
      setCatalogProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      setCatalogMessage({
        type: 'success',
        text: `Updated ${product.name} (${updated.variants.find((v) => v.id === variantId)?.weight}) stock to ${nextStock}.`,
      });
    } catch (err) {
      setCatalogMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Unable to save stock update.',
      });
    } finally {
      setSavingVariantKey(null);
    }
  };

  const handleSeedCatalog = async () => {
    setSeedingCatalog(true);
    setCatalogMessage(null);
    try {
      const count = await seedBaselineCatalog();
      await refreshCatalog();
      setCatalogMessage({
        type: 'success',
        text:
          count > 0
            ? `Synced ${count} baseline harvests to Firestore.`
            : 'All baseline harvests are already synced in Firestore.',
      });
    } catch (err) {
      setCatalogMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Unable to sync catalog to Firestore.',
      });
    } finally {
      setSeedingCatalog(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-[100dvh] bg-navy pt-28 px-4 max-w-6xl mx-auto space-y-5">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-80 w-full" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <PageBackgroundSet
        page="signature"
        chapters={[
          {
            id: 'admin-denied',
            chapterNumber: '01',
            chapterLabel: 'Restricted',
            compact: true,
            content: (
              <div className="max-w-lg mx-auto pt-8">
                <OatSheet tone="warm" interactive={false} className="p-8 text-center space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-[6px] bg-flame/20 border border-flame/45 flex items-center justify-center text-peach">
                    <ShieldAlert className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <h1 className="font-display text-3xl text-oat font-medium">
                    Admin Access Restricted
                  </h1>
                  <p className="text-sm text-sand">
                    Signed in as <strong className="text-oat">{user.email}</strong>. This workspace is
                    reserved for authorized {siteConfig.name} administrators only.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 pt-2">
                    <GlowButton href="/dashboard" variant="cta">
                      Go to My Dashboard
                    </GlowButton>
                    <GlowButton href="/shop" variant="secondary">
                      Back to Store
                    </GlowButton>
                  </div>
                </OatSheet>
              </div>
            ),
          },
        ]}
      />
    );
  }

  const navItems: Array<{
    id: AdminPanel;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
  }> = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users, badge: usersList.length },
    { id: 'catalog', label: 'Catalog', icon: Package, badge: catalogProducts.length },
    { id: 'orders', label: 'Orders', icon: Receipt, badge: ordersList.length },
    { id: 'security', label: 'Admin Roles', icon: Shield },
  ];

  const showSectionGrid =
    activePanel === 'catalog' && selectedSection === null && searchQuery.trim().length === 0;

  return (
    <>
      {showProductModal && (
        <AdminAddProductModal
          categories={categories}
          initialProduct={editingProduct}
          defaultCategorySlug={
            selectedSection && selectedSection !== 'all' ? selectedSection : undefined
          }
          onClose={() => {
            setShowProductModal(false);
            setEditingProduct(null);
          }}
          onSaved={(saved, isEdit) => {
            setCatalogProducts((prev) => {
              const exists = prev.some((p) => p.id === saved.id);
              if (exists) {
                return prev.map((p) => (p.id === saved.id ? saved : p));
              }
              return [saved, ...prev];
            });
            setShowProductModal(false);
            setEditingProduct(null);
            setCatalogMessage({
              type: 'success',
              text: isEdit
                ? `Saved changes to "${saved.name}".`
                : `"${saved.name}" published to the live store catalog!`,
            });
          }}
        />
      )}

      <PageBackgroundSet
        page="signature"
        chapters={[
          {
            id: 'admin-01',
            chapterNumber: '01',
            chapterLabel: 'Admin Studio',
            compact: true,
            content: (
              <div className="max-w-6xl mx-auto pt-2 sm:pt-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                  {/* Left Sidebar Navigation */}
                  <aside className="lg:col-span-3 lg:sticky lg:top-24">
                    <OatSheet tone="medium" interactive={false} className="p-4 sm:p-5 space-y-4">
                      <div className="flex items-center gap-3 pb-3.5 border-b border-white/15">
                        <div className="w-10 h-10 rounded-[6px] bg-flame text-navy flex items-center justify-center shrink-0">
                          <Shield className="w-5 h-5" aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <span className="font-ui-label text-[9px] text-peach block">
                            {siteConfig.name} Admin
                          </span>
                          <p className="text-xs font-medium text-oat truncate">{user.email}</p>
                        </div>
                      </div>

                      <nav aria-label="Admin sections" className="flex lg:flex-col gap-1.5 overflow-x-auto pb-1 lg:pb-0">
                        {navItems.map((item) => {
                          const Icon = item.icon;
                          const active = activePanel === item.id;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => {
                                setActivePanel(item.id);
                                setSearchQuery('');
                                if (item.id === 'catalog') {
                                  setSelectedSection(null);
                                }
                              }}
                              aria-current={active ? 'page' : undefined}
                              className={`flex items-center justify-between gap-2.5 px-3.5 py-2.5 rounded-[6px] text-xs font-medium transition-colors whitespace-nowrap cursor-pointer shrink-0 lg:w-full ${
                                active
                                  ? 'bg-flame text-navy font-semibold shadow-sm'
                                  : 'bg-oat/[0.06] text-oat hover:bg-oat/[0.14] border border-white/10'
                              }`}
                            >
                              <span className="inline-flex items-center gap-2.5">
                                <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                                <span>{item.label}</span>
                              </span>
                              {typeof item.badge === 'number' && (
                                <span
                                  className={`font-ui-label text-[10px] px-2 py-0.5 rounded-[4px] tabular-nums ${
                                    active
                                      ? 'bg-navy/15 text-navy font-semibold'
                                      : 'bg-oat/15 text-peach'
                                  }`}
                                >
                                  {item.badge}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </nav>

                      <div className="pt-3 border-t border-white/15 flex lg:flex-col gap-2">
                        <GlowButton href="/dashboard" variant="secondary" size="sm" className="w-full justify-start">
                          <UserIcon className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>My Dashboard</span>
                        </GlowButton>
                        <GlowButton
                          type="button"
                          variant="outline"
                          size="sm"
                          className="w-full justify-start"
                          onClick={async () => {
                            await signOut();
                            router.push('/');
                          }}
                        >
                          <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Sign Out</span>
                        </GlowButton>
                      </div>
                    </OatSheet>
                  </aside>

                  {/* Right Active Panel Content */}
                  <div className="lg:col-span-9 space-y-5">
                    {activePanel === 'dashboard' && (
                      <>
                        <OatSheet tone="subtle" interactive={false} className="p-5 sm:p-6">
                          <span className="font-ui-label text-[10px] text-peach block mb-1">
                            Overview
                          </span>
                          <h1 className="font-display text-3xl sm:text-4xl text-oat font-medium leading-none mb-2">
                            Store &amp; Client Dashboard
                          </h1>
                          <p className="text-xs sm:text-sm text-sand">
                            Live snapshot of signed-up clients, placed orders, and real-time pack inventory.
                          </p>
                        </OatSheet>

                        {/* KPI Cards */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                          <OatSheet tone="medium" interactive={false} className="p-4">
                            <span className="font-ui-label text-[9px] text-peach block mb-1">
                              Total Clients
                            </span>
                            <span className="font-display text-3xl text-oat font-semibold tabular-nums">
                              {usersLoading ? '…' : userStats.total}
                            </span>
                            <span className="text-[11px] text-sand block mt-1">
                              {userStats.customers} customers · {userStats.admins} admins
                            </span>
                          </OatSheet>

                          <OatSheet tone="medium" interactive={false} className="p-4">
                            <span className="font-ui-label text-[9px] text-peach block mb-1">
                              Orders Recorded
                            </span>
                            <span className="font-display text-3xl text-oat font-semibold tabular-nums">
                              {ordersLoading ? '…' : ordersList.length}
                            </span>
                            <span className="text-[11px] text-sand block mt-1">
                              Auto-subtracts stock
                            </span>
                          </OatSheet>

                          <OatSheet tone="medium" interactive={false} className="p-4">
                            <span className="font-ui-label text-[9px] text-peach block mb-1">
                              Active Harvests
                            </span>
                            <span className="font-display text-3xl text-oat font-semibold tabular-nums">
                              {catalogProducts.length}
                            </span>
                            <span className="text-[11px] text-sand block mt-1">
                              Across {categories.length} sections
                            </span>
                          </OatSheet>

                          <OatSheet tone="medium" interactive={false} className="p-4">
                            <span className="font-ui-label text-[9px] text-peach block mb-1">
                              Total Pack Stock
                            </span>
                            <span className="font-display text-3xl text-oat font-semibold tabular-nums">
                              {totalStockUnits}
                            </span>
                            <span className="text-[11px] text-sand block mt-1">
                              Small-batch units
                            </span>
                          </OatSheet>
                        </div>

                        {/* Recent Registered Clients Preview */}
                        <OatSheet tone="subtle" interactive={false} className="p-5 sm:p-6 space-y-4">
                          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/15">
                            <div>
                              <h2 className="font-display text-2xl text-oat font-medium">
                                Recent Client Signups
                              </h2>
                              <p className="text-xs text-sand">
                                Latest accounts created on {siteConfig.name}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setActivePanel('users')}
                              className="inline-flex items-center gap-1.5 font-ui-label text-[10px] text-peach hover:text-oat cursor-pointer"
                            >
                              <span>View All {usersList.length} Users</span>
                              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                            </button>
                          </div>

                          {usersError && (
                            <div className="p-3.5 rounded-[6px] border border-flame/50 bg-flame/15 text-xs text-oat flex items-start gap-2.5">
                              <AlertCircle className="w-4 h-4 text-peach shrink-0 mt-0.5" aria-hidden="true" />
                              <span>{usersError}</span>
                            </div>
                          )}

                          {usersLoading ? (
                            <div className="space-y-2">
                              <Skeleton className="h-12 w-full" />
                              <Skeleton className="h-12 w-full" />
                            </div>
                          ) : usersList.length === 0 ? (
                            <p className="text-xs text-sand py-4">No signed-up users recorded yet.</p>
                          ) : (
                            <div className="divide-y divide-white/10">
                              {usersList.slice(0, 5).map((u) => (
                                <div
                                  key={u.uid}
                                  className="py-3 flex flex-wrap items-center justify-between gap-3 text-xs"
                                >
                                  <div>
                                    <p className="font-semibold text-oat">{u.displayName || '—'}</p>
                                    <p className="text-sand">{u.email}</p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`font-ui-label text-[9px] px-2 py-0.5 rounded-[4px] ${
                                        u.role === 'admin'
                                          ? 'bg-flame text-navy font-semibold'
                                          : 'bg-oat/15 text-oat border border-white/20'
                                      }`}
                                    >
                                      {u.role}
                                    </span>
                                    <span className="text-[11px] text-sand">
                                      {formatJoinDate(u.createdAt)}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </OatSheet>
                      </>
                    )}

                    {activePanel === 'users' && (
                      <OatSheet tone="subtle" interactive={false} className="p-5 sm:p-6 space-y-5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/15">
                          <div>
                            <span className="font-ui-label text-[10px] text-peach block mb-0.5">
                              Client Directory
                            </span>
                            <h1 className="font-display text-3xl text-oat font-medium leading-none">
                              Signed-Up Users ({usersList.length})
                            </h1>
                          </div>

                          <GlowButton
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={fetchUsers}
                            disabled={usersLoading}
                          >
                            <RefreshCw
                              className={`w-3.5 h-3.5 ${usersLoading ? 'animate-spin' : ''}`}
                              aria-hidden="true"
                            />
                            <span>Refresh List</span>
                          </GlowButton>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                          <div className="flex flex-wrap gap-2">
                            {(
                              [
                                { id: 'all', label: `All (${userStats.total})` },
                                { id: 'customer', label: `Clients (${userStats.customers})` },
                                { id: 'admin', label: `Admins (${userStats.admins})` },
                              ] as const
                            ).map((tab) => (
                              <button
                                key={tab.id}
                                type="button"
                                onClick={() => setRoleFilter(tab.id)}
                                className={`px-3 py-1.5 rounded-[4px] font-ui-label text-[10px] border cursor-pointer transition-colors ${
                                  roleFilter === tab.id
                                    ? 'bg-flame text-navy border-flame font-semibold'
                                    : 'bg-[#141C2B]/70 text-oat border-white/25 hover:border-peach/55'
                                }`}
                              >
                                {tab.label}
                              </button>
                            ))}
                          </div>

                          <div className="w-full md:w-72">
                            <GlowInput
                              name="userSearch"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              placeholder="Search name, email, or phone…"
                              leadingIcon={<Search className="w-4 h-4" />}
                            />
                          </div>
                        </div>

                        {usersError && (
                          <div className="p-4 rounded-[6px] border border-flame/50 bg-flame/15 text-xs text-oat flex items-start gap-2.5">
                            <AlertCircle className="w-4 h-4 text-peach shrink-0 mt-0.5" aria-hidden="true" />
                            <div>
                              <p className="font-semibold text-peach">Firestore Read Notice</p>
                              <p className="text-sand mt-0.5">{usersError}</p>
                            </div>
                          </div>
                        )}

                        {usersLoading ? (
                          <div className="space-y-2.5">
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                          </div>
                        ) : filteredUsers.length === 0 ? (
                          <p className="text-sm text-sand py-10 text-center">
                            No matching users found.
                          </p>
                        ) : (
                          <>
                            <div className="md:hidden space-y-3">
                              {filteredUsers.map((u) => (
                                <div
                                  key={u.uid}
                                  className="p-4 rounded-[6px] bg-oat/[0.07] border border-white/15 space-y-2 text-xs"
                                >
                                  <div className="flex items-start justify-between gap-2">
                                    <div>
                                      <p className="font-semibold text-oat text-sm">{u.displayName || '—'}</p>
                                      <p className="text-sand">{u.email}</p>
                                    </div>
                                    <span
                                      className={`font-ui-label text-[9px] px-2 py-0.5 rounded-[4px] ${
                                        u.role === 'admin'
                                          ? 'bg-flame text-navy font-semibold'
                                          : 'bg-oat/15 text-oat border border-white/20'
                                      }`}
                                    >
                                      {u.role}
                                    </span>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-[11px] text-sand tabular-nums">
                                    <span>Phone: {u.phone || '—'}</span>
                                    <span>Age: {u.age || '—'}</span>
                                    <span>Joined: {formatJoinDate(u.createdAt)}</span>
                                    <span className="text-peach">
                                      {formatProviders(u.authProviders).join(' + ') || '—'}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="hidden md:block overflow-x-auto">
                              <table className="w-full text-left text-xs">
                                <thead className="border-b border-white/15 font-ui-label text-[10px] text-peach">
                                  <tr>
                                    <th className="py-3 pr-4">Client</th>
                                    <th className="py-3 pr-4">Role</th>
                                    <th className="py-3 pr-4">Phone</th>
                                    <th className="py-3 pr-4">Age</th>
                                    <th className="py-3 pr-4">Login Methods</th>
                                    <th className="py-3">Joined</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10 text-oat">
                                  {filteredUsers.map((u) => (
                                    <tr key={u.uid} className="hover:bg-oat/[0.04]">
                                      <td className="py-3.5 pr-4">
                                        <p className="font-medium text-oat">{u.displayName || '—'}</p>
                                        <p className="text-[11px] text-sand">{u.email}</p>
                                      </td>
                                      <td className="py-3.5 pr-4">
                                        <span
                                          className={`font-ui-label text-[9px] px-2 py-0.5 rounded-[4px] ${
                                            u.role === 'admin'
                                              ? 'bg-flame text-navy font-semibold'
                                              : 'bg-oat/15 text-oat border border-white/20'
                                          }`}
                                        >
                                          {u.role}
                                        </span>
                                      </td>
                                      <td className="py-3.5 pr-4 tabular-nums text-sand">
                                        {u.phone || '—'}
                                      </td>
                                      <td className="py-3.5 pr-4 tabular-nums">{u.age || '—'}</td>
                                      <td className="py-3.5 pr-4">
                                        <div className="flex flex-wrap gap-1.5">
                                          {formatProviders(u.authProviders).map((label) => (
                                            <span
                                              key={label}
                                              className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-[4px] bg-[#252905]/85 text-sage border border-sage/35"
                                            >
                                              <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                                              {label}
                                            </span>
                                          ))}
                                        </div>
                                      </td>
                                      <td className="py-3.5 text-[11px] text-sand whitespace-nowrap tabular-nums">
                                        {formatJoinDate(u.createdAt)}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </>
                        )}
                      </OatSheet>
                    )}

                    {activePanel === 'catalog' && (
                      <OatSheet tone="subtle" interactive={false} className="p-5 sm:p-6 space-y-5">
                        {/* Header Bar */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-white/15">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              {activeSectionCategory || selectedSection === 'all' ? (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedSection(null);
                                    setSearchQuery('');
                                  }}
                                  className="inline-flex items-center gap-1 font-ui-label text-[10px] text-peach hover:text-oat cursor-pointer"
                                >
                                  <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                                  <span>All Sections</span>
                                </button>
                              ) : (
                                <span className="font-ui-label text-[10px] text-peach">
                                  Catalog By Section
                                </span>
                              )}
                            </div>
                            <h1 className="font-display text-3xl text-oat font-medium leading-none">
                              {activeSectionCategory
                                ? `${activeSectionCategory.name} (${filteredProducts.length})`
                                : selectedSection === 'all'
                                ? `All Harvests (${filteredProducts.length})`
                                : `Pantry Sections (${categories.length})`}
                            </h1>
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            <GlowButton
                              type="button"
                              variant="secondary"
                              size="sm"
                              onClick={handleSeedCatalog}
                              disabled={seedingCatalog}
                            >
                              <Database className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>{seedingCatalog ? 'Syncing…' : 'Sync Base 20'}</span>
                            </GlowButton>
                            <GlowButton
                              type="button"
                              variant="cta"
                              size="sm"
                              onClick={() => {
                                setEditingProduct(null);
                                setShowProductModal(true);
                              }}
                            >
                              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>Add New Product</span>
                            </GlowButton>
                          </div>
                        </div>

                        {/* Filter / Search Row */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex flex-wrap items-center gap-2">
                            {showSectionGrid ? (
                              <button
                                type="button"
                                onClick={() => setSelectedSection('all')}
                                className="font-ui-label text-[10px] px-3 py-1.5 rounded-[4px] border border-white/25 bg-oat/10 text-oat hover:border-peach/60 cursor-pointer"
                              >
                                View All {catalogProducts.length} Flat
                              </button>
                            ) : (
                              <p className="text-xs text-sand">
                                Edit variant stock directly or click <strong className="text-oat">Edit</strong> to update price, specs &amp; details.
                              </p>
                            )}
                          </div>

                          <div className="w-full sm:w-72">
                            <GlowInput
                              name="catalogSearch"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              placeholder="Search any harvest or SKU…"
                              leadingIcon={<Search className="w-4 h-4" />}
                            />
                          </div>
                        </div>

                        {catalogMessage && (
                          <div
                            role={catalogMessage.type === 'error' ? 'alert' : 'status'}
                            className={`p-3 rounded-[6px] border text-xs ${
                              catalogMessage.type === 'success'
                                ? 'border-sage/50 bg-[#252905]/80 text-oat'
                                : 'border-flame/60 bg-flame/20 text-oat'
                            }`}
                          >
                            {catalogMessage.text}
                          </div>
                        )}

                        {showSectionGrid ? (
                          /* Section Cards Grid (Seeds, Berries, Dried Fruits, Nuts, Makhana) */
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {sectionSummaries.map((sec) => (
                              <button
                                key={sec.category.id}
                                type="button"
                                onClick={() => setSelectedSection(sec.category.slug)}
                                className="group text-left rounded-[8px] border border-white/20 bg-[#141C2B]/75 hover:bg-[#141C2B]/95 hover:border-peach/55 overflow-hidden transition-colors cursor-pointer flex flex-col"
                              >
                                <div className="relative aspect-[16/10] w-full bg-[#1C2638] overflow-hidden border-b border-white/15">
                                  <ProductImageWithFallback
                                    src={sec.category.image}
                                    alt={sec.category.name}
                                    fill
                                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 44vw, 280px"
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                  />
                                  <div className="absolute top-2.5 right-2.5 flex gap-1.5">
                                    {sec.outOfStockCount > 0 && (
                                      <span className="font-ui-label text-[9px] px-2 py-0.5 rounded-[4px] bg-flame text-navy font-semibold">
                                        {sec.outOfStockCount} Out
                                      </span>
                                    )}
                                    {sec.lowStockCount > 0 && (
                                      <span className="font-ui-label text-[9px] px-2 py-0.5 rounded-[4px] bg-[#141C2B]/85 text-peach border border-peach/40">
                                        {sec.lowStockCount} Low
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="p-4 flex-1 flex flex-col justify-between gap-3 w-full">
                                  <div>
                                    <span className="font-ui-label text-[9px] text-peach block mb-1 truncate">
                                      {sec.category.originNote}
                                    </span>
                                    <h2 className="font-display text-2xl text-oat group-hover:text-peach transition-colors leading-snug">
                                      {sec.category.name}
                                    </h2>
                                    <p className="text-xs text-sand line-clamp-2 mt-1">
                                      {sec.category.description}
                                    </p>
                                  </div>

                                  <div className="pt-3 border-t border-white/15 flex items-center justify-between gap-2 text-xs tabular-nums">
                                    <div className="space-y-0.5">
                                      <span className="text-oat font-semibold block">
                                        {sec.productCount} Items · {sec.variantCount} Packs
                                      </span>
                                      <span className="text-[11px] text-sage font-medium block">
                                        Stock: {sec.totalStock} units
                                      </span>
                                    </div>
                                    <span className="inline-flex items-center gap-1 font-ui-label text-[10px] text-peach group-hover:translate-x-0.5 transition-transform">
                                      <span>Open</span>
                                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                                    </span>
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        ) : (
                          /* Filtered Product List Inside Clicked Section (or Search/All) */
                          <div className="space-y-3">
                            {filteredProducts.length === 0 ? (
                              <p className="text-sm text-sand py-8 text-center">
                                No harvests found in this section yet. Click &ldquo;Add New Product&rdquo; to add one.
                              </p>
                            ) : (
                              filteredProducts.map((p) => (
                                <div
                                  key={p.id}
                                  className="p-4 rounded-[6px] bg-oat/[0.06] border border-white/15 space-y-3"
                                >
                                  <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div className="flex items-center gap-3.5">
                                      <div className="relative w-14 h-16 rounded-[4px] overflow-hidden border border-white/20 bg-[#1C2638] shrink-0">
                                        <ProductImageWithFallback
                                          src={p.images[0]?.src || ''}
                                          alt={p.name}
                                          fill
                                          sizes="56px"
                                          className="object-cover"
                                        />
                                      </div>
                                      <div>
                                        <div className="flex flex-wrap items-center gap-2">
                                          <h2 className="font-display text-xl text-oat font-medium">
                                            {p.name}
                                          </h2>
                                          <span className="font-ui-label text-[9px] px-2 py-0.5 rounded-[4px] bg-oat/15 text-peach border border-white/15">
                                            {p.category}
                                          </span>
                                        </div>
                                        <p className="text-[11px] text-sand mt-0.5">
                                          {p.origin} · {p.provenance}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setEditingProduct(p);
                                          setShowProductModal(true);
                                        }}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] border border-white/25 bg-oat/10 hover:bg-flame hover:text-navy hover:border-flame text-oat font-ui-label text-[10px] transition-colors cursor-pointer"
                                      >
                                        <Pencil className="w-3 h-3" aria-hidden="true" />
                                        <span>Edit Product</span>
                                      </button>
                                      <Link
                                        href={`/product/${p.slug}`}
                                        className="font-ui-label text-[10px] text-peach hover:text-oat underline underline-offset-4 px-1"
                                      >
                                        Store View
                                      </Link>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                                    {p.variants.map((v) => {
                                      const key = `${p.id}:${v.id}`;
                                      const draft = getDraftStock(p.id, v.id, v.stock);
                                      const isSaving = savingVariantKey === key;
                                      const isDirty = draft !== v.stock;
                                      return (
                                        <div
                                          key={v.id}
                                          className="p-3 rounded-[6px] bg-[#141C2B]/75 border border-white/15 flex flex-col gap-2 text-xs"
                                        >
                                          <div className="flex items-center justify-between gap-2 tabular-nums">
                                            <span className="font-semibold text-oat">
                                              {v.weight} · {siteConfig.currencySymbol}{v.price}
                                            </span>
                                            <span
                                              className={`font-ui-label text-[9px] px-1.5 py-0.5 rounded-[3px] ${
                                                v.stock <= 0
                                                  ? 'bg-flame/25 text-peach'
                                                  : v.stock <= 10
                                                  ? 'bg-flame/15 text-peach'
                                                  : 'bg-[#252905]/80 text-sage'
                                              }`}
                                            >
                                              {v.stock <= 0 ? 'Out of stock' : `${v.stock} in stock`}
                                            </span>
                                          </div>
                                          <span className="text-[10px] text-sand/85">{v.sku}</span>

                                          <div className="flex items-center gap-1.5 pt-1">
                                            <button
                                              type="button"
                                              aria-label={`Decrease ${p.name} ${v.weight} stock`}
                                              onClick={() => setDraftStock(p.id, v.id, draft - 1)}
                                              className="w-8 h-8 rounded-[4px] border border-white/20 bg-oat/10 flex items-center justify-center text-oat hover:text-peach cursor-pointer"
                                            >
                                              <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                                            </button>
                                            <input
                                              type="number"
                                              min={0}
                                              aria-label={`${p.name} ${v.weight} stock count`}
                                              value={draft}
                                              onChange={(e) => setDraftStock(p.id, v.id, Number(e.target.value))}
                                              className="w-16 h-8 text-center rounded-[4px] border border-white/25 bg-[#141C2B] text-oat text-xs tabular-nums"
                                            />
                                            <button
                                              type="button"
                                              aria-label={`Increase ${p.name} ${v.weight} stock`}
                                              onClick={() => setDraftStock(p.id, v.id, draft + 1)}
                                              className="w-8 h-8 rounded-[4px] border border-white/20 bg-oat/10 flex items-center justify-center text-oat hover:text-peach cursor-pointer"
                                            >
                                              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                                            </button>

                                            <button
                                              type="button"
                                              disabled={isSaving || !isDirty}
                                              onClick={() => handleSaveVariantStock(p, v.id, v.stock)}
                                              className={`ml-auto inline-flex items-center gap-1 px-2.5 h-8 rounded-[4px] font-ui-label text-[10px] transition-colors cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed ${
                                                isDirty
                                                  ? 'bg-flame text-navy font-semibold'
                                                  : 'bg-oat/15 text-oat border border-white/20'
                                              }`}
                                            >
                                              <Save className="w-3 h-3" aria-hidden="true" />
                                              <span>{isSaving ? '…' : 'Save'}</span>
                                            </button>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        )}
                      </OatSheet>
                    )}

                    {activePanel === 'orders' && (
                      <OatSheet tone="subtle" interactive={false} className="p-5 sm:p-6 space-y-5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/15">
                          <div>
                            <span className="font-ui-label text-[10px] text-peach block mb-0.5">
                              Customer Orders
                            </span>
                            <h1 className="font-display text-3xl text-oat font-medium leading-none">
                              Orders ({ordersList.length})
                            </h1>
                          </div>
                          <GlowButton
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={fetchOrders}
                            disabled={ordersLoading}
                          >
                            <RefreshCw
                              className={`w-3.5 h-3.5 ${ordersLoading ? 'animate-spin' : ''}`}
                              aria-hidden="true"
                            />
                            <span>Refresh Orders</span>
                          </GlowButton>
                        </div>

                        {ordersError && (
                          <div className="p-4 rounded-[6px] border border-flame/50 bg-flame/15 text-xs text-oat flex items-start gap-2.5">
                            <AlertCircle className="w-4 h-4 text-peach shrink-0 mt-0.5" aria-hidden="true" />
                            <span>{ordersError}</span>
                          </div>
                        )}

                        {ordersLoading ? (
                          <div className="space-y-2.5">
                            <Skeleton className="h-14 w-full" />
                            <Skeleton className="h-14 w-full" />
                          </div>
                        ) : ordersList.length === 0 ? (
                          <p className="text-sm text-sand py-10 text-center">
                            No orders placed yet. Orders placed via Checkout appear here and automatically subtract stock.
                          </p>
                        ) : (
                          <div className="space-y-3">
                            {ordersList.map((ord) => (
                              <div
                                key={ord.orderId}
                                className="p-4 rounded-[6px] bg-oat/[0.07] border border-white/15 space-y-2 text-xs"
                              >
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <div>
                                    <span className="font-ui-label text-[10px] text-peach">
                                      {ord.orderId} · {ord.trackingNumber}
                                    </span>
                                    <p className="font-semibold text-oat text-sm mt-0.5">
                                      {ord.customerName} ({ord.email})
                                    </p>
                                  </div>
                                  <div className="text-right tabular-nums">
                                    <span className="font-display text-xl text-peach font-semibold block">
                                      {siteConfig.currencySymbol}{ord.total}
                                    </span>
                                    <span className="text-[11px] text-sand">
                                      {ord.paymentMethod.toUpperCase()} · {formatJoinDate(ord.createdAt)}
                                    </span>
                                  </div>
                                </div>
                                <p className="text-[11px] text-sand">
                                  {ord.items.length} item line(s) · {ord.address}, {ord.city} {ord.pincode}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </OatSheet>
                    )}

                    {activePanel === 'security' && (
                      <OatSheet tone="subtle" interactive={false} className="p-5 sm:p-6 space-y-4">
                        <div>
                          <span className="font-ui-label text-[10px] text-peach block mb-0.5">
                            Role Access Control
                          </span>
                          <h1 className="font-display text-3xl text-oat font-medium leading-none">
                            Authorized Administrators
                          </h1>
                        </div>
                        <p className="text-xs sm:text-sm text-sand">
                          Authorized administrator emails configured via{' '}
                          <code className="text-oat">src/lib/auth/roles.ts</code> and{' '}
                          <code className="text-oat">NEXT_PUBLIC_ADMIN_EMAILS</code>:
                        </p>
                        <ul className="space-y-2.5">
                          {getAdminEmails().map((adminEmail) => (
                            <li
                              key={adminEmail}
                              className="p-3.5 rounded-[6px] bg-oat/[0.08] border border-white/15 flex items-center justify-between text-xs"
                            >
                              <span className="text-oat font-medium">{adminEmail}</span>
                              <span className="font-ui-label text-[9px] px-2.5 py-0.5 rounded-[4px] bg-flame text-navy font-semibold">
                                Admin Allowlisted
                              </span>
                            </li>
                          ))}
                        </ul>
                      </OatSheet>
                    )}
                  </div>
                </div>
              </div>
            ),
          },
        ]}
      />
    </>
  );
}
