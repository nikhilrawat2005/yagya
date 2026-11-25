'use client';

import React from 'react';
import { Doodle, type DoodleShowOn, type DoodleTone } from '@/components/doodles/Doodle';
import type { DoodleName } from '@/lib/doodles';

export type DoodleClusterLayout = 'corner-peek' | 'edge-trail' | 'side-accent';

export interface DoodleClusterItem {
  name: DoodleName;
  tone?: DoodleTone;
  size?: number | string;
  rotate?: number;
  opacity?: number;
  float?: boolean;
  showOn?: DoodleShowOn;
}

export interface DoodleClusterProps {
  layout?: DoodleClusterLayout;
  items: readonly DoodleClusterItem[];
  priority?: boolean;
  className?: string;
}

const PRESET_SLOTS: Record<DoodleClusterLayout, readonly string[]> = {
  'corner-peek': [
    '-top-16 -right-8',
    '-top-14 right-24',
    'top-8 -right-12',
    '-top-6 right-32',
  ],
  'edge-trail': [
    '-top-10 left-4',
    '-top-12 left-32',
    '-bottom-10 right-10',
    '-bottom-8 right-36',
  ],
  'side-accent': [
    'top-2 -left-12',
    'top-28 -left-10',
    'bottom-6 -left-12',
    'bottom-28 -left-8',
  ],
};

/**
 * Places 2-4 doodles in front (z-20) with slow staggered self-drawing timing.
 */
export function DoodleCluster({
  layout = 'corner-peek',
  items,
  priority = false,
  className = '',
}: DoodleClusterProps) {
  const slots = PRESET_SLOTS[layout];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none relative z-20 ${className}`}
    >
      {items.slice(0, 4).map((item, idx) => (
        <Doodle
          key={item.name}
          name={item.name}
          tone={item.tone ?? 'oat'}
          size={item.size ?? (idx === 0 ? 148 : 112)}
          rotate={item.rotate ?? (idx % 2 === 0 ? -8 : 7)}
          opacity={item.opacity ?? 0.92}
          float={item.float ?? true}
          drawDuration={2.2}
          priority={priority}
          delay={idx * 0.2}
          showOn={item.showOn ?? (idx >= 2 ? 'md+' : 'all')}
          className={`absolute ${slots[idx] ?? ''}`}
        />
      ))}
    </div>
  );
}
