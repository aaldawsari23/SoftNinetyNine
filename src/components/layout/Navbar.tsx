'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setActiveMenu(prev => (prev === menu ? null : menu));
  };

  const bikeChips = [
    { label: 'جديد', query: 'type=bike&condition=new' },
    { label: 'مستعمل', query: 'type=bike&condition=used' },
    { label: 'سبورت', query: 'type=bike&category=c-sport' },
    { label: 'كروزر', query: 'type=bike&category=c-cruiser' },
    { label: 'ادفنتشر', query: 'type=bike&category=c-adventure' },
    { label: 'قولدوينق/تجوال', query: 'type=bike&category=c-gold' },
    { label: 'صحراوي', query: 'type=bike&category=c-dirt' },
    { label: 'كوميوت', query: 'type=bike&category=c-commuter' },
  ];
  const partChips = [
    { label: 'زيوت', query: 'category=c1' },
    { label: 'فلاتر', query: 'category=c2' },
    { label: 'إشعال', query: 'category=c3' },
    { label: 'بطاريات', query: 'category=c4' },
    { label: 'إطارات', query: 'category=c5' },
    { label: 'فرامل', query: 'category=c6' },
    { label: 'نقل الحركة', query: 'category=c7' },
    { label: 'سوائل', query: 'category=c8' },
    { label: 'عناية', query: 'category=c9' },
    { label: 'محرك', query: 'category=c10' },
    { label: 'كهرباء', query: 'category=c11' },
    { label: 'عوادم', query: 'category=c12' },
    { label: 'إكسسوارات', query: 'category=c13' },
    { label: 'قطع', query: 'category=c14' },
    { label: 'عدد', query: 'category=c16' },
  ];
  const gearChips = [
    { label: 'ملابس وحماية', query: 'category=c15' },
    { label: 'إكسسوارات', query: 'category=c13' },
    { label: 'قطع أخرى', query: 'category=c14' },
  ];

  return (
    <nav className="bg-background-light border-b border-gray-800 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-3 md:px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo and store name - simplified for mobile */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="سوفت تسعة وتسعين" className="h-9 w-9 md:h-11 md:w-11 rounded-md" />
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

            {/* Category buttons */}
            <button
              onClick={() => toggleMenu('bike')}
              className={`text-text-secondary hover:text-primary transition-colors text-sm lg:text-base ${
                activeMenu === 'bike' ? 'text-primary font-semibold' : ''
              }`}
            >
              🏍️ الدراجات
            </button>
            <button
              onClick={() => toggleMenu('part')}
              className={`text-text-secondary hover:text-primary transition-colors text-sm lg:text-base ${
                activeMenu === 'part' ? 'text-primary font-semibold' : ''
              }`}
            >
              ⚙️ قطع الغيار والزيوت
            </button>
            <button
              onClick={() => toggleMenu('gear')}
              className={`text-text-secondary hover:text-primary transition-colors text-sm lg:text-base ${
                activeMenu === 'gear' ? 'text-primary font-semibold' : ''
              }`}
            >
              🪖 الإكسسوارات
            </button>

            <Link href="/parking" className="text-text-secondary hover:text-primary transition-colors text-sm lg:text-base">
              🅿️ مواقف
            </Link>
            <Link href="/contact" className="text-text-secondary hover:text-primary transition-colors text-sm lg:text-base">
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
                className="block px-3 py-2.5 text-text-secondary hover:text-white hover:bg-background rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🏍️ الدراجات النارية
              </Link>
              <Link
                href="/catalog?type=part"
                className="block px-3 py-2.5 text-text-secondary hover:text-white hover:bg-background rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ⚙️ قطع الغيار
              </Link>
              <Link
                href="/catalog?type=gear"
                className="block px-3 py-2.5 text-text-secondary hover:text-white hover:bg-background rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🪖 الإكسسوارات
              </Link>
            </div>

            <div className="border-t border-gray-800 my-2 pt-2">
              <Link
                href="/parking"
                className="block px-3 py-2.5 text-text-secondary hover:text-white hover:bg-background rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🅿️ مواقف للإيجار
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2.5 text-text-secondary hover:text-white hover:bg-background rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                📞 تواصل معنا
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
