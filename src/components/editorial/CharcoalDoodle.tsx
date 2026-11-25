'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { ASSETS } from '@/lib/assets';

export type CharcoalDoodleName = 'blueberry' | 'olive' | 'seeds' | 'blackberry';
export type CharcoalDoodleVariant = 'stamp' | 'halo';
export type CharcoalDoodleSize = 'xs' | 'sm' | 'md' | 'lg';

export interface CharcoalDoodleProps {
  name: CharcoalDoodleName;
  variant?: CharcoalDoodleVariant;
  size?: CharcoalDoodleSize;
  rotate?: number;
  delay?: number;
  className?: string;
}

const ASSET_MAP: Record<CharcoalDoodleName, { src: string; alt: string }> = {
  blueberry: {
    src: ASSETS.doodles.charcoalBlueberry,
    alt: 'Hand-drawn black charcoal botanical sketch of fresh blueberries on a twig',
  },
  olive: {
    src: ASSETS.doodles.charcoalOlive,
    alt: 'Hand-drawn black charcoal botanical sketch of an olive branch sprig',
  },
  seeds: {
    src: ASSETS.doodles.charcoalSeeds,
    alt: 'Hand-drawn black charcoal sketch of sea buckthorn berries, almonds, and farm seeds',
  },
  blackberry: {
    src: ASSETS.doodles.charcoalBlackberry,
    alt: 'Hand-drawn black charcoal botanical sketch of wild blackberries and orchard plums',
  },
};

const SIZE_CLASSES: Record<CharcoalDoodleSize, string> = {
  xs: 'w-14 h-14',
  sm: 'w-20 h-20 sm:w-24 sm:h-24',
  md: 'w-24 h-24 sm:w-28 sm:h-28',
  lg: 'w-28 h-28 sm:w-32 sm:h-32',
};

/**
 * Hand-drawn black charcoal botanical/berry illustration anchored cleanly to sheets
 * or floating margins. Uses transparent charcoal ink with a subtle Oat Mist chalk halo
 * so pure dark charcoal sketch strokes stay crisp over dark backgrounds and glass sheets
 * without opaque rectangular sticker boxes.
 */
export function CharcoalDoodle({
  name,
  variant = 'halo',
  size = 'md',
  rotate = -3,
  delay = 0.15,
  className = '',
}: CharcoalDoodleProps) {
  const prefersReducedMotion = useReducedMotion();
  const asset = ASSET_MAP[name];
  const isPositioned = /\b(absolute|fixed|sticky)\b/.test(className);
  const positionClass = isPositioned ? '' : 'relative';

  if (variant === 'stamp') {
    return (
      <motion.div
        aria-hidden="true"
        initial={
          prefersReducedMotion
            ? { opacity: 1 }
            : { opacity: 0, y: 8, scale: 0.94, rotate: rotate - 3 }
        }
        whileInView={{ opacity: 1, y: 0, scale: 1, rotate }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{
          duration: prefersReducedMotion ? 0.12 : 0.65,
          delay: prefersReducedMotion ? 0 : delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`pointer-events-none select-none ${positionClass} rounded-[4px] bg-[#F6EFE2]/[0.88] border border-[#F6EFE2] p-1.5 shadow-[0_14px_30px_-10px_rgba(8,10,16,0.55)] ${SIZE_CLASSES[size]} ${className}`}
      >
        <div className="relative w-full h-full">
          <Image
            src={asset.src}
            alt={asset.alt}
            fill
            sizes="128px"
            className="object-contain contrast-125"
          />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      aria-hidden="true"
      initial={
        prefersReducedMotion
          ? { opacity: 0.95 }
          : { opacity: 0, scale: 0.92, rotate: rotate - 3 }
      }
      whileInView={{ opacity: 0.98, scale: 1, rotate }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: prefersReducedMotion ? 0.12 : 0.6,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`pointer-events-none select-none ${positionClass} ${SIZE_CLASSES[size]} ${className}`}
      style={{
        filter:
          'drop-shadow(0 0 1.25px rgba(246, 239, 226, 0.95)) drop-shadow(0 0 6px rgba(246, 239, 226, 0.52))',
      }}
    >
      <div className="relative w-full h-full">
        <Image
          src={asset.src}
          alt={asset.alt}
          fill
          sizes="128px"
          className="object-contain contrast-125"
        />
      </div>
    </motion.div>
  );
}
