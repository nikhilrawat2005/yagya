'use client';

import React, { useId } from 'react';
import { motion, useReducedMotion } from 'motion/react';

export interface FibonacciBlocksProps {
  /** Base unit size in pixels when used in framed mode. Ignored when fullBleed is true. */
  unit?: number;
  /** Render as full-bleed background grid across the entire parent section (8 / 5 / 3 / 2 / 1 / 1). */
  fullBleed?: boolean;
  /** Keep the largest 8x8 block as Oat White negative space for editorial content. */
  negativeSpaceMajor?: boolean;
  /** Flip horizontal orientation (e.g. negative space left vs right). */
  mirrored?: boolean;
  /** Draw the continuous quarter-circle Golden Spiral arc in Charcoal marker stroke. */
  showSpiralArc?: boolean;
  /** Show subtle Fibonacci block numbers (1, 1, 2, 3, 5, 8) in Space Mono. */
  showIndices?: boolean;
  /** Rounded corners when used as a framed decorative block. */
  rounded?: boolean;
  className?: string;
}

interface FibCell {
  step: number;
  label: string;
  x: number;
  y: number;
  size: number;
  fillVar: string;
}

const FIBONACCI_CELLS: FibCell[] = [
  { step: 8, label: '8', x: 0, y: 0, size: 800, fillVar: 'var(--color-seabuckthorn)' },
  { step: 5, label: '5', x: 800, y: 0, size: 500, fillVar: 'var(--color-apricot)' },
  { step: 3, label: '3', x: 1000, y: 500, size: 300, fillVar: 'var(--color-seabuckthorn)' },
  { step: 2, label: '2', x: 800, y: 600, size: 200, fillVar: 'var(--color-peach)' },
  { step: 1, label: '1', x: 800, y: 500, size: 100, fillVar: 'var(--color-seabuckthorn)' },
  { step: 1, label: '1', x: 900, y: 500, size: 100, fillVar: 'var(--color-apricot)' },
];

const GOLDEN_SPIRAL_PATH =
  'M 0 800 A 800 800 0 0 1 800 0 A 500 500 0 0 1 1300 500 A 300 300 0 0 1 1000 800 A 200 200 0 0 1 800 600 A 100 100 0 0 1 900 500 A 100 100 0 0 1 1000 600';

export function FibonacciBlocks({
  unit = 36,
  fullBleed = false,
  negativeSpaceMajor = false,
  mirrored = false,
  showSpiralArc = true,
  showIndices = false,
  rounded = true,
  className = '',
}: FibonacciBlocksProps) {
  const prefersReducedMotion = useReducedMotion();
  const clipId = useId();
  const maxWidthPx = Math.round(13 * unit);

  if (fullBleed) {
    return (
      <div
        aria-hidden="true"
        className={`relative w-full h-full select-none pointer-events-none ${className}`}
        style={{ transform: mirrored ? 'scaleX(-1)' : undefined }}
      >
        <div className="w-full h-full grid grid-cols-[8fr_5fr]">
          {/* Major Block 8: Oat White Negative Space */}
          <div
            className={`relative border-r border-charcoal/12 ${
              negativeSpaceMajor ? 'bg-oat' : 'bg-seabuckthorn'
            }`}
          >
            {showSpiralArc && (
              <svg
                viewBox="0 0 800 800"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full"
              >
                <motion.path
                  d="M 0 800 A 800 800 0 0 1 800 0"
                  fill="none"
                  stroke="var(--color-charcoal)"
                  strokeOpacity="0.14"
                  strokeWidth="3"
                  vectorEffect="non-scaling-stroke"
                  initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                />
              </svg>
            )}
          </div>

          {/* Right 5fr Column subdivided into 5, 3, 2, 1, 1 */}
          <div className="grid grid-rows-[5fr_3fr] h-full">
            {/* Block 5 */}
            <div className="relative bg-apricot border-b border-charcoal/15 overflow-hidden">
              <svg
                viewBox="0 0 500 500"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full"
              >
                <path
                  d="M 0 0 L 500 0 L 500 500 A 500 500 0 0 0 0 0 Z"
                  fill="var(--color-peach)"
                  opacity="0.72"
                />
                {showSpiralArc && (
                  <motion.path
                    d="M 0 0 A 500 500 0 0 1 500 500"
                    fill="none"
                    stroke="var(--color-charcoal)"
                    strokeOpacity="0.28"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                    initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </svg>
              {showIndices && (
                <span
                  className="absolute top-4 left-4 font-mono-meta text-xs font-bold text-indigo/45"
                  style={mirrored ? { transform: 'scaleX(-1)' } : undefined}
                >
                  5
                </span>
              )}
            </div>

            {/* Bottom 3fr Row subdivided into [2fr | 3fr] */}
            <div className="grid grid-cols-[2fr_3fr] h-full">
              <div className="grid grid-rows-[1fr_2fr] border-r border-charcoal/15 h-full">
                {/* 1 & 1 Twin Squares */}
                <div className="grid grid-cols-2 border-b border-charcoal/15">
                  <div className="relative bg-seabuckthorn border-r border-charcoal/15">
                    {showIndices && (
                      <span
                        className="absolute top-1.5 left-2 font-mono-meta text-[10px] font-bold text-indigo/55"
                        style={mirrored ? { transform: 'scaleX(-1)' } : undefined}
                      >
                        1
                      </span>
                    )}
                  </div>
                  <div className="relative bg-apricot">
                    {showIndices && (
                      <span
                        className="absolute top-1.5 left-2 font-mono-meta text-[10px] font-bold text-indigo/45"
                        style={mirrored ? { transform: 'scaleX(-1)' } : undefined}
                      >
                        1
                      </span>
                    )}
                  </div>
                </div>

                {/* Block 2 */}
                <div className="relative bg-peach overflow-hidden">
                  {showSpiralArc && (
                    <svg
                      viewBox="0 0 200 200"
                      preserveAspectRatio="none"
                      className="absolute inset-0 w-full h-full"
                    >
                      <motion.path
                        d="M 200 200 A 200 200 0 0 1 0 0"
                        fill="none"
                        stroke="var(--color-charcoal)"
                        strokeOpacity="0.28"
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                        initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </svg>
                  )}
                  {showIndices && (
                    <span
                      className="absolute bottom-2 left-2.5 font-mono-meta text-[11px] font-bold text-indigo/50"
                      style={mirrored ? { transform: 'scaleX(-1)' } : undefined}
                    >
                      2
                    </span>
                  )}
                </div>
              </div>

              {/* Block 3 */}
              <div className="relative bg-seabuckthorn overflow-hidden">
                {showSpiralArc && (
                  <svg
                    viewBox="0 0 300 300"
                    preserveAspectRatio="none"
                    className="absolute inset-0 w-full h-full"
                  >
                    <motion.path
                      d="M 300 0 A 300 300 0 0 1 0 300"
                      fill="none"
                      stroke="var(--color-charcoal)"
                      strokeOpacity="0.28"
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                      initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </svg>
                )}
                {showIndices && (
                  <span
                    className="absolute top-2.5 left-3 font-mono-meta text-xs font-bold text-indigo/55"
                    style={mirrored ? { transform: 'scaleX(-1)' } : undefined}
                  >
                    3
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`w-full select-none pointer-events-none ${className}`}
      style={{ maxWidth: `${maxWidthPx}px` }}
    >
      <svg
        viewBox="0 0 1300 800"
        className={`w-full h-auto block ${rounded ? 'rounded-2xl border border-charcoal/20' : ''}`}
        style={{ transform: mirrored ? 'scaleX(-1)' : undefined }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <clipPath id={clipId}>
            <rect x="0" y="0" width="1300" height="800" rx={rounded ? '45' : '0'} />
          </clipPath>
        </defs>

        <g clipPath={`url(#${clipId})`}>
          {FIBONACCI_CELLS.map((cell, index) => (
            <g key={`${cell.step}-${index}`}>
              <rect
                x={cell.x}
                y={cell.y}
                width={cell.size}
                height={cell.size}
                fill={negativeSpaceMajor && cell.step === 8 ? 'var(--color-oat)' : cell.fillVar}
                stroke="var(--color-charcoal)"
                strokeOpacity="0.18"
                strokeWidth="4"
              />
              {showIndices && !(negativeSpaceMajor && cell.step === 8) && (
                <text
                  x={cell.x + cell.size * 0.14}
                  y={cell.y + cell.size * 0.24}
                  fill="var(--color-indigo)"
                  opacity="0.5"
                  fontSize={Math.max(32, cell.size * 0.14)}
                  fontFamily="var(--font-mono)"
                  fontWeight="700"
                >
                  {cell.label}
                </text>
              )}
            </g>
          ))}

          {showSpiralArc && (
            <motion.path
              d={GOLDEN_SPIRAL_PATH}
              fill="none"
              stroke="var(--color-charcoal)"
              strokeOpacity="0.45"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
          )}
        </g>
      </svg>
    </div>
  );
}
