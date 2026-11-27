'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  linkWithCredential,
  reauthenticateWithPopup,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  type User,
} from 'firebase/auth';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  User as UserIcon,
} from 'lucide-react';
import { siteConfig } from '@/lib/data/site';
import { ASSETS } from '@/lib/assets';
import {
  createGoogleProvider,
  getFirebaseAuth,
  isFirebaseConfigured,
} from '@/lib/firebase/config';
import {
  getUserProfile,
  saveUserProfile,
  splitFullName,
  type UserProfile,
} from '@/lib/firebase/users';
import { isAdminEmail } from '@/lib/auth/roles';
import { useAuth } from '@/components/auth/AuthProvider';
import { PageBackgroundSet } from '@/components/editorial/PageBackgroundSet';
import { OatSheet } from '@/components/editorial/OatSheet';
import { GlowInput } from '@/components/ui/GlowInput';
import { GlowButton } from '@/components/ui/GlowButton';
import { ProductImageWithFallback } from '@/components/ui/ProductImageWithFallback';

type AuthTab = 'signin' | 'signup';

function GoogleMark() {
  return (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function mapFirebaseAuthError(err: unknown): string {
  const code =
    typeof err === 'object' && err !== null && 'code' in err
      ? String((err as { code?: string }).code)
      : '';

  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Incorrect email or password. If you first signed up with Google, finish Step 2 or sign in with Google.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists. Try signing in instead.';
    case 'auth/weak-password':
      return 'Choose a stronger password (at least 8 characters).';
    case 'auth/invalid-email':
      return 'Enter a valid email address.';
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      return 'Google sign-in popup was closed before finishing.';
    case 'auth/popup-blocked':
      return 'Your browser blocked the Google sign-in popup. Please allow popups for this site.';
    case 'auth/account-exists-with-different-credential':
      return 'This email is already registered with a different sign-in method. Sign in with your original method first.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a moment and try again.';
    default:
      return err instanceof Error ? err.message : 'Authentication failed. Please try again.';
  }
}

function validateOnboardingFields(fields: {
  firstName: string;
  lastName: string;
  email?: string;
  requireEmail: boolean;
  phone: string;
  age: string;
  password: string;
  confirmPassword: string;
}): string | null {
  if (!fields.firstName.trim()) return 'Enter your first name.';
  if (!fields.lastName.trim()) return 'Enter your last name.';
  if (fields.requireEmail && (!fields.email?.trim() || !fields.email.includes('@'))) {
    return 'Enter a valid email address.';
  }
  const cleanedPhone = fields.phone.trim();
  if (cleanedPhone && !/^\d{10}$/.test(cleanedPhone)) {
    return 'Phone number must be 10 digits (or leave it blank since it is optional).';
  }
  const ageNum = Number(fields.age);
  if (!fields.age.trim() || !Number.isInteger(ageNum) || ageNum < 13 || ageNum > 120) {
    return 'Enter a valid age between 13 and 120.';
  }
  if (fields.password.length < 8) {
    return 'Create a password with at least 8 characters.';
  }
  if (fields.password !== fields.confirmPassword) {
    return 'Passwords do not match.';
  }
  return null;
}

function GoogleOnboardingForm({
  targetUser,
  existingProfile,
  onSuccess,
  onError,
}: {
  targetUser: User;
  existingProfile: UserProfile | null;
  onSuccess: (email: string | null) => Promise<void>;
  onError: (msg: string | null) => void;
}) {
  const parsed = splitFullName(targetUser.displayName);
  const [firstName, setFirstName] = useState(existingProfile?.firstName || parsed.firstName);
  const [lastName, setLastName] = useState(existingProfile?.lastName || parsed.lastName);
  const [phone, setPhone] = useState(existingProfile?.phone || '');
  const [age, setAge] = useState(existingProfile?.age ? String(existingProfile.age) : '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleComplete = async (e: React.FormEvent) => {
    e.preventDefault();
    onError(null);

    const auth = getFirebaseAuth();
    const activeUser = auth?.currentUser ?? targetUser;
    if (!auth || !activeUser.email) {
      onError('Google session expired. Please sign in with Google again.');
      return;
    }

    const validationError = validateOnboardingFields({
      firstName,
      lastName,
      requireEmail: false,
      phone,
      age,
      password,
      confirmPassword,
    });
    if (validationError) {
      onError(validationError);
      return;
    }

    setSubmitting(true);
    try {
      const providerIds = activeUser.providerData.map((p) => p.providerId);
      if (!providerIds.includes('password')) {
        const emailCredential = EmailAuthProvider.credential(activeUser.email, password);
        try {
          await linkWithCredential(activeUser, emailCredential);
        } catch (linkErr: unknown) {
          const code =
            typeof linkErr === 'object' && linkErr !== null && 'code' in linkErr
              ? String((linkErr as { code?: string }).code)
              : '';
          if (code === 'auth/requires-recent-login') {
            await reauthenticateWithPopup(activeUser, createGoogleProvider());
            await linkWithCredential(activeUser, emailCredential);
          } else if (code !== 'auth/provider-already-linked') {
            throw linkErr;
          }
        }
      }

      const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
      await updateProfile(activeUser, { displayName: fullName });

      const existing = await getUserProfile(activeUser.uid).catch(() => existingProfile);
      const now = new Date().toISOString();
      const updatedProviders = Array.from(
        new Set(activeUser.providerData.map((p) => p.providerId).concat('password'))
      );

      await saveUserProfile({
        uid: activeUser.uid,
        email: activeUser.email,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        displayName: fullName,
        phone: phone.trim() || undefined,
        age: Number(age),
        authProviders: updatedProviders,
        photoURL: activeUser.photoURL || undefined,
        profileCompleted: true,
        createdAt: existing?.createdAt || now,
        updatedAt: now,
      });

      await onSuccess(activeUser.email);
    } catch (err) {
      onError(mapFirebaseAuthError(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleComplete} noValidate className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/15">
        <div>
          <span className="font-ui-label text-[10px] text-peach block">
            Step 2 of 2 · Complete Account Setup
          </span>
          <h2 className="font-display text-2xl text-oat font-medium">
            Verify Details &amp; Set Password
          </h2>
        </div>
        <span className="font-ui-label text-[10px] px-2.5 py-1 rounded-[4px] bg-[#252905]/85 text-sage border border-sage/35 inline-flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
          Google Connected
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <GlowInput
          name="firstName"
          label="First Name *"
          autoComplete="given-name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name…"
        />
        <GlowInput
          name="lastName"
          label="Last Name *"
          autoComplete="family-name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last name…"
        />
      </div>

      <GlowInput
        name="googleEmail"
        label="Google Email (Verified)"
        type="email"
        value={targetUser.email || ''}
        readOnly
        leadingIcon={<Mail className="w-4 h-4" />}
        inputClassName="opacity-85 cursor-not-allowed"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <GlowInput
          name="phone"
          label="Phone Number (Optional)"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
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
          placeholder="e.g. 24"
        />
      </div>

      <div className="pt-2 border-t border-white/15 space-y-3.5">
        <p className="text-xs text-sand">
          Create a password to secure your account and enable direct email + password login later.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <GlowInput
            name="password"
            label="Create Password *"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            name="confirmPassword"
            label="Confirm Password *"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repeat password"
            leadingIcon={<Lock className="w-4 h-4" />}
          />
        </div>
      </div>

      <GlowButton
        type="submit"
        variant="cta"
        disabled={submitting}
        className="w-full py-3.5 mt-2"
      >
        <span>{submitting ? 'Securing Account…' : 'Save & Enter Dashboard'}</span>
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </GlowButton>
    </form>
  );
}

export function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextParam = searchParams.get('next');
  const forceComplete = searchParams.get('complete') === '1';

  const { user, profile, loading: authLoading, refreshProfile } = useAuth();

  const [tab, setTab] = useState<AuthTab>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);

  // Sign In fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Email Sign Up fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const getPostLoginRoute = (email?: string | null) => {
    if (nextParam && nextParam.startsWith('/')) {
      if (nextParam.startsWith('/admin') && !isAdminEmail(email)) {
        return '/dashboard';
      }
      return nextParam;
    }
    return isAdminEmail(email) ? '/admin' : '/dashboard';
  };

  const providerIds = user?.providerData.map((p) => p.providerId) ?? [];
  const hasPasswordLinked = providerIds.includes('password');
  const needsGoogleOnboarding = Boolean(
    !authLoading &&
      user &&
      (forceComplete || !profile?.profileCompleted || !hasPasswordLinked)
  );

  useEffect(() => {
    if (authLoading || !user || needsGoogleOnboarding) return;
    router.replace(getPostLoginRoute(user.email));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, user, needsGoogleOnboarding]);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setInfoMsg(null);

    const auth = getFirebaseAuth();
    if (!auth) {
      setErrorMsg('Firebase is not configured yet. Add your NEXT_PUBLIC_FIREBASE_* keys to .env.local.');
      return;
    }

    if (!loginEmail.trim() || !loginPassword) {
      setErrorMsg('Enter both your email and password.');
      return;
    }

    setSubmitting(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, loginEmail.trim(), loginPassword);
      await refreshProfile();
      router.push(getPostLoginRoute(cred.user.email));
    } catch (err) {
      setErrorMsg(mapFirebaseAuthError(err));
    } finally {
      setSubmitting(false);
    }
  };

  const handleForgotPassword = async () => {
    setErrorMsg(null);
    setInfoMsg(null);
    const auth = getFirebaseAuth();
    if (!auth) {
      setErrorMsg('Firebase is not configured yet.');
      return;
    }
    if (!loginEmail.trim() || !loginEmail.includes('@')) {
      setErrorMsg('Enter your email address above first so we can send a reset link.');
      return;
    }
    setSubmitting(true);
    try {
      await sendPasswordResetEmail(auth, loginEmail.trim());
      setInfoMsg(`Password reset link sent to ${loginEmail.trim()}. Check your inbox.`);
    } catch (err) {
      setErrorMsg(mapFirebaseAuthError(err));
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg(null);
    setInfoMsg(null);

    const auth = getFirebaseAuth();
    if (!auth) {
      setErrorMsg('Firebase is not configured yet. Add your NEXT_PUBLIC_FIREBASE_* keys to .env.local.');
      return;
    }

    setSubmitting(true);
    try {
      const result = await signInWithPopup(auth, createGoogleProvider());
      await refreshProfile();
      const gUser = result.user;
      const existing = await getUserProfile(gUser.uid).catch(() => null);
      const hasPass = gUser.providerData.some((p) => p.providerId === 'password');
      if (existing?.profileCompleted && hasPass) {
        router.push(getPostLoginRoute(gUser.email));
      }
      // Otherwise AuthProvider updates `user` and needsGoogleOnboarding shows Step 2 automatically
    } catch (err) {
      setErrorMsg(mapFirebaseAuthError(err));
    } finally {
      setSubmitting(false);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setInfoMsg(null);

    const auth = getFirebaseAuth();
    if (!auth) {
      setErrorMsg('Firebase is not configured yet. Add your NEXT_PUBLIC_FIREBASE_* keys to .env.local.');
      return;
    }

    const validationError = validateOnboardingFields({
      firstName,
      lastName,
      email: signupEmail,
      requireEmail: true,
      phone,
      age,
      password,
      confirmPassword,
    });
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setSubmitting(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, signupEmail.trim(), password);
      const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
      await updateProfile(cred.user, { displayName: fullName });

      const now = new Date().toISOString();
      await saveUserProfile({
        uid: cred.user.uid,
        email: cred.user.email || signupEmail.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        displayName: fullName,
        phone: phone.trim() || undefined,
        age: Number(age),
        authProviders: ['password'],
        profileCompleted: true,
        createdAt: now,
        updatedAt: now,
      });

      await refreshProfile();
      router.push(getPostLoginRoute(cred.user.email));
    } catch (err) {
      setErrorMsg(mapFirebaseAuthError(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageBackgroundSet
      page="signature"
      chapters={[
        {
          id: 'auth-01',
          chapterNumber: '01',
          chapterLabel: 'Account',
          compact: true,
          content: (
            <div className="max-w-5xl mx-auto pt-2 sm:pt-4">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Editorial Context */}
                <div className="lg:col-span-5">
                  <OatSheet tone="subtle" interactive={false} className="p-6 sm:p-8 space-y-5">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-[4px] overflow-hidden border border-white/25 bg-oat shrink-0">
                        <ProductImageWithFallback
                          src={ASSETS.brand.logoPrimary}
                          alt={siteConfig.name}
                          fill
                          sizes="40px"
                          preload
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-display text-2xl tracking-[0.06em] font-semibold text-oat block leading-none">
                          {siteConfig.name.toUpperCase()}
                        </span>
                        <span className="font-ui-label text-[9px] text-peach block mt-1">
                          Member &amp; Pantry Access
                        </span>
                      </div>
                    </div>

                    <h1 className="font-display text-3xl sm:text-4xl text-oat font-medium leading-tight">
                      {needsGoogleOnboarding
                        ? 'One quick step to secure your account.'
                        : 'Sign in to your harvest pantry.'}
                    </h1>

                    <p className="text-sm text-sand leading-relaxed">
                      {needsGoogleOnboarding
                        ? 'We pulled your name and email from Google. Add your age, optional mobile number, and a password so you can also log in directly with your email anytime.'
                        : 'Continue with Google in two quick steps, or sign in with your email and password to manage your profile and track harvests.'}
                    </p>

                    <ul className="space-y-2.5 pt-3 border-t border-white/15 text-xs text-sand">
                      <li className="flex items-center gap-2.5">
                        <ShieldCheck className="w-4 h-4 text-peach shrink-0" aria-hidden="true" />
                        <span>Google + Email/Password dual-login linking</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <Sparkles className="w-4 h-4 text-peach shrink-0" aria-hidden="true" />
                        <span>Personal Pantry Dashboard &amp; Admin Workspace</span>
                      </li>
                    </ul>
                  </OatSheet>
                </div>

                {/* Right Interactive Auth Card */}
                <div className="lg:col-span-7">
                  <OatSheet tone="medium" interactive={false} className="p-6 sm:p-8">
                    {!isFirebaseConfigured && (
                      <div
                        role="status"
                        className="mb-5 rounded-[6px] border border-peach/45 bg-flame/15 p-3.5 text-xs text-oat flex items-start gap-2.5"
                      >
                        <AlertCircle className="w-4 h-4 text-peach shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                          <p className="font-semibold text-peach">Firebase environment keys pending</p>
                          <p className="text-sand mt-0.5">
                            Add <code className="text-oat">NEXT_PUBLIC_FIREBASE_*</code> values in{' '}
                            <code className="text-oat">.env.local</code> and Vercel to activate sign-in.
                          </p>
                        </div>
                      </div>
                    )}

                    {errorMsg && (
                      <div
                        role="alert"
                        className="mb-5 rounded-[6px] border border-flame/60 bg-flame/20 p-3.5 text-xs text-oat flex items-start gap-2.5"
                      >
                        <AlertCircle className="w-4 h-4 text-peach shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    {infoMsg && (
                      <div
                        role="status"
                        className="mb-5 rounded-[6px] border border-sage/50 bg-[#252905]/80 p-3.5 text-xs text-oat flex items-start gap-2.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{infoMsg}</span>
                      </div>
                    )}

                    {needsGoogleOnboarding && user ? (
                      <GoogleOnboardingForm
                        key={user.uid}
                        targetUser={user}
                        existingProfile={profile}
                        onError={setErrorMsg}
                        onSuccess={async (email) => {
                          await refreshProfile();
                          router.push(getPostLoginRoute(email));
                        }}
                      />
                    ) : (
                      <div className="space-y-5">
                        {/* Mode Switcher */}
                        <div className="flex items-center gap-2 p-1 rounded-[6px] bg-[#141C2B]/80 border border-white/15">
                          <button
                            type="button"
                            onClick={() => {
                              setTab('signin');
                              setErrorMsg(null);
                              setInfoMsg(null);
                            }}
                            className={`flex-1 py-2.5 rounded-[4px] font-ui-label text-[11px] transition-colors cursor-pointer ${
                              tab === 'signin'
                                ? 'bg-flame text-navy font-semibold'
                                : 'text-sand hover:text-oat'
                            }`}
                          >
                            Sign In
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setTab('signup');
                              setErrorMsg(null);
                              setInfoMsg(null);
                            }}
                            className={`flex-1 py-2.5 rounded-[4px] font-ui-label text-[11px] transition-colors cursor-pointer ${
                              tab === 'signup'
                                ? 'bg-flame text-navy font-semibold'
                                : 'text-sand hover:text-oat'
                            }`}
                          >
                            Create Account
                          </button>
                        </div>

                        {/* Google Quick Continue */}
                        <button
                          type="button"
                          onClick={handleGoogleSignIn}
                          disabled={submitting}
                          className="w-full min-h-[46px] px-4 py-2.5 rounded-[6px] bg-[#FAF5EA] text-[#141C2B] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2.5 border border-white/40 hover:bg-[#FDE6C8] transition-colors cursor-pointer disabled:opacity-55"
                        >
                          <GoogleMark />
                          <span>
                            {tab === 'signin' ? 'Continue with Google' : 'Sign Up with Google (2 Steps)'}
                          </span>
                        </button>

                        <div className="flex items-center gap-3 text-[11px] font-ui-label text-sand/85">
                          <span className="h-px flex-1 bg-white/15" />
                          <span>or with email</span>
                          <span className="h-px flex-1 bg-white/15" />
                        </div>

                        {tab === 'signin' ? (
                          <form onSubmit={handleEmailSignIn} noValidate className="space-y-4">
                            <GlowInput
                              name="loginEmail"
                              label="Email Address"
                              type="email"
                              autoComplete="email"
                              spellCheck={false}
                              value={loginEmail}
                              onChange={(e) => setLoginEmail(e.target.value)}
                              placeholder="you@example.com"
                              leadingIcon={<Mail className="w-4 h-4" />}
                            />

                            <div>
                              <GlowInput
                                name="loginPassword"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                placeholder="Enter your password"
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
                              <div className="flex justify-end mt-1.5">
                                <button
                                  type="button"
                                  onClick={handleForgotPassword}
                                  disabled={submitting}
                                  className="text-[11px] text-peach hover:text-oat underline underline-offset-4 cursor-pointer"
                                >
                                  Forgot password?
                                </button>
                              </div>
                            </div>

                            <GlowButton
                              type="submit"
                              variant="cta"
                              disabled={submitting}
                              className="w-full py-3.5"
                            >
                              <span>{submitting ? 'Signing In…' : 'Sign In with Email'}</span>
                              <ArrowRight className="w-4 h-4" aria-hidden="true" />
                            </GlowButton>
                          </form>
                        ) : (
                          <form onSubmit={handleEmailSignUp} noValidate className="space-y-3.5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                              <GlowInput
                                name="firstName"
                                label="First Name *"
                                autoComplete="given-name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="Aarav"
                                leadingIcon={<UserIcon className="w-4 h-4" />}
                              />
                              <GlowInput
                                name="lastName"
                                label="Last Name *"
                                autoComplete="family-name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Singh"
                              />
                            </div>

                            <GlowInput
                              name="signupEmail"
                              label="Email Address *"
                              type="email"
                              autoComplete="email"
                              spellCheck={false}
                              value={signupEmail}
                              onChange={(e) => setSignupEmail(e.target.value)}
                              placeholder="you@example.com"
                              leadingIcon={<Mail className="w-4 h-4" />}
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                              <GlowInput
                                name="phone"
                                label="Phone (Optional)"
                                type="tel"
                                inputMode="tel"
                                autoComplete="tel"
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
                                placeholder="e.g. 24"
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                              <GlowInput
                                name="password"
                                label="Password *"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="new-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Min 8 chars"
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
                                name="confirmPassword"
                                label="Confirm Password *"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="new-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Repeat password"
                                leadingIcon={<Lock className="w-4 h-4" />}
                              />
                            </div>

                            <GlowButton
                              type="submit"
                              variant="cta"
                              disabled={submitting}
                              className="w-full py-3.5 mt-1"
                            >
                              <span>{submitting ? 'Creating Account…' : 'Create Account'}</span>
                              <ArrowRight className="w-4 h-4" aria-hidden="true" />
                            </GlowButton>
                          </form>
                        )}

                        <p className="text-[11px] text-sand/85 text-center pt-1">
                          Need help?{' '}
                          <Link href="/contact" className="text-peach hover:text-oat underline underline-offset-4">
                            Contact {siteConfig.name} support
                          </Link>
                        </p>
                      </div>
                    )}
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
