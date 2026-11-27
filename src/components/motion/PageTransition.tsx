'use client';

import type { ReactNode } from 'react';

export interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

/**
 * Pass-through wrapper in RootLayout.
 * Route entrance transitions are handled cleanly via `src/app/template.tsx`
 * without wrapping React 19's App Router Flight tree in AnimatePresence.
 */
export function PageTransition({ children, className = '' }: PageTransitionProps) {
  return <div className={className}>{children}</div>;
}
