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
    '-top-8 -right-6',
    '-top-12 right-12',
    'top-8 -right-10',
    '-top-4 right-24',
  ],
  'edge-trail': [
    '-top-6 left-4',
    '-top-9 left-28',
    '-bottom-8 right-10',
    '-bottom-5 right-32',
  ],
  'side-accent': [
    'top-2 -left-10',
    'top-24 -left-8',
    'bottom-6 -left-10',
    'bottom-24 -left-6',
  ],
};

/**
 * Places 2-4 doodles in a composed decorative arrangement with automatic
 * 110ms staggered draw timing and zero pointer/focus interference.
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
      className={`pointer-events-none select-none ${className}`}
    >
      {items.slice(0, 4).map((item, idx) => (
        <Doodle
          key={item.name}
          name={item.name}
          tone={item.tone ?? 'oat'}
          size={item.size ?? (idx === 0 ? 112 : 68)}
          rotate={item.rotate ?? (idx % 2 === 0 ? -8 : 7)}
          opacity={item.opacity ?? (idx === 0 ? 0.88 : 0.72)}
          float={item.float}
          priority={priority}
          delay={idx * 0.11}
          showOn={item.showOn ?? (idx >= 2 ? 'md+' : 'all')}
          className={`absolute ${slots[idx] ?? ''}`}
        />
      ))}
    </div>
  );
}
