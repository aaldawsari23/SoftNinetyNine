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

  return (
    <nav className="bg-background-light border-b border-gray-800 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-3 md:px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/Logo.png"
              alt="سوفت 99"
              width={36}
              height={36}
              className="h-9 w-9 rounded-md object-contain"
              priority
            />
            <div className="flex flex-col">
              <span className="text-primary font-bold text-sm md:text-base leading-tight">سوفت 99</span>
              <span className="hidden md:block text-[10px] text-text-muted leading-tight">Soft Ninety Nine</span>
            </div>
          </Link>

          {/* Action Icons - Right Side - Improved touch targets */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Phone - Contact Page Link */}
            <Link
              href="/contact"
              className="nav-icon-btn text-text-secondary hover:text-primary"
              aria-label="تواصل معنا"
              title="تواصل معنا"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </Link>

            {/* Location - Location Page Link */}
            <Link
              href="/location"
              className="nav-icon-btn text-text-secondary hover:text-primary"
              aria-label="الموقع وساعات العمل"
              title="الموقع وساعات العمل"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </Link>

            {/* Parking */}
            <Link
              href="/parking"
              className="nav-icon-btn text-text-secondary hover:text-primary"
              aria-label="مواقف الدراجات"
              title="مواقف الدراجات"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
              </svg>
            </Link>

            {/* Store Icon - Cart Button - Premium */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative nav-icon-btn text-white bg-primary/15 hover:bg-primary/25 border border-primary/30 rounded-xl"
              aria-label="سلة التسوق"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {mounted && getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg shadow-green-500/30">
                  {getTotalItems()}
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
