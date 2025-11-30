'use client';

import Image from 'next/image';
import { useState } from 'react';
import { getProductImageSrc, getFallbackImageSrc } from '@/utils/imageHelper';
import { Product } from '@/types';

interface Props {
  product: Product;
  alt?: string;
  className?: string;
}

export function LazyProductImage({ product, alt, className }: Props) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const imageSrc = error ? getFallbackImageSrc() : getProductImageSrc(product);
  const imageAlt = alt || product.name_ar || product.name || 'منتج';

  return (
    <div className="relative w-full h-full bg-white/5 rounded-lg overflow-hidden">
      {/* Gradient background for better product display */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5" />

      <Image
        src={imageSrc}
        alt={imageAlt}
        width={300}
        height={300}
        loading="lazy"
        className={`relative z-10 w-full h-full object-contain transition-all duration-500 group-hover:scale-105 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${className || ''}`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
}
