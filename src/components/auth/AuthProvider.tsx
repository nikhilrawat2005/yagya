'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  onAuthStateChanged,
  signOut as firebaseSignOut,
  type User,
} from 'firebase/auth';
import { getFirebaseAuth, isFirebaseConfigured } from '@/lib/firebase/config';
import { getUserProfile, type UserProfile } from '@/lib/firebase/users';
import { isAdminEmail } from '@/lib/auth/roles';

interface AuthContextValue {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  configured: boolean;
  isAdmin: boolean;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  profile: null,
  loading: true,
  configured: isFirebaseConfigured,
  isAdmin: false,
  refreshProfile: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(isFirebaseConfigured);

  const loadProfile = useCallback(async (firebaseUser: User | null) => {
    if (!firebaseUser) {
      setProfile(null);
      return;
    }
    try {
      const p = await getUserProfile(firebaseUser.uid);
      setProfile(p);
    } catch {
      // Gracefully keep auth session even if Firestore rules/DB aren't initialized yet
      setProfile(null);
    }
  }, []);

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) {
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);
      await loadProfile(nextUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [loadProfile]);

  const refreshProfile = useCallback(async () => {
    const auth = getFirebaseAuth();
    const current = auth?.currentUser ?? user;
    if (current) {
      setUser(current);
      await loadProfile(current);
    }
  }, [loadProfile, user]);

  const signOut = useCallback(async () => {
    const auth = getFirebaseAuth();
    if (!auth) return;
    await firebaseSignOut(auth);
    setUser(null);
    setProfile(null);
  }, []);

  const isAdmin = useMemo(() => isAdminEmail(user?.email), [user?.email]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      profile,
      loading,
      configured: isFirebaseConfigured,
      isAdmin,
      refreshProfile,
      signOut,
    }),
    [user, profile, loading, isAdmin, refreshProfile, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
