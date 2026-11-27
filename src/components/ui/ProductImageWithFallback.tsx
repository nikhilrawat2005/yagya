'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Sprout } from 'lucide-react';
import { siteConfig } from '@/lib/data/site';

interface ProductImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  quality?: number;
  className?: string;
  preload?: boolean;
}

export function ProductImageWithFallback({
  src,
  alt,
  fill,
  width,
  height,
  sizes = '(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 33vw',
  quality = 80,
  className = '',
  preload = false,
}: ProductImageProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (error || !src) {
    return (
      <div
        className={`bg-oat/10 flex flex-col items-center justify-center text-oat p-4 border border-white/20 rounded-[6px] w-full h-full ${className}`}
      >
        <Sprout className="w-6 h-6 mb-1.5 text-peach" aria-hidden="true" />
        <span className="text-[11px] font-ui-label text-apricot text-center">
          {siteConfig.name}
        </span>
      </div>
    );
  }

  if (fill) {
    return (
      <>
        {!loaded && (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-oat/[0.08] animate-pulse motion-reduce:animate-none"
          />
        )}
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          quality={quality}
          priority={preload}
          loading={preload ? 'eager' : 'lazy'}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`${className} transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width || 600}
      height={height || 600}
      sizes={sizes}
      quality={quality}
      priority={preload}
      loading={preload ? 'eager' : 'lazy'}
      onLoad={() => setLoaded(true)}
      onError={() => setError(true)}
      className={className}
    />
  );
}
