'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  LayoutDashboard,
  LogOut,
  Package,
  RefreshCw,
  Search,
  Shield,
  ShieldAlert,
  User as UserIcon,
  Users,
} from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';
import { getAdminEmails } from '@/lib/auth/roles';
import { getAllUserProfiles, type UserProfile } from '@/lib/firebase/users';
import type { Product } from '@/lib/data/products';
import type { Category } from '@/lib/data/categories';
import { siteConfig } from '@/lib/data/site';
import { PageBackgroundSet } from '@/components/editorial/PageBackgroundSet';
import { OatSheet } from '@/components/editorial/OatSheet';
import { GlowInput } from '@/components/ui/GlowInput';
import { GlowButton } from '@/components/ui/GlowButton';
import { Skeleton } from '@/components/ui/Skeleton';

interface AdminDashboardClientProps {
  products: Product[];
  categories: Category[];
}

type AdminPanel = 'dashboard' | 'users' | 'catalog' | 'security';
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

export function AdminDashboardClient({ products, categories }: AdminDashboardClientProps) {
  const router = useRouter();
  const { user, loading, isAdmin, configured, signOut } = useAuth();

  const [activePanel, setActivePanel] = useState<AdminPanel>('dashboard');
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [usersState, setUsersState] = useState<{
    loading: boolean;
    rows: UserProfile[];
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

    return () => {
      active = false;
    };
  }, [loading, user, isAdmin, configured]);

  const usersList = usersState.rows;
  const usersLoading = usersState.loading;
  const usersError = usersState.error;

  const userStats = useMemo(() => {
    const customers = usersList.filter((u) => u.role === 'customer').length;
    const admins = usersList.filter((u) => u.role === 'admin').length;
    const dualLogin = usersList.filter(
      (u) => u.authProviders?.includes('google.com') && u.authProviders?.includes('password')
    ).length;
    const withPhone = usersList.filter((u) => Boolean(u.phone)).length;
    return { total: usersList.length, customers, admins, dualLogin, withPhone };
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

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.variants.some((v) => v.sku.toLowerCase().includes(q))
    );
  }, [products, searchQuery]);

  const totalStockUnits = useMemo(
    () => products.reduce((sum, p) => sum + p.variants.reduce((s, v) => s + v.stock, 0), 0),
    [products]
  );

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
    { id: 'catalog', label: 'Catalog', icon: Package, badge: products.length },
    { id: 'security', label: 'Admin Roles', icon: Shield },
  ];

  return (
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
                          Live snapshot of signed-up clients, login security adoption, and harvest inventory.
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
                            Dual Login Ready
                          </span>
                          <span className="font-display text-3xl text-oat font-semibold tabular-nums">
                            {usersLoading ? '…' : userStats.dualLogin}
                          </span>
                          <span className="text-[11px] text-sand block mt-1">
                            Google + Password linked
                          </span>
                        </OatSheet>

                        <OatSheet tone="medium" interactive={false} className="p-4">
                          <span className="font-ui-label text-[9px] text-peach block mb-1">
                            Active Harvests
                          </span>
                          <span className="font-display text-3xl text-oat font-semibold tabular-nums">
                            {products.length}
                          </span>
                          <span className="text-[11px] text-sand block mt-1">
                            Across {categories.length} belts
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

                      {/* Role Filter + Search */}
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
                          {/* Mobile Card List */}
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

                          {/* Desktop Full Table */}
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
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/15">
                        <div>
                          <span className="font-ui-label text-[10px] text-peach block mb-0.5">
                            Inventory Snapshot
                          </span>
                          <h1 className="font-display text-3xl text-oat font-medium leading-none">
                            Catalog &amp; Stock ({filteredProducts.length})
                          </h1>
                        </div>
                        <div className="w-full sm:w-72">
                          <GlowInput
                            name="catalogSearch"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search harvest, category, SKU…"
                            leadingIcon={<Search className="w-4 h-4" />}
                          />
                        </div>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead className="border-b border-white/15 font-ui-label text-[10px] text-peach">
                            <tr>
                              <th className="py-3 pr-4">Harvest</th>
                              <th className="py-3 pr-4">Category</th>
                              <th className="py-3 pr-4">Variants &amp; Price</th>
                              <th className="py-3 pr-4">Total Stock</th>
                              <th className="py-3">Link</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/10 text-oat">
                            {filteredProducts.map((p) => {
                              const stock = p.variants.reduce((sum, v) => sum + v.stock, 0);
                              return (
                                <tr key={p.id} className="hover:bg-oat/[0.04]">
                                  <td className="py-3 pr-4 font-medium">{p.name}</td>
                                  <td className="py-3 pr-4 text-sand">{p.category}</td>
                                  <td className="py-3 pr-4 tabular-nums text-sand">
                                    {p.variants
                                      .map((v) => `${v.weight}: ${siteConfig.currencySymbol}${v.price}`)
                                      .join(' · ')}
                                  </td>
                                  <td className="py-3 pr-4 tabular-nums font-semibold text-peach">{stock}</td>
                                  <td className="py-3">
                                    <Link
                                      href={`/product/${p.slug}`}
                                      className="text-peach hover:text-oat underline underline-offset-4"
                                    >
                                      View
                                    </Link>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
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
  );
}
