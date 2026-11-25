'use client';

import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion, useScroll } from 'motion/react';

export interface ChapterDefinition {
  id: string;
  number: string;
  label: string;
}

export interface ChapterIndexProps {
  chapters: ReadonlyArray<ChapterDefinition>;
}

/**
 * Fixed editorial side progress indicator (01 / 02 / 03 / 04) with a thin
 * scroll-progress track line and clickable chapter jumps.
 */
export function ChapterIndex({ chapters }: ChapterIndexProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

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
        { threshold: 0.45 }
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

  return (
    <aside
      aria-label="Story chapter progress"
      className="hidden lg:flex fixed right-6 xl:right-9 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-4 select-none"
    >
      <div className="flex flex-col items-center text-[11px] font-ui-label text-oat/90 tabular-nums">
        <span className="text-peach font-semibold">{activeChapter.number}</span>
        <span className="text-oat/45 my-0.5">/</span>
        <span className="text-oat/70">0{chapters.length}</span>
      </div>

      <div className="relative w-[1.5px] h-28 bg-oat/20 rounded-full overflow-hidden">
        <motion.div
          style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
          className="absolute inset-0 bg-gradient-to-b from-flame via-peach to-oat rounded-full"
        />
      </div>

      <nav aria-label="Jump to story chapter" className="flex flex-col items-center gap-2.5">
        {chapters.map((chapter, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={chapter.id}
              type="button"
              onClick={() => scrollToChapter(chapter.id)}
              aria-label={`Jump to chapter ${chapter.number}: ${chapter.label}`}
              title={`${chapter.number} · ${chapter.label}`}
              className="group relative p-1.5 cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oat"
            >
              <span
                className={`block rounded-full transition-[width,height,background-color,transform] duration-300 ${
                  isActive
                    ? 'w-2.5 h-2.5 bg-flame'
                    : 'w-1.5 h-1.5 bg-oat/45 group-hover:bg-apricot group-hover:scale-125'
                }`}
              />
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
