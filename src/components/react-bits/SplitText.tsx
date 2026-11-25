'use client';

import { useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useInView, useReducedMotion } from 'motion/react';
import { DoodleUnderline, type DoodleTone } from '@/components/doodles';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';

export interface SplitTextProps {
  text: string;
  as?: HeadingTag;
  splitBy?: 'words' | 'chars';
  trigger?: 'mount' | 'scroll';
  delay?: number;
  stagger?: number;
  duration?: number;
  /** Optional single word (case-insensitive) to render in editorial italic accent */
  accentWord?: string;
  accentStyle?: 'none' | 'circle' | 'double' | 'swoosh';
  accentTone?: DoodleTone;
  accentClassName?: string;
  className?: string;
}

export function SplitText({
  text,
  as: Component = 'h2',
  splitBy = 'words',
  trigger = 'scroll',
  delay = 0,
  stagger = 0.045,
  duration = 0.65,
  accentWord,
  accentStyle = 'none',
  accentTone = 'flame',
  accentClassName = 'italic text-peach',
  className = '',
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const shouldReveal = trigger === 'mount' || isInView;

  const words = useMemo(() => text.trim().split(/\s+/), [text]);
  const normalizedAccent = accentWord?.trim().toLowerCase();

  useGSAP(
    () => {
      const targets = gsap.utils.toArray<HTMLElement>('.split-unit');
      if (targets.length === 0) {
        return;
      }

      if (shouldReduceMotion) {
        gsap.set(targets, { yPercent: 0, opacity: 1 });
        return;
      }

      if (!shouldReveal) {
        gsap.set(targets, { yPercent: 105, opacity: 0 });
        return;
      }

      gsap.fromTo(
        targets,
        { yPercent: 105, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration,
          delay,
          stagger,
          ease: 'power3.out',
          overwrite: 'auto',
        }
      );
    },
    {
      scope: containerRef,
      dependencies: [text, splitBy, trigger, delay, stagger, duration, shouldReduceMotion, shouldReveal],
    }
  );

  const isAccentMatch = (word: string) => {
    if (!normalizedAccent) return false;
    const stripped = word.replace(/[.,!?;:]+$/g, '').toLowerCase();
    return stripped === normalizedAccent;
  };

  return (
    <div ref={containerRef} className="inline-block max-w-full">
      <Component className={`leading-[1.12] ${className}`}>
        <span className="sr-only">{text}</span>
        <span aria-hidden="true" className="inline-flex flex-wrap gap-x-[0.26em]">
          {words.map((word, wordIndex) => {
            const match = isAccentMatch(word);
            const wordClass = match ? accentClassName : '';
            const punctuationMatch = word.match(/^(.+?)([.,!?;:]+)$/);
            const coreWord = match && punctuationMatch ? punctuationMatch[1] : word;
            const trailingPunct = match && punctuationMatch ? punctuationMatch[2] : '';

            const renderUnit = () => {
              if (splitBy === 'words') {
                return (
                  <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em]">
                    <span className={`split-unit inline-block will-change-transform ${wordClass}`}>
                      {coreWord}
                    </span>
                  </span>
                );
              }
              return (
                <span className={`inline-flex overflow-hidden pb-[0.12em] -mb-[0.12em] ${wordClass}`}>
                  {Array.from(coreWord).map((char, charIndex) => (
                    <span
                      key={`${char}-${charIndex}`}
                      className="split-unit inline-block will-change-transform"
                    >
                      {char}
                    </span>
                  ))}
                </span>
              );
            };

            if (match && accentStyle !== 'none') {
              return (
                <span key={`${word}-${wordIndex}`} className="inline-flex items-baseline">
                  <DoodleUnderline
                    variant={accentStyle}
                    tone={accentTone}
                    delay={0.35}
                    drawDuration={accentStyle === 'circle' ? 1.5 : 1.0}
                    priority={trigger === 'mount'}
                  >
                    {renderUnit()}
                  </DoodleUnderline>
                  {trailingPunct && (
                    <span className="split-unit inline-block">{trailingPunct}</span>
                  )}
                </span>
              );
            }

            return (
              <span key={`${word}-${wordIndex}`} className="inline-block">
                {renderUnit()}
                {trailingPunct && (
                  <span className="split-unit inline-block">{trailingPunct}</span>
                )}
              </span>
            );
          })}
        </span>
      </Component>
    </div>
  );
}
