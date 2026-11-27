'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle2,
  KeyRound,
  LogOut,
  Shield,
  ShoppingBag,
  Sparkles,
  User as UserIcon,
} from 'lucide-react';
import { updateProfile, type User } from 'firebase/auth';
import { useAuth } from '@/components/auth/AuthProvider';
import { saveUserProfile, splitFullName, type UserProfile } from '@/lib/firebase/users';
import { useCartStore } from '@/lib/store/cartStore';
import { siteConfig } from '@/lib/data/site';
import { PageBackgroundSet } from '@/components/editorial/PageBackgroundSet';
import { OatSheet } from '@/components/editorial/OatSheet';
import { GlowInput } from '@/components/ui/GlowInput';
import { GlowButton } from '@/components/ui/GlowButton';
import { Skeleton } from '@/components/ui/Skeleton';

function ProfileSettingsForm({
  user,
  profile,
  providerIds,
  refreshProfile,
}: {
  user: User;
  profile: UserProfile | null;
  providerIds: string[];
  refreshProfile: () => Promise<void>;
}) {
  const parsed = splitFullName(user.displayName);
  const [firstName, setFirstName] = useState(profile?.firstName || parsed.firstName);
  const [lastName, setLastName] = useState(profile?.lastName || parsed.lastName);
  const [phone, setPhone] = useState(profile?.phone || '');
  const [age, setAge] = useState(profile?.age ? String(profile.age) : '');
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    if (!user.email) return;

    if (!firstName.trim() || !lastName.trim()) {
      setFeedback({ type: 'error', text: 'First name and last name are required.' });
      return;
    }
    const cleanedPhone = phone.trim();
    if (cleanedPhone && !/^\d{10}$/.test(cleanedPhone)) {
      setFeedback({ type: 'error', text: 'Phone number must be 10 digits or empty.' });
      return;
    }
    const ageNum = Number(age);
    if (!age.trim() || !Number.isInteger(ageNum) || ageNum < 13 || ageNum > 120) {
      setFeedback({ type: 'error', text: 'Enter a valid age between 13 and 120.' });
      return;
    }

    setSaving(true);
    try {
      const displayName = `${firstName.trim()} ${lastName.trim()}`.trim();
      await updateProfile(user, { displayName });
      const now = new Date().toISOString();
      await saveUserProfile({
        uid: user.uid,
        email: user.email,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        displayName,
        phone: cleanedPhone || undefined,
        age: ageNum,
        authProviders: providerIds,
        photoURL: user.photoURL || undefined,
        profileCompleted: true,
        createdAt: profile?.createdAt || now,
        updatedAt: now,
      });
      await refreshProfile();
      setFeedback({ type: 'success', text: 'Your profile has been updated.' });
    } catch (err) {
      setFeedback({
        type: 'error',
        text: err instanceof Error ? err.message : 'Unable to save profile right now.',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <OatSheet tone="subtle" interactive={false} className="p-6 sm:p-7">
      <h2 className="font-display text-2xl text-oat font-medium mb-4">
        Account Details
      </h2>

      {feedback && (
        <div
          role={feedback.type === 'error' ? 'alert' : 'status'}
          className={`mb-4 p-3 rounded-[6px] border text-xs ${
            feedback.type === 'success'
              ? 'border-sage/50 bg-[#252905]/80 text-oat'
              : 'border-flame/60 bg-flame/20 text-oat'
          }`}
        >
          {feedback.text}
        </div>
      )}

      <form onSubmit={handleSaveProfile} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <GlowInput
            name="firstName"
            label="First Name *"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <GlowInput
            name="lastName"
            label="Last Name *"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <GlowInput
          name="email"
          label="Email Address"
          value={user.email || ''}
          readOnly
          inputClassName="opacity-80 cursor-not-allowed"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <GlowInput
            name="phone"
            label="Phone Number (Optional)"
            type="tel"
            inputMode="tel"
            maxLength={10}
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
            placeholder="9876543210"
          />
          <GlowInput
            name="age"
            label="Age *"
            type="text"
            inputMode="numeric"
            maxLength={3}
            value={age}
            onChange={(e) => setAge(e.target.value.replace(/\D/g, ''))}
          />
        </div>

        <GlowButton type="submit" variant="cta" disabled={saving}>
          <span>{saving ? 'Saving…' : 'Save Profile Changes'}</span>
        </GlowButton>
      </form>
    </OatSheet>
  );
}

export function UserDashboardClient() {
  const router = useRouter();
  const { user, profile, loading, isAdmin, refreshProfile, signOut } = useAuth();

  const totalItems = useCartStore((s) => s.getTotalItems());
  const subtotal = useCartStore((s) => s.getSubtotal());
  const freeShippingProgress = useCartStore((s) => s.getFreeShippingProgress());
  const openCart = useCartStore((s) => s.openCart);

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login?next=/dashboard');
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="min-h-[100dvh] bg-navy pt-28 px-4 max-w-5xl mx-auto space-y-5">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-72 w-full" />
      </div>
    );
  }

  const providerIds = user.providerData.map((p) => p.providerId);
  const hasGoogle = providerIds.includes('google.com');
  const hasPassword = providerIds.includes('password');
  const displayFirstName =
    profile?.firstName || splitFullName(user.displayName).firstName || user.email?.split('@')[0];

  return (
    <PageBackgroundSet
      page="signature"
      chapters={[
        {
          id: 'dashboard-01',
          chapterNumber: '01',
          chapterLabel: 'My Dashboard',
          compact: true,
          content: (
            <div className="max-w-5xl mx-auto space-y-6 pt-2 sm:pt-4">
              {/* Top Member Header */}
              <OatSheet tone="medium" interactive={false} className="p-6 sm:p-7">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-[6px] bg-flame/20 border border-flame/45 flex items-center justify-center text-peach shrink-0">
                      <UserIcon className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-ui-label text-[10px] text-peach">
                          My Dashboard
                        </span>
                        <span className="font-ui-label text-[9px] px-2 py-0.5 rounded-[4px] bg-[#252905]/85 text-sage border border-sage/40">
                          {isAdmin ? 'Admin Account' : 'Pantry Member'}
                        </span>
                      </div>
                      <h1 className="font-display text-3xl sm:text-4xl text-oat font-medium leading-none">
                        Welcome, {displayFirstName}
                      </h1>
                      <p className="text-xs text-sand mt-1">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    {isAdmin && (
                      <GlowButton href="/admin" variant="cta" size="sm">
                        <Shield className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Open Admin Dashboard</span>
                      </GlowButton>
                    )}
                    <GlowButton
                      type="button"
                      variant="secondary"
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

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Profile & Account Details Form */}
                <div className="lg:col-span-7">
                  <ProfileSettingsForm
                    key={`${user.uid}-${profile?.updatedAt ?? 'init'}`}
                    user={user}
                    profile={profile}
                    providerIds={providerIds}
                    refreshProfile={refreshProfile}
                  />
                </div>

                {/* Right Column: Login Methods + Bag Summary */}
                <div className="lg:col-span-5 space-y-5">
                  <OatSheet tone="warm" interactive={false} className="p-6 space-y-4">
                    <div className="flex items-center gap-2 text-peach">
                      <KeyRound className="w-4 h-4" aria-hidden="true" />
                      <h2 className="font-display text-xl text-oat font-medium">
                        Connected Sign-In Methods
                      </h2>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div className="flex items-center justify-between p-3 rounded-[6px] bg-oat/[0.08] border border-white/15">
                        <span className="text-oat font-medium">Google Account</span>
                        <span className={hasGoogle ? 'text-sage font-semibold' : 'text-sand/75'}>
                          {hasGoogle ? 'Connected' : 'Not Linked'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-[6px] bg-oat/[0.08] border border-white/15">
                        <span className="text-oat font-medium">Email &amp; Password</span>
                        <span className={hasPassword ? 'text-sage font-semibold inline-flex items-center gap-1' : 'text-peach'}>
                          {hasPassword ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                              Active
                            </>
                          ) : (
                            'Pending Setup'
                          )}
                        </span>
                      </div>
                    </div>

                    {!hasPassword && (
                      <GlowButton href="/login?complete=1" variant="primary" size="sm" className="w-full">
                        Set Password for Email Login
                      </GlowButton>
                    )}
                  </OatSheet>

                  <OatSheet tone="subtle" interactive={false} className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-peach">
                        <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                        <h2 className="font-display text-xl text-oat font-medium">
                          Your Harvest Bag
                        </h2>
                      </div>
                      <span className="font-ui-label text-[10px] text-sand tabular-nums">
                        {totalItems} items
                      </span>
                    </div>

                    <div className="text-xs text-sand space-y-2 tabular-nums">
                      <div className="flex justify-between">
                        <span>Current Subtotal</span>
                        <span className="font-semibold text-oat">
                          {siteConfig.currencySymbol}{subtotal}
                        </span>
                      </div>
                      <div className="w-full bg-oat/10 rounded-[2px] h-1.5 overflow-hidden">
                        <div
                          className="h-full bg-flame transition-all duration-300"
                          style={{ width: `${freeShippingProgress}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-sand/90">
                        {subtotal >= siteConfig.freeShippingThreshold
                          ? 'Free dispatch unlocked on your bag.'
                          : `Add ${siteConfig.currencySymbol}${siteConfig.freeShippingThreshold - subtotal} more for free dispatch.`}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      <GlowButton type="button" variant="secondary" size="sm" onClick={openCart}>
                        View Bag
                      </GlowButton>
                      <GlowButton href="/shop" variant="cta" size="sm">
                        <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Browse Harvests</span>
                      </GlowButton>
                    </div>

                    <p className="text-[11px] text-sand/85 pt-2 border-t border-white/15">
                      Questions about an order?{' '}
                      <Link href="/contact" className="text-peach hover:text-oat underline underline-offset-4">
                        Message {siteConfig.name}
                      </Link>
                    </p>
                  </OatSheet>
                </div>
              </div>
            </div>
          ),
        },
      ]}
    />
  );
}
