import { Suspense } from 'react';
import { LoginClient } from '@/components/auth/LoginClient';
import { Skeleton } from '@/components/ui/Skeleton';

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[100dvh] bg-navy pt-28 px-4 max-w-4xl mx-auto">
          <Skeleton className="h-96 w-full" />
        </div>
      }
    >
      <LoginClient />
    </Suspense>
  );
}
