const DEFAULT_ADMIN_EMAILS = [
  'yagyastore@gmail.com',
  'nikhil2005114@gmail.com',
] as const;

export type UserRole = 'admin' | 'customer';

export function getAdminEmails(): string[] {
  const envRaw = process.env.NEXT_PUBLIC_ADMIN_EMAILS || '';
  const fromEnv = envRaw
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  return Array.from(new Set([...DEFAULT_ADMIN_EMAILS, ...fromEnv]));
}

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  return getAdminEmails().includes(normalized);
}

export function getUserRole(email?: string | null): UserRole {
  return isAdminEmail(email) ? 'admin' : 'customer';
}
