'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { categories } from '@/data/realData';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setActiveMenu(prev => (prev === menu ? null : menu));
  };

  // Generate category chips dynamically from realData
  const partChips = useMemo(() =>
    categories
      .filter(c => c.type === 'part')
      .map(c => ({ label: c.name_ar, query: `type=part&category=${c.id}` })),
    []
  );

  const gearChips = useMemo(() =>
    categories
      .filter(c => c.type === 'gear')
      .map(c => ({ label: c.name_ar, query: `type=gear&category=${c.id}` })),
    []
  );

  const bikeChips = [
    { label: 'جديد', query: 'type=bike&condition=new' },
    { label: 'مستعمل', query: 'type=bike&condition=used' },
  ];

  return (
    <nav className="bg-background-light border-b border-gray-800 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-3 md:px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo and store name - simplified for mobile */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/Logo.png" alt="سوفت تسعة وتسعين" className="h-9 w-9 md:h-11 md:w-11 rounded-md object-contain" />
            <div className="leading-tight">
              <span className="text-primary font-bold text-sm md:text-lg block">
                سوفت تسعة وتسعين
              </span>
              <span className="text-text-muted text-[10px] md:text-xs hidden md:block">
                SoftNinteyNine Bikes
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <Link href="/" className="text-text-secondary hover:text-primary transition-colors text-sm lg:text-base">
              الرئيسية
            </Link>
            <Link href="/catalog" className="text-text-secondary hover:text-primary transition-colors text-sm lg:text-base">
              جميع المنتجات
            </Link>

            {/* Category buttons - SVG icons */}
            <button
              onClick={() => toggleMenu('bike')}
              className={`flex items-center gap-1.5 text-text-secondary hover:text-primary transition-colors text-sm lg:text-base ${
                activeMenu === 'bike' ? 'text-primary font-semibold' : ''
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M5 18.89C3.203 18.891 1.667 17.43 1.667 15.629a3.252 3.252 0 0 1 3.25-3.25c.414 0 .81.083 1.17.229L8.5 8.334h-2v-1.5h3.25a1 1 0 0 1 .894.553l1.25 2.5h3.273l-1.255-4.5h-1.745v-1.5h2.416c.416 0 .785.26.922.65l1.796 6.429c.361-.146.757-.229 1.171-.229a3.252 3.252 0 0 1 3.25 3.25c0 1.8-1.536 3.262-3.333 3.262-1.797 0-3.333-1.462-3.333-3.262 0-.87.347-1.659.91-2.24l-1.913-6.85L12 9.834l-1.586 3.173a3.232 3.232 0 0 1 .919 2.242c0 1.8-1.536 3.262-3.333 3.262zM5 10.139c-.966 0-1.75.784-1.75 1.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75-.784-1.75-1.75-1.75zm13.583 0c-.966 0-1.75.784-1.75 1.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75-.784-1.75-1.75-1.75z"/></svg>
              الدراجات
            </button>
            <button
              onClick={() => toggleMenu('part')}
              className={`flex items-center gap-1.5 text-text-secondary hover:text-primary transition-colors text-sm lg:text-base ${
                activeMenu === 'part' ? 'text-primary font-semibold' : ''
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              قطع الغيار
            </button>
            <button
              onClick={() => toggleMenu('gear')}
              className={`flex items-center gap-1.5 text-text-secondary hover:text-primary transition-colors text-sm lg:text-base ${
                activeMenu === 'gear' ? 'text-primary font-semibold' : ''
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              الإكسسوارات
            </button>

            <Link href="/parking" className="flex items-center gap-1.5 text-text-secondary hover:text-primary transition-colors text-sm lg:text-base">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              مواقف
            </Link>
            <Link href="/contact" className="flex items-center gap-1.5 text-text-secondary hover:text-primary transition-colors text-sm lg:text-base">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              تواصل معنا
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-background rounded-md transition-colors"
            aria-label="القائمة"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2.5 text-text-secondary hover:text-white hover:bg-background rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              الرئيسية
            </Link>
            <Link
              href="/catalog"
              className="block px-3 py-2.5 text-text-secondary hover:text-white hover:bg-background rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              جميع المنتجات
            </Link>

            <div className="border-t border-gray-800 my-2 pt-2">
              <p className="px-3 text-xs text-text-muted mb-2">الفئات</p>
              <Link
                href="/catalog?type=bike"
                className="flex items-center gap-2 px-3 py-2.5 text-text-secondary hover:text-white hover:bg-background rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M5 18.89C3.203 18.891 1.667 17.43 1.667 15.629a3.252 3.252 0 0 1 3.25-3.25c.414 0 .81.083 1.17.229L8.5 8.334h-2v-1.5h3.25a1 1 0 0 1 .894.553l1.25 2.5h3.273l-1.255-4.5h-1.745v-1.5h2.416c.416 0 .785.26.922.65l1.796 6.429c.361-.146.757-.229 1.171-.229a3.252 3.252 0 0 1 3.25 3.25c0 1.8-1.536 3.262-3.333 3.262-1.797 0-3.333-1.462-3.333-3.262 0-.87.347-1.659.91-2.24l-1.913-6.85L12 9.834l-1.586 3.173a3.232 3.232 0 0 1 .919 2.242c0 1.8-1.536 3.262-3.333 3.262zM5 10.139c-.966 0-1.75.784-1.75 1.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75-.784-1.75-1.75-1.75zm13.583 0c-.966 0-1.75.784-1.75 1.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75-.784-1.75-1.75-1.75z"/></svg>
                الدراجات النارية
              </Link>
              <Link
                href="/catalog?type=part"
                className="flex items-center gap-2 px-3 py-2.5 text-text-secondary hover:text-white hover:bg-background rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                قطع الغيار
              </Link>
              <Link
                href="/catalog?type=gear"
                className="flex items-center gap-2 px-3 py-2.5 text-text-secondary hover:text-white hover:bg-background rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                الإكسسوارات
              </Link>
            </div>

            <div className="border-t border-gray-800 my-2 pt-2">
              <Link
                href="/parking"
                className="flex items-center gap-2 px-3 py-2.5 text-text-secondary hover:text-white hover:bg-background rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                مواقف للإيجار
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 px-3 py-2.5 text-text-secondary hover:text-white hover:bg-background rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                تواصل معنا
              </Link>
            </div>
          </div>
        )}

        {/* Chips menu for desktop - cleaner design */}
        {activeMenu && (
          <div className="hidden md:block border-t border-gray-800 py-3">
            <div className="flex flex-wrap gap-2">
              {(activeMenu === 'bike' ? bikeChips : activeMenu === 'part' ? partChips : gearChips).map((chip) => (
                <Link
                  key={chip.label}
                  href={`/catalog?${chip.query}`}
                  onClick={() => setActiveMenu(null)}
                  className="text-xs lg:text-sm px-3 lg:px-4 py-1.5 lg:py-2 rounded-full bg-background border border-gray-700 text-text-secondary hover:bg-primary hover:text-white hover:border-primary transition-all duration-200"
                >
                  {chip.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
