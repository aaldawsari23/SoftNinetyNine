'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sections = [
  {
    id: 'motorcycles',
    label: 'الدراجات النارية',
    href: '/motorcycles',
  },
  {
    id: 'catalog',
    label: 'المنتجات',
    href: '/catalog',
  },
  {
    id: 'maintenance',
    label: 'الصيانة',
    href: '/maintenance',
  },
];

export default function SectionNav() {
  const pathname = usePathname() || '/';

  const isActive = (href: string) => {
    // نخلي /catalog هو الافتراضي بدل الصفحة الرئيسية
    if (href === '/catalog') {
      return pathname === '/' || pathname.startsWith('/catalog') || pathname.startsWith('/product');
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop Section Nav - Sticky below navbar */}
      <div className="hidden md:block sticky top-14 z-30 bg-background/95 backdrop-blur-md border-b border-white/10 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 py-2">
            {sections.map((section) => {
              const active = isActive(section.href);
              return (
                <Link
                  key={section.id}
                  href={section.href}
                  className={`relative rounded-full px-5 py-1.5 text-sm font-semibold transition-all ${
                    active
                      ? 'bg-primary text-white shadow-lg shadow-primary/30'
                      : 'bg-white/5 text-text-muted hover:bg-white/10'
                  }`}
                >
                  {section.label}
                  {active && (
                    <span className="pointer-events-none absolute -bottom-1 left-1/2 h-0.5 w-10 -translate-x-1/2 rounded-full bg-primary shadow-primary/50 shadow-lg" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/95 backdrop-blur-lg md:hidden">
        <div className="flex items-center justify-around px-2 py-1.5">
          {sections.map((section) => {
            const active = isActive(section.href);
            return (
              <Link
                key={section.id}
                href={section.href}
                className={`flex flex-col items-center justify-center flex-1 gap-0.5 rounded-xl py-1 transition-all ${
                  active ? 'text-primary' : 'text-text-muted'
                }`}
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-semibold text-center leading-tight ${
                    active ? 'bg-primary/20' : 'bg-white/5'
                  }`}
                >
                  {section.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
