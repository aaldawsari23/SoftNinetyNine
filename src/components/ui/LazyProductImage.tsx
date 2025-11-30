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
  const [isLoading, setIsLoading] = useState(true);

  const imageSrc = error ? getFallbackImageSrc() : getProductImageSrc(product);
  const imageAlt = alt || product.name_ar || product.name || 'منتج';

  return (
    <div className="relative w-full h-full">
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-background-card via-background-light to-background-card animate-pulse">
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-12 h-12 text-text-muted opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      )}

      <Image
        src={imageSrc}
        alt={imageAlt}
        width={300}
        height={300}
        loading="lazy"
        className={`w-full h-full object-contain transition-all duration-500 group-hover:scale-105 ${
          isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        } ${className || ''}`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setError(true);
          setIsLoading(false);
        }}
      />
    </div>
  );
}
