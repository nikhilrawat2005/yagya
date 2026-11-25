'use client';

import React from 'react';
import { DoodlePath } from './DoodlePath';

export interface DoodleJarProps {
  delay?: number;
  className?: string;
}

/**
 * Hand-drawn Charcoal marker-sketch apothecary farm jar filled with seeds & berries,
 * twine bow, hanging tag, and sprouting botanical sprig.
 */
export function DoodleJar({ delay = 0.1, className = '' }: DoodleJarProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 240 280"
      fill="none"
      className={`text-charcoal pointer-events-none select-none w-full h-auto drop-shadow-[0_10px_18px_rgba(43,43,43,0.09)] ${className}`}
    >
      {/* Jar Lid */}
      <DoodlePath
        d="M72 52 C 72 40, 168 40, 168 52 L 168 68 C 168 74, 72 74, 72 68 Z"
        strokeWidth={3.1}
        delay={delay}
        duration={0.65}
      />
      {/* Lid highlight & ribbed marks */}
      <DoodlePath
        d="M84 54 L 84 65 M100 52 L 100 66 M118 51 L 118 66 M136 52 L 136 66 M152 54 L 152 65"
        strokeWidth={2}
        delay={delay + 0.15}
        duration={0.45}
        opacity={0.75}
      />

      {/* Jar Neck & Shoulders */}
      <DoodlePath
        d="M78 71 C 78 82, 54 94, 52 118 L 52 222 C 52 246, 74 256, 120 256 C 166 256, 188 246, 188 222 L 188 118 C 186 94, 162 82, 162 71"
        strokeWidth={3.2}
        delay={delay + 0.12}
        duration={0.85}
      />

      {/* Twine wrap around neck & bow */}
      <DoodlePath
        d="M74 84 C 102 90, 138 90, 166 84 M75 90 C 102 96, 138 96, 165 90"
        strokeWidth={2.2}
        delay={delay + 0.3}
        duration={0.45}
      />
      <DoodlePath
        d="M158 88 C 174 78, 182 88, 168 96 C 179 102, 174 114, 161 102"
        strokeWidth={2.1}
        delay={delay + 0.4}
        duration={0.4}
      />

      {/* Hanging Kraft Harvest Tag */}
      <DoodlePath
        d="M161 95 L 178 116 L 194 128 L 182 146 L 164 132 L 161 95 Z"
        strokeWidth={2.2}
        delay={delay + 0.45}
        duration={0.5}
      />
      <DoodlePath
        d="M170 120 L 181 128 M168 127 L 176 133"
        strokeWidth={1.8}
        delay={delay + 0.55}
        duration={0.3}
        opacity={0.8}
      />

      {/* Hand-drawn Paper Label Band on Jar */}
      <DoodlePath
        d="M62 144 C 98 152, 142 152, 178 144 L 178 198 C 142 206, 98 206, 62 198 Z"
        strokeWidth={2.6}
        delay={delay + 0.32}
        duration={0.65}
      />
      {/* Botanical Leaf Emblem inside Label */}
      <DoodlePath
        d="M120 158 C 106 164, 104 182, 120 191 C 136 182, 134 164, 120 158 Z M120 162 L 120 189 M113 173 L 120 177 M127 170 L 120 175"
        strokeWidth={2.1}
        delay={delay + 0.5}
        duration={0.5}
      />
      {/* Label side accent lines */}
      <DoodlePath
        d="M76 170 L 94 172 M76 178 L 91 179 M146 172 L 164 170 M149 179 L 164 178"
        strokeWidth={2}
        delay={delay + 0.6}
        duration={0.35}
        opacity={0.75}
      />

      {/* Visible Seeds & Berries heaped inside Bottom & Top of Jar */}
      <DoodlePath
        d="M66 218 C 70 210, 82 212, 82 221 C 80 229, 66 227, 66 218 Z M94 222 C 98 214, 110 214, 112 224 C 110 232, 94 232, 94 222 Z M126 220 C 130 212, 144 214, 144 224 C 142 232, 126 230, 126 220 Z M155 216 C 160 209, 173 212, 173 221 C 171 229, 155 227, 155 216 Z"
        strokeWidth={2.1}
        delay={delay + 0.55}
        duration={0.55}
      />
      <DoodlePath
        d="M80 237 C 84 231, 96 233, 94 241 C 90 247, 79 244, 80 237 Z M110 238 C 114 232, 126 234, 125 242 C 120 248, 108 245, 110 238 Z M142 236 C 146 230, 158 232, 156 240 C 151 246, 140 243, 142 236 Z"
        strokeWidth={2}
        delay={delay + 0.65}
        duration={0.45}
        opacity={0.85}
      />
      {/* Glass reflection strokes & top seeds */}
      <DoodlePath
        d="M66 116 C 65 126, 65 132, 66 138 M172 114 C 174 123, 174 129, 173 135 M96 112 C 102 106, 114 108, 112 116 C 108 122, 95 119, 96 112 Z M128 115 C 134 108, 146 111, 144 120 C 139 125, 126 122, 128 115 Z"
        strokeWidth={2}
        delay={delay + 0.7}
        duration={0.45}
        opacity={0.8}
      />

      {/* Sprouting Harvest Twig & Tiny Sparkles Around Jar */}
      <DoodlePath
        d="M42 152 C 26 144, 20 128, 28 116 C 40 122, 46 138, 42 152 Z M42 152 L 32 126"
        strokeWidth={2.1}
        delay={delay + 0.75}
        duration={0.45}
      />
      <DoodlePath
        d="M204 72 L 207 81 L 216 84 L 207 87 L 204 96 L 201 87 L 192 84 L 201 81 Z"
        strokeWidth={1.9}
        delay={delay + 0.85}
        duration={0.35}
      />
      <DoodlePath
        d="M32 76 L 34 82 L 40 84 L 34 86 L 32 92 L 30 86 L 24 84 L 30 82 Z"
        strokeWidth={1.8}
        delay={delay + 0.9}
        duration={0.35}
      />
    </svg>
  );
}
