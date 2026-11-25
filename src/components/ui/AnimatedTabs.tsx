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
        className={`flex flex-wrap border-b border-white/20 gap-6 font-ui-label text-[11px] ${className}`}
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
                active ? 'text-oat' : 'text-apricot/65 hover:text-oat'
              }`}
            >
              <span>{tab.label}</span>
              {active && (
                <motion.span
                  layoutId={layoutId}
                  transition={prefersReducedMotion ? { duration: 0.01 } : MOTION_SPRING.tactile}
                  className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-flame"
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
            whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
            onClick={() => onChange(tab.id)}
            className={`relative overflow-hidden px-4 py-2 rounded-[4px] font-ui-label text-[11px] whitespace-nowrap border transition-colors duration-200 cursor-pointer ${
              active
                ? 'text-navy font-semibold border-flame'
                : 'bg-[#141C2B]/65 text-apricot/95 border-white/25 hover:border-apricot/55 hover:text-oat'
            }`}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                transition={prefersReducedMotion ? { duration: 0.01 } : MOTION_SPRING.tactile}
                className="absolute inset-0 bg-flame rounded-[3px]"
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
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
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
