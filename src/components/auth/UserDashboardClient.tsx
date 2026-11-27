'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  LogOut,
  Mail,
  Shield,
  ShoppingBag,
  Sparkles,
  User as UserIcon,
} from 'lucide-react';
import {
  EmailAuthProvider,
  linkWithCredential,
  reauthenticateWithPopup,
  sendPasswordResetEmail,
  updatePassword,
  updateProfile,
  type User,
} from 'firebase/auth';
import { useAuth } from '@/components/auth/AuthProvider';
import { createGoogleProvider, getFirebaseAuth } from '@/lib/firebase/config';
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
        phone: cleanedPhone || null,
        age: ageNum,
        authProviders: providerIds,
        photoURL: user.photoURL || null,
        profileCompleted: true,
        createdAt: profile?.createdAt || now,
        updatedAt: now,
      });
      await refreshProfile();
      setFeedback({ type: 'success', text: 'Your profile details (including phone & age) have been updated.' });
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
      <h2 className="font-display text-2xl text-oat font-medium mb-1">
        Account Details
      </h2>
      <p className="text-xs text-sand mb-5">
        Update your personal details and contact number anytime.
      </p>

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

function PasswordSecurityCard({
  user,
  profile,
  hasGoogle,
  hasPassword,
  refreshProfile,
}: {
  user: User;
  profile: UserProfile | null;
  hasGoogle: boolean;
  hasPassword: boolean;
  refreshProfile: () => Promise<void>;
}) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [resetSending, setResetSending] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSetOrUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    if (!user.email) return;

    if (newPassword.length < 8) {
      setStatus({ type: 'error', text: 'New password must be at least 8 characters.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setStatus({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    setUpdating(true);
    try {
      const applyChange = async () => {
        if (hasPassword) {
          await updatePassword(user, newPassword);
        } else {
          const cred = EmailAuthProvider.credential(user.email!, newPassword);
          await linkWithCredential(user, cred);
        }
      };

      try {
        await applyChange();
      } catch (err: unknown) {
        const code =
          typeof err === 'object' && err !== null && 'code' in err
            ? String((err as { code?: string }).code)
            : '';
        if (code === 'auth/requires-recent-login' && hasGoogle) {
          await reauthenticateWithPopup(user, createGoogleProvider());
          await applyChange();
        } else if (code === 'auth/requires-recent-login') {
          setStatus({
            type: 'error',
            text: 'For your security, please use "Send Password Reset Email" below or sign out and sign back in first.',
          });
          setUpdating(false);
          return;
        } else {
          throw err;
        }
      }

      const updatedProviders = Array.from(
        new Set(user.providerData.map((p) => p.providerId).concat('password'))
      );
      if (profile) {
        await saveUserProfile({
          ...profile,
          authProviders: updatedProviders,
          updatedAt: new Date().toISOString(),
        });
      }
      await refreshProfile();
      setNewPassword('');
      setConfirmPassword('');
      setStatus({
        type: 'success',
        text: 'Password updated! You can now sign in with your email and this new password anytime.',
      });
    } catch (err) {
      setStatus({
        type: 'error',
        text: err instanceof Error ? err.message : 'Could not update password.',
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleSendResetEmail = async () => {
    setStatus(null);
    const auth = getFirebaseAuth();
    if (!auth || !user.email) return;

    setResetSending(true);
    try {
      await sendPasswordResetEmail(auth, user.email);
      setStatus({
        type: 'success',
        text: `Password reset link sent to ${user.email}. Check your inbox (and spam folder).`,
      });
    } catch (err) {
      setStatus({
        type: 'error',
        text: err instanceof Error ? err.message : 'Unable to send reset email.',
      });
    } finally {
      setResetSending(false);
    }
  };

  return (
    <OatSheet tone="warm" interactive={false} className="p-6 space-y-4">
      <div className="flex items-center gap-2 text-peach">
        <KeyRound className="w-4 h-4" aria-hidden="true" />
        <h2 className="font-display text-xl text-oat font-medium">
          Sign-In &amp; Password Security
        </h2>
      </div>

      <div className="space-y-2 text-xs">
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
              'Not Set'
            )}
          </span>
        </div>
      </div>

      {status && (
        <div
          role={status.type === 'error' ? 'alert' : 'status'}
          className={`p-3 rounded-[6px] border text-xs ${
            status.type === 'success'
              ? 'border-sage/50 bg-[#252905]/80 text-oat'
              : 'border-flame/60 bg-flame/20 text-oat'
          }`}
        >
          {status.text}
        </div>
      )}

      <form onSubmit={handleSetOrUpdatePassword} className="space-y-3 pt-2 border-t border-white/15">
        <p className="text-xs text-sand">
          {hasPassword
            ? 'Forgot or want to change your login password? Set a fresh password below:'
            : 'Set a password to enable direct email & password sign-in:'}
        </p>

        <GlowInput
          name="newPassword"
          label="New Password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="new-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Min 8 characters"
          leadingIcon={<Lock className="w-4 h-4" />}
          trailingSlot={
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="p-1 text-sand hover:text-oat cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
        />

        <GlowInput
          name="confirmNewPassword"
          label="Confirm New Password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Repeat new password"
          leadingIcon={<Lock className="w-4 h-4" />}
        />

        <div className="flex flex-wrap gap-2 pt-1">
          <GlowButton type="submit" variant="primary" size="sm" disabled={updating} className="flex-1">
            {updating ? 'Updating…' : hasPassword ? 'Update Password' : 'Set Password'}
          </GlowButton>
          <GlowButton
            type="button"
            variant="secondary"
            size="sm"
            disabled={resetSending}
            onClick={handleSendResetEmail}
          >
            <Mail className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{resetSending ? 'Sending…' : 'Email Reset Link'}</span>
          </GlowButton>
        </div>
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

                {/* Right Column: Password Security + Bag Summary */}
                <div className="lg:col-span-5 space-y-5">
                  <PasswordSecurityCard
                    user={user}
                    profile={profile}
                    hasGoogle={hasGoogle}
                    hasPassword={hasPassword}
                    refreshProfile={refreshProfile}
                  />

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
