import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';
import { getFirebaseDb } from '@/lib/firebase/config';
import { getUserRole, type UserRole } from '@/lib/auth/roles';

export interface UserProfile {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  phone?: string;
  age: number;
  role: UserRole;
  authProviders: string[];
  photoURL?: string;
  profileCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

const USERS_COLLECTION = 'users';

export function splitFullName(fullName?: string | null): {
  firstName: string;
  lastName: string;
} {
  const cleaned = (fullName || '').trim().replace(/\s+/g, ' ');
  if (!cleaned) return { firstName: '', lastName: '' };
  const parts = cleaned.split(' ');
  const firstName = parts[0] || '';
  const lastName = parts.slice(1).join(' ');
  return { firstName, lastName };
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const db = getFirebaseDb();
  if (!db) return null;

  const snap = await getDoc(doc(db, USERS_COLLECTION, uid));
  if (!snap.exists()) return null;

  const data = snap.data() as UserProfile;
  return {
    ...data,
    uid: snap.id,
    role: getUserRole(data.email),
  };
}

export async function saveUserProfile(
  profile: Omit<UserProfile, 'role'> & { role?: UserRole }
): Promise<UserProfile> {
  const db = getFirebaseDb();
  if (!db) {
    throw new Error('Firebase Firestore is not configured yet.');
  }

  const normalizedEmail = profile.email.trim().toLowerCase();
  const payload: UserProfile = {
    ...profile,
    email: normalizedEmail,
    role: getUserRole(normalizedEmail),
  };

  await setDoc(doc(db, USERS_COLLECTION, profile.uid), payload, { merge: true });
  return payload;
}

export async function getAllUserProfiles(): Promise<UserProfile[]> {
  const db = getFirebaseDb();
  if (!db) {
    throw new Error('Firebase Firestore is not configured yet.');
  }

  const q = query(collection(db, USERS_COLLECTION), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => {
    const data = d.data() as UserProfile;
    return {
      ...data,
      uid: d.id,
      role: getUserRole(data.email),
    };
  });
}
