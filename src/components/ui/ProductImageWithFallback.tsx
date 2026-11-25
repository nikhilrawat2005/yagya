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
  preload?: boolean;
}

export function ProductImageWithFallback({
  src,
  alt,
  fill,
  width,
  height,
  className = '',
  preload = false,
}: ProductImageProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div
        className={`bg-oat/10 flex flex-col items-center justify-center text-oat p-4 border border-white/20 rounded-[6px] ${className}`}
      >
        <Sprout className="w-6 h-6 mb-1.5 text-peach" />
        <span className="text-[11px] uppercase tracking-[0.12em] font-sans font-medium text-apricot">
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
        preload={preload}
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
      preload={preload}
      onError={() => setError(true)}
      className={className}
    />
  );
}
