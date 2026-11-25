'use client';

import React from 'react';
import {
  Doodle,
  type DoodlePreset,
  type DoodleShowOn,
  type DoodleTone,
} from '@/components/doodles/Doodle';
import type { DoodleName } from '@/lib/doodles';

export type DoodleClusterLayout = 'corner-peek' | 'edge-trail' | 'side-accent';

export interface DoodleClusterItem {
  name: DoodleName;
  preset?: DoodlePreset;
  tone?: DoodleTone;
  size?: number | string;
  rotate?: number;
  opacity?: number;
  float?: boolean;
  hover?: boolean;
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
    '-top-24 -right-10',
    '-top-22 right-28',
    'top-8 -right-14',
    '-top-8 right-36',
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
      {items.slice(0, 2).map((item, idx) => (
        <Doodle
          key={item.name}
          name={item.name}
          preset={item.preset ?? 'botanical'}
          tone={item.tone ?? 'oat'}
          size={item.size ?? (idx === 0 ? 124 : 96)}
          rotate={item.rotate ?? (idx % 2 === 0 ? -6 : 6)}
          opacity={item.opacity ?? 0.45}
          float={item.float}
          hover={item.hover}
          priority={priority}
          delay={idx * 0.16}
          showOn={item.showOn ?? 'md+'}
          className={`absolute ${slots[idx] ?? ''}`}
        />
      ))}
    </div>
  );
}
