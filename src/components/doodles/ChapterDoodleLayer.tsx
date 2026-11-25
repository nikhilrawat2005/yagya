'use client';

import React from 'react';
import { Doodle } from '@/components/doodles/Doodle';
import type { DoodlePlacement } from '@/config/doodle-placements';

export function ChapterDoodleLayer({
  placements,
  priority = false,
}: {
  placements?: readonly DoodlePlacement[];
  priority?: boolean;
}) {
  if (!placements || placements.length === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none absolute inset-0 z-20 overflow-visible"
    >
      {placements.map((item) => (
        <Doodle
          key={`${item.name}-${item.position}`}
          name={item.name}
          preset={item.preset ?? 'botanical'}
          tone={item.tone}
          size={item.size}
          rotate={item.rotate}
          opacity={item.opacity ?? 0.45}
          float={item.float}
          parallax={item.parallax}
          hover={item.hover}
          drawDuration={item.drawDuration}
          delay={item.delay ?? 0}
          showOn={item.showOn}
          priority={priority}
          className={`absolute ${item.position}`}
        />
      ))}
    </div>
  );
}
