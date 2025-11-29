'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SectionNav() {
  const pathname = usePathname();

  const sections = [
    {
      id: 'products',
      label: 'المنتجات',
      href: '/',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      id: 'motorcycles',
      label: 'الدراجات',
      href: '/motorcycles',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      id: 'maintenance',
      label: 'الصيانة',
      href: '/maintenance',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/' || pathname === '/catalog';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop Section Nav - Sticky below navbar */}
      <div className="hidden md:block sticky top-14 z-40 bg-background border-b border-white/10 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-1 py-2">
            {sections.map((section) => (
              <Link
                key={section.id}
                href={section.href}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-base transition-all duration-200 ${
                  isActive(section.href)
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-white/5 text-text-secondary hover:bg-white/10 hover:text-white'
                }`}
              >
                {section.icon}
                <span>{section.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background-light border-t border-white/10 shadow-2xl">
        <div className="grid grid-cols-3">
          {sections.map((section) => (
            <Link
              key={section.id}
              href={section.href}
              className={`flex flex-col items-center justify-center py-3 px-2 transition-all duration-200 ${
                isActive(section.href)
                  ? 'text-primary'
                  : 'text-text-muted'
              }`}
            >
              <div className={`mb-1 ${isActive(section.href) ? 'scale-110' : ''}`}>
                {section.icon}
              </div>
              <span className="text-xs font-semibold">{section.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
