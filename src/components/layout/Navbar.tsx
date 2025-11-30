'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import CartDrawer from '@/components/cart/CartDrawer';

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getTotalItems } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartCount = mounted ? getTotalItems() : 0;

  return (
    <nav className="sticky top-0 z-40 border-b border-white/10 bg-background/95 backdrop-blur-xl">
      <div className="container mx-auto px-3 md:px-4">
        <div className="flex h-14 items-center justify-between gap-3">
          {/* Logo / Brand */}
          <Link href="/catalog" className="flex items-center gap-2">
            <Image
              src="/Logo.png"
              alt="سوفت 99"
              width={40}
              height={40}
              className="h-9 w-9 rounded-md object-contain"
              priority
            />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-primary font-bold text-sm md:text-base">
                سوفت 99
              </span>
              <span className="text-[11px] text-text-secondary">
                متجر دراجات وقطع أصلية
              </span>
            </div>
          </Link>

          {/* Actions cluster (Cart is the hero) */}
          <div className="flex items-center gap-1.5 md:gap-2">
            {/* Phone / Contact */}
            <Link
              href="/contact"
              aria-label="اتصل بنا"
              title="اتصل بنا"
              className="hidden xs:flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-text-muted hover:bg-white/10 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M2.5 5.5C2.5 4.12 3.62 3 5 3h2c.7 0 1.3.4 1.6 1.02l1.1 2.3c.25.52.16 1.14-.24 1.56l-1.1 1.16a1 1 0 00-.2 1.12c.6 1.27 1.7 2.38 3 2.98a1 1 0 001.1-.2l1.17-1.1c.42-.4 1.04-.49 1.56-.24l2.3 1.1c.62.3 1.02.9 1.02 1.6V19c0 1.38-1.12 2.5-2.5 2.5h-.75C8.93 21.5 2.5 15.07 2.5 7.25V5.5z"
                />
              </svg>
            </Link>

            {/* Location */}
            <Link
              href="/location"
              aria-label="الموقع"
              title="الموقع"
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-text-muted hover:bg-white/10 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M12 21s-6-4.35-6-10a6 6 0 1112 0c0 5.65-6 10-6 10z"
                />
                <circle cx="12" cy="11" r="2.5" stroke="currentColor" strokeWidth={1.6} />
              </svg>
            </Link>

            {/* Parking */}
            <Link
              href="/parking"
              aria-label="المواقف"
              title="المواقف"
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-text-muted hover:bg-white/10 hover:text-white transition-colors"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-md border border-white/20 text-[11px] font-extrabold">
                P
              </div>
            </Link>

            {/* Cart - main CTA */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/40 ring-2 ring-primary/40 hover:bg-primary-hover transition-transform active:scale-95"
              aria-label="سلة المشتريات"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.9}
                  d="M3.5 5h1.6l1.2 11.1A2 2 0 008.3 18h7.4a2 2 0 002-1.9L18.9 8H6.2"
                />
                <circle cx="10" cy="20" r="1" />
                <circle cx="16" cy="20" r="1" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-4 px-1 rounded-full bg-accent text-black text-[10px] flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Cart Drawer */}
      {mounted && <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />}
    </nav>
  );
}
