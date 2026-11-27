'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  AlertCircle,
  LogOut,
  Package,
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

type AdminTab = 'users' | 'catalog' | 'security';

export function AdminDashboardClient({ products, categories }: AdminDashboardClientProps) {
  const router = useRouter();
  const { user, loading, isAdmin, configured, signOut } = useAuth();

  const [activeTab, setActiveTab] = useState<AdminTab>('users');
  const [usersState, setUsersState] = useState<{
    loading: boolean;
    rows: UserProfile[];
    error: string | null;
  }>({
    loading: configured,
    rows: [],
    error: null,
  });
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredUsers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return usersList;
    return usersList.filter(
      (u) =>
        u.email.toLowerCase().includes(q) ||
        u.displayName.toLowerCase().includes(q) ||
        (u.phone || '').includes(q)
    );
  }, [usersList, searchQuery]);

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
            <div className="max-w-6xl mx-auto space-y-6 pt-2 sm:pt-4">
              {/* Top Admin Header */}
              <OatSheet tone="medium" interactive={false} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-[6px] bg-flame text-navy flex items-center justify-center shrink-0">
                      <Shield className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div>
                      <span className="font-ui-label text-[10px] text-peach block mb-0.5">
                        {siteConfig.name} Admin Dashboard
                      </span>
                      <h1 className="font-display text-3xl text-oat font-medium leading-none">
                        Operations &amp; Accounts
                      </h1>
                      <p className="text-xs text-sand mt-1">Signed in as {user.email}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <GlowButton href="/dashboard" variant="secondary" size="sm">
                      <UserIcon className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>My Dashboard</span>
                    </GlowButton>
                    <GlowButton
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={async () => {
                        await signOut();
                        router.push('/');
                      }}
                    >
                      <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Sign Out</span>
                    </GlowButton>
                  </div>
                </div>
              </OatSheet>

              {/* KPI Strip */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
                <OatSheet tone="subtle" interactive={false} className="p-4">
                  <span className="font-ui-label text-[9px] text-peach block mb-1">Registered Users</span>
                  <span className="font-display text-3xl text-oat font-semibold tabular-nums">
                    {usersList.length}
                  </span>
                </OatSheet>
                <OatSheet tone="subtle" interactive={false} className="p-4">
                  <span className="font-ui-label text-[9px] text-peach block mb-1">Catalog Harvests</span>
                  <span className="font-display text-3xl text-oat font-semibold tabular-nums">
                    {products.length}
                  </span>
                </OatSheet>
                <OatSheet tone="subtle" interactive={false} className="p-4">
                  <span className="font-ui-label text-[9px] text-peach block mb-1">Total Pack Stock</span>
                  <span className="font-display text-3xl text-oat font-semibold tabular-nums">
                    {totalStockUnits}
                  </span>
                </OatSheet>
                <OatSheet tone="subtle" interactive={false} className="p-4">
                  <span className="font-ui-label text-[9px] text-peach block mb-1">Harvest Belts</span>
                  <span className="font-display text-3xl text-oat font-semibold tabular-nums">
                    {categories.length}
                  </span>
                </OatSheet>
              </div>

              {/* Navigation Tabs + Search */}
              <OatSheet tone="subtle" interactive={false} className="p-4 sm:p-5 space-y-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-white/15">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('users')}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-[4px] font-ui-label text-[11px] border cursor-pointer transition-colors ${
                        activeTab === 'users'
                          ? 'bg-flame text-navy border-flame font-semibold'
                          : 'bg-[#141C2B]/70 text-oat border-white/25 hover:border-peach/55'
                      }`}
                    >
                      <Users className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Users ({usersList.length})</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('catalog')}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-[4px] font-ui-label text-[11px] border cursor-pointer transition-colors ${
                        activeTab === 'catalog'
                          ? 'bg-flame text-navy border-flame font-semibold'
                          : 'bg-[#141C2B]/70 text-oat border-white/25 hover:border-peach/55'
                      }`}
                    >
                      <Package className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Catalog ({products.length})</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('security')}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-[4px] font-ui-label text-[11px] border cursor-pointer transition-colors ${
                        activeTab === 'security'
                          ? 'bg-flame text-navy border-flame font-semibold'
                          : 'bg-[#141C2B]/70 text-oat border-white/25 hover:border-peach/55'
                      }`}
                    >
                      <Shield className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Admin Roles</span>
                    </button>
                  </div>

                  {activeTab !== 'security' && (
                    <div className="w-full md:w-72">
                      <GlowInput
                        name="adminSearch"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={activeTab === 'users' ? 'Search user email or name…' : 'Search product or SKU…'}
                        leadingIcon={<Search className="w-4 h-4" />}
                      />
                    </div>
                  )}
                </div>

                {/* Tab Content */}
                {activeTab === 'users' && (
                  <div className="space-y-4">
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
                      <p className="text-sm text-sand py-8 text-center">
                        No registered user records found yet. Once users sign up via Google or Email, they appear here.
                      </p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead className="border-b border-white/15 font-ui-label text-[10px] text-peach">
                            <tr>
                              <th className="py-3 pr-4">Name</th>
                              <th className="py-3 pr-4">Email</th>
                              <th className="py-3 pr-4">Role</th>
                              <th className="py-3 pr-4">Age</th>
                              <th className="py-3 pr-4">Phone</th>
                              <th className="py-3">Providers</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/10 text-oat">
                            {filteredUsers.map((u) => (
                              <tr key={u.uid} className="hover:bg-oat/[0.04]">
                                <td className="py-3 pr-4 font-medium whitespace-nowrap">{u.displayName || '—'}</td>
                                <td className="py-3 pr-4 text-sand">{u.email}</td>
                                <td className="py-3 pr-4">
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
                                <td className="py-3 pr-4 tabular-nums">{u.age || '—'}</td>
                                <td className="py-3 pr-4 tabular-nums text-sand">{u.phone || '—'}</td>
                                <td className="py-3 text-[11px] text-peach">
                                  {u.authProviders?.join(' + ') || '—'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'catalog' && (
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
                )}

                {activeTab === 'security' && (
                  <div className="space-y-4 text-xs sm:text-sm text-sand">
                    <p>
                      Authorized administrator accounts (configured via{' '}
                      <code className="text-oat">src/lib/auth/roles.ts</code> and{' '}
                      <code className="text-oat">NEXT_PUBLIC_ADMIN_EMAILS</code>):
                    </p>
                    <ul className="space-y-2">
                      {getAdminEmails().map((adminEmail) => (
                        <li
                          key={adminEmail}
                          className="p-3 rounded-[6px] bg-oat/[0.08] border border-white/15 flex items-center justify-between"
                        >
                          <span className="text-oat font-medium">{adminEmail}</span>
                          <span className="font-ui-label text-[9px] px-2 py-0.5 rounded-[4px] bg-flame text-navy font-semibold">
                            Admin Allowlisted
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </OatSheet>
            </div>
          ),
        },
      ]}
    />
  );
}
