'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useInteractiveCapabilities } from '@/lib/motion/useInteractiveCapabilities';

export interface ChapterDefinition {
  id: string;
  number: string;
  label: string;
}

export interface ChapterIndexProps {
  chapters: ReadonlyArray<ChapterDefinition>;
}

/**
 * Responsive chapter index & reading progress:
 * - Mobile & Tablet (<1024px): thin top horizontal scroll bar + compact bottom dot indicator pill (>=44px touch targets)
 * - Laptop / Desktop (1024px+): fixed right-edge vertical readout (01 / 04), progress track, and interactive chapter dots
 */
export function ChapterIndex({ chapters }: ChapterIndexProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showMobileDots, setShowMobileDots] = useState(false);
  const { prefersReducedMotion } = useInteractiveCapabilities();

  useEffect(() => {
    const onScroll = () => setShowMobileDots(window.scrollY > 72);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    chapters.forEach((chapter, idx) => {
      const el = document.getElementById(chapter.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveIndex(idx);
            }
          });
        },
        { threshold: 0.35 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [chapters]);

  const scrollToChapter = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  const activeChapter = chapters[activeIndex] ?? chapters[0];
  const progressFraction = (activeIndex + 1) / Math.max(chapters.length, 1);

  return (
    <>
      {/* Mobile & Tablet Top Hairline Progress Bar (< 1024px) */}
      <div
        aria-hidden="true"
        className="lg:hidden fixed top-0 left-0 right-0 h-[3px] z-[60] bg-oat/10 pointer-events-none"
      >
        <motion.div
          animate={{ scaleX: progressFraction }}
          transition={
            prefersReducedMotion
              ? { duration: 0.01 }
              : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
          }
          style={{ transformOrigin: 'left' }}
          className="h-full w-full bg-gradient-to-r from-flame via-peach to-oat"
        />
      </div>

      {/* Mobile & Tablet Compact Bottom-Right Dot Indicator (< 1024px, shown past Hero fold so never overlaps Hero CTA) */}
      <aside
        aria-label="Chapter progress"
        className={`lg:hidden fixed bottom-[max(0.625rem,var(--safe-bottom))] right-[max(0.75rem,var(--safe-right))] z-40 transition-all duration-300 ${
          showMobileDots
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-3 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-0.5 px-2 rounded-[6px] bg-navy/75 oat-sheet-blur border border-white/25 shadow-[0_10px_28px_-8px_rgba(10,12,18,0.6)]">
          <span className="font-ui-label text-[10px] text-flame font-semibold pl-1 pr-1 whitespace-nowrap">
            {activeChapter.number}
            <span className="text-oat/45 mx-0.5">/</span>
            <span className="text-oat/75">0{chapters.length}</span>
          </span>

          <nav aria-label="Jump to story chapter" className="flex items-center">
            {chapters.map((chapter, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={chapter.id}
                  type="button"
                  onClick={() => scrollToChapter(chapter.id)}
                  aria-label={`Jump to chapter ${chapter.number}: ${chapter.label}`}
                  aria-current={isActive ? 'step' : undefined}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      isActive
                        ? 'w-5 h-2 bg-flame shadow-[0_0_10px_rgba(223,127,37,0.75)]'
                        : 'w-2 h-2 bg-oat/45 hover:bg-apricot'
                    }`}
                  />
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Laptop & Desktop Fixed Right Side Index (1024px+) */}
      <aside
        aria-label="Story chapter progress"
        className="hidden lg:flex fixed right-6 xl:right-9 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-4 select-none"
      >
        {/* Current Readout e.g. 01 / 04 */}
        <div className="flex flex-col items-center text-[11px] font-ui-label tracking-[0.18em] text-oat/85">
          <span className="text-flame font-semibold">{activeChapter.number}</span>
          <span className="text-oat/35 my-0.5">/</span>
          <span className="text-oat/55">0{chapters.length}</span>
        </div>

        {/* Thin vertical progress line */}
        <div className="relative w-[1.5px] h-28 bg-oat/20 rounded-full overflow-hidden">
          <motion.div
            animate={{ scaleY: progressFraction }}
            transition={
              prefersReducedMotion
                ? { duration: 0.01 }
                : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
            }
            style={{ transformOrigin: 'top' }}
            className="absolute inset-0 bg-gradient-to-b from-flame via-peach to-oat rounded-full"
          />
        </div>

        {/* Chapter navigation dots (44x44 hit targets) */}
        <nav aria-label="Jump to story chapter" className="flex flex-col items-center gap-0.5">
          {chapters.map((chapter, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={chapter.id}
                type="button"
                onClick={() => scrollToChapter(chapter.id)}
                aria-label={`Jump to chapter ${chapter.number}: ${chapter.label}`}
                aria-current={isActive ? 'step' : undefined}
                title={`${chapter.number} · ${chapter.label}`}
                className="group relative min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-2.5 h-2.5 bg-flame shadow-[0_0_12px_rgba(223,127,37,0.8)]'
                      : 'w-1.5 h-1.5 bg-oat/40 group-hover:bg-apricot group-hover:scale-125'
                  }`}
                />
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
