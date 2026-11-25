'use client';

import React from 'react';
import { BackgroundChapter } from '@/components/editorial/BackgroundChapter';
import { PAGE_BACKGROUND_SETS, type PageBackgroundKey } from '@/lib/assets';

export interface PageChapterItem {
  id: string;
  chapterNumber: string;
  chapterLabel: string;
  content: React.ReactNode;
  className?: string;
}

export interface PageBackgroundSetProps {
  page: PageBackgroundKey;
  chapters: readonly PageChapterItem[];
  showIndex?: boolean;
}

/**
 * Renders a 3-4 chapter full-bleed photographic story page using the dedicated
 * background set for `page` from ASSETS, with automatic desktop/mobile art direction.
 */
export function PageBackgroundSet({
  page,
  chapters,
}: PageBackgroundSetProps) {
  const backgrounds = PAGE_BACKGROUND_SETS[page];

  return (
    <div className="relative w-full text-oat">
      {chapters.map((chapter, idx) => {
        const bg = backgrounds[idx % backgrounds.length];
        return (
          <BackgroundChapter
            key={chapter.id}
            id={chapter.id}
            chapterNumber={chapter.chapterNumber}
            chapterLabel={chapter.chapterLabel}
            desktopSrc={bg.desktop}
            mobileSrc={bg.mobile}
            imageAlt={bg.alt}
            tone={bg.tone}
            isHero={idx === 0}
            isLast={idx === chapters.length - 1}
            className={chapter.className}
          >
            {chapter.content}
          </BackgroundChapter>
        );
      })}
    </div>
  );
}
