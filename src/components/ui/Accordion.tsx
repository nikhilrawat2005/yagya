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
            className={`rounded-[6px] border backdrop-blur-[16px] transition-colors duration-300 ${
              isOpen
                ? 'bg-[#F6EFE2]/[0.18] border-apricot/45'
                : 'bg-[#F6EFE2]/[0.12] border-white/25 hover:bg-[#F6EFE2]/[0.16]'
            }`}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="w-full min-h-[48px] px-4 sm:px-5 py-3.5 sm:py-4 flex items-center justify-between gap-4 text-left cursor-pointer group"
            >
              <span className="font-sans text-sm sm:text-base font-medium text-oat group-hover:text-peach transition-colors">
                {item.title}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={prefersReducedMotion ? { duration: 0.01 } : MOTION_SPRING.tactile}
                className="w-9 h-9 rounded-[4px] bg-oat/10 border border-white/20 flex items-center justify-center text-oat shrink-0"
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
                  <div className="px-5 pb-4 pt-1 text-sm text-apricot/90 border-t border-white/15">
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
