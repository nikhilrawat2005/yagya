'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { MOTION_EASE, MOTION_SPRING } from '@/lib/motion/tokens';
import { useInteractiveCapabilities } from '@/lib/motion/useInteractiveCapabilities';

export interface AccordionItemData {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItemData[];
  defaultOpenId?: string;
  className?: string;
}

/**
 * Reusable spring-animated accordion with smooth height transitions and glow border on hover/open.
 */
export function Accordion({ items, defaultOpenId, className = '' }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);
  const { prefersReducedMotion } = useInteractiveCapabilities();

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={`rounded-2xl border-2 transition-[border-color,box-shadow,background-color] duration-300 ease-[var(--ease-smooth)] ${
              isOpen
                ? 'bg-apricot/75 border-charcoal shadow-[var(--glow-level-1)]'
                : 'bg-apricot/45 border-charcoal/25 hover:border-burnt/65 hover:shadow-[var(--glow-level-1)]'
            }`}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left cursor-pointer group"
            >
              <span className="font-sans text-sm sm:text-base font-semibold text-indigo group-hover:text-burnt transition-colors">
                {item.title}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={prefersReducedMotion ? { duration: 0.01 } : MOTION_SPRING.tactile}
                className="w-7 h-7 rounded-full bg-oat border border-charcoal/25 flex items-center justify-center text-indigo shrink-0"
              >
                <ChevronDown className="w-4 h-4" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0.01 : 0.28, ease: MOTION_EASE.smooth }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4 pt-1 text-sm font-script-body text-indigo/95 border-t border-charcoal/15">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
