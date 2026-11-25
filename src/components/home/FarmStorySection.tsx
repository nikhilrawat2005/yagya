'use client';

import React from 'react';
import { FibonacciBlocks } from '@/components/shapes/FibonacciBlocks';
import { Floating3DAsset } from '@/components/ui/Floating3DAsset';
import {
  DoodleUnderline,
  DoodleSparkle,
  DoodleSun,
  DoodleLeaf,
  DoodleSwirl,
} from '@/components/doodles';
import { FadeInSection } from '@/components/motion/FadeInSection';
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger';
import { Card3D, Card3DLayer } from '@/components/ui/Card3D';

const FARM_PILLARS = [
  {
    code: '01',
    title: 'Direct From Farming Communities',
    copy: 'We work straight with growers across Madhya Pradesh, Rajasthan, Karnataka, and Himalayan valleys — skipping long middleman chains.',
  },
  {
    code: '02',
    title: 'Strict Hygienic Sorting & Packing',
    copy: 'Every crop is cleaned, hand-sorted, and packed in moisture-barrier pouches to keep out dust and lock in real taste.',
  },
  {
    code: '03',
    title: 'Zero Shortcuts Or Filler Claims',
    copy: 'Only authentic, unbleached whole seeds and gently dried berries — keeping natural oils, fiber, and crunch intact.',
  },
];

export function FarmStorySection() {
  return (
    <section
      aria-labelledby="farm-story-heading"
      className="w-full bg-oat border-b border-charcoal/20 py-16 lg:py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Editorial Copy & Pillars */}
        <div className="lg:col-span-6 space-y-6">
          <FadeInSection>
            <div className="relative">
              <span className="font-mono-meta text-xs uppercase tracking-widest text-cranberry block mb-2">
                05 · Farm-To-Pack Craft
              </span>
              <h2
                id="farm-story-heading"
                className="font-display text-4xl sm:text-5xl text-indigo font-semibold leading-tight"
              >
                Real Harvests,{' '}
                <span className="relative inline-block">
                  Nothing Else
                  <DoodleUnderline
                    variant="single"
                    delay={0.2}
                    className="absolute -bottom-2 left-0 w-full"
                  />
                </span>
              </h2>
              <DoodleSparkle
                delay={0.3}
                className="hidden sm:block absolute -top-2 right-6"
              />
              <DoodleSun
                delay={0.2}
                className="hidden sm:block absolute -top-6 right-20 w-10 h-10 opacity-85"
              />
            </div>

            <div className="flex items-start gap-3 mt-5">
              <p className="font-script-body text-base text-indigo max-w-lg">
                From cool-season Rabi flax and chia fields to high-altitude sea buckthorn
                valleys, every batch carries the{' '}
                <span className="text-cranberry font-bold">honest character</span> of Indian soil.
              </p>
              <DoodleSwirl variant="loop" delay={0.35} className="hidden sm:block shrink-0 w-12 h-7 mt-1 opacity-75" />
            </div>
          </FadeInSection>

          <StaggerContainer className="space-y-4 pt-2">
            {FARM_PILLARS.map((pillar) => (
              <StaggerItem key={pillar.code}>
                <Card3D
                  maxTilt={5}
                  surfaceClassName="p-5 bg-apricot/45 hover:bg-apricot/85 border border-charcoal/25 transition-colors duration-250"
                >
                  <Card3DLayer depth={10} className="flex items-start gap-4">
                    <span className="glow-badge font-mono-meta text-xs font-bold px-2.5 py-1 rounded-full bg-seabuckthorn text-oat shrink-0">
                      {pillar.code}
                    </span>
                    <div>
                      <h3 className="font-sans text-base font-semibold text-indigo mb-1">
                        {pillar.title}
                      </h3>
                      <p className="font-script-body text-sm text-indigo/95">
                        {pillar.copy}
                      </p>
                    </div>
                  </Card3DLayer>
                </Card3D>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Right: Framed Fibonacci Showcase with Breaking-Out 3D Flax & Blueberries */}
        <FadeInSection direction="left" className="lg:col-span-6 relative flex items-center justify-center py-6">
          <div className="relative w-full max-w-[520px]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 rounded-full animate-ambient-glow z-0"
              style={{
                background:
                  'radial-gradient(circle, rgba(251,201,138,0.28) 0%, transparent 70%)',
              }}
            />

            <div className="relative z-10 glow-border rounded-2xl">
              <FibonacciBlocks unit={40} showSpiralArc showIndices />
            </div>

            <Floating3DAsset
              src="/images/3d/seed-flax-01.webp"
              alt="3D clay toasted Flax Seeds"
              width={250}
              height={250}
              floatDistance={6}
              duration={5.6}
              rotateDeg={1.5}
              parallaxDepth={10}
              className="absolute left-[10%] -top-[10%] w-[48%] z-20"
            />

            <Floating3DAsset
              src="/images/3d/berry-blueberry-01.webp"
              alt="3D clay Dried Blueberries"
              width={230}
              height={230}
              floatDistance={5}
              duration={6.2}
              rotateDeg={-1.5}
              parallaxDepth={-10}
              className="absolute -right-[6%] -bottom-[10%] w-[44%] z-30"
            />

            <DoodleLeaf
              variant="sprig"
              delay={0.4}
              className="hidden sm:block absolute -left-5 -bottom-6 w-12 h-12 z-20 opacity-80"
            />
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
