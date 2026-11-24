'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Sprout } from 'lucide-react';

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
        className={`bg-apricot flex flex-col items-center justify-center text-indigo p-4 border border-charcoal/20 ${className}`}
      >
        <Sprout className="w-6 h-6 mb-1.5 text-indigo" />
        <span className="text-[11px] uppercase tracking-[0.08em] font-sans font-medium text-indigo">
          Yagya Harvest
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
