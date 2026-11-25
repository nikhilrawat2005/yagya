'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MOTION_DURATION, MOTION_EASE, MOTION_SPRING } from '@/lib/motion/tokens';
import { useInteractiveCapabilities } from '@/lib/motion/useInteractiveCapabilities';

export interface TabOption<T extends string> {
  id: T;
  label: string;
}

export interface AnimatedTabsProps<T extends string> {
  tabs: ReadonlyArray<TabOption<T>>;
  activeTab: T;
  onChange: (id: T) => void;
  layoutId: string;
  variant?: 'pill' | 'underline';
  className?: string;
}

/**
 * Shared spring-animated tab strip with glowing active indicator (`layoutId`).
 */
export function AnimatedTabs<T extends string>({
  tabs,
  activeTab,
  onChange,
  layoutId,
  variant = 'pill',
  className = '',
}: AnimatedTabsProps<T>) {
  const { prefersReducedMotion } = useInteractiveCapabilities();

  if (variant === 'underline') {
    return (
      <div
        role="tablist"
        className={`flex flex-wrap border-b border-charcoal/20 gap-6 font-ui-label text-xs ${className}`}
      >
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              aria-selected={active}
              onClick={() => onChange(tab.id)}
              className={`relative pb-2.5 transition-colors duration-200 cursor-pointer ${
                active ? 'text-indigo' : 'text-indigo/65 hover:text-burnt'
              }`}
            >
              <span>{tab.label}</span>
              {active && (
                <motion.span
                  layoutId={layoutId}
                  transition={prefersReducedMotion ? { duration: 0.01 } : MOTION_SPRING.tactile}
                  className="absolute left-0 right-0 -bottom-[1px] h-0.5 rounded-full bg-gradient-to-r from-seabuckthorn via-burnt to-indigo shadow-[0_0_10px_var(--glow-primary)]"
                />
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div role="tablist" className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {tabs.map((tab) => {
        const active = activeTab === tab.id;
        return (
          <motion.button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={active}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
            onClick={() => onChange(tab.id)}
            className={`relative overflow-hidden px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-ui-label text-xs border transition-colors duration-200 cursor-pointer ${
              active
                ? 'text-oat border-indigo shadow-[var(--glow-level-1)]'
                : 'bg-apricot/80 text-indigo border-charcoal/25 hover:border-burnt hover:shadow-[var(--glow-level-1)]'
            }`}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                transition={prefersReducedMotion ? { duration: 0.01 } : MOTION_SPRING.tactile}
                className="absolute inset-0 bg-indigo rounded-full"
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

export interface AnimatedTabPanelProps {
  tabKey: string;
  children: React.ReactNode;
  className?: string;
}

export function AnimatedTabPanel({
  tabKey,
  children,
  className = '',
}: AnimatedTabPanelProps) {
  const { prefersReducedMotion } = useInteractiveCapabilities();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={tabKey}
        role="tabpanel"
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8, filter: 'blur(3px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6, filter: 'blur(3px)' }}
        transition={{
          duration: prefersReducedMotion ? 0.1 : MOTION_DURATION.fast + 0.05,
          ease: MOTION_EASE.smooth,
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
