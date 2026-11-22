'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export function ProductImageWithFallback({
  src,
  alt,
  fill,
  width,
  height,
  className = '',
  priority = false,
}: ProductImageProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div
        className={`bg-surface-container-low flex flex-col items-center justify-center text-on-surface-variant/50 p-4 border border-outline-variant/30 ${className}`}
      >
        <span className="material-symbols-outlined text-3xl mb-1 text-primary/40">eco</span>
        <span className="text-xs uppercase tracking-widest font-sans font-medium text-primary/60">
          Botanica Harvest
        </span>
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={priority}
        onError={() => setError(true)}
        className={className}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width || 600}
      height={height || 600}
      priority={priority}
      onError={() => setError(true)}
      className={className}
    />
  );
}
