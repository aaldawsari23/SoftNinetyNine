import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-background-light border-t border-gray-800 mt-auto">
      {/* Dev Banner - Enhanced */}
      <div className="dev-banner">
        <span className="text-orange-400/80 text-sm font-medium">⚠️ نسخة تجريبية</span>
        <span className="text-orange-300/60 mx-2">•</span>
        <span className="text-orange-300/60 text-sm">المنتجات المعروضة للتجربة فقط</span>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-6 md:py-10">

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {/* About / Branding - Full Width on Mobile */}
          <div className="space-y-3 col-span-2 lg:col-span-1">
            <div className="flex flex-col leading-snug">
              <span className="text-primary font-bold text-base md:text-xl">سوفت تسعة وتسعين</span>
              <span className="text-text-muted text-xs md:text-base mt-0.5 md:mt-1">Soft Ninety Nine</span>
            </div>
            <p className="text-text-secondary text-xs md:text-base leading-relaxed">
              متجر متخصص في بيع الدراجات النارية والإكسسوارات ومواقف للإيجار
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2 md:space-y-4">
            <h4 className="text-white font-bold text-sm md:text-lg mb-2 md:mb-3">روابط سريعة</h4>
            <div className="flex flex-col text-xs md:text-base text-text-secondary space-y-2 md:space-y-3">
              <Link href="/" className="hover:text-primary transition-colors">
                المنتجات
              </Link>
              <Link href="/motorcycles" className="hover:text-primary transition-colors">
                الدراجات النارية
              </Link>
              <Link href="/parking" className="hover:text-primary transition-colors">
                مواقف للإيجار
              </Link>
              <Link href="/contact" className="hover:text-primary transition-colors">
                تواصل معنا
              </Link>
              <Link href="/location" className="hover:text-primary transition-colors">
                الموقع وساعات العمل
              </Link>
            </div>
          </div>

          {/* Legal & Developer */}
          <div className="space-y-2 md:space-y-4">
            <h4 className="text-white font-bold text-sm md:text-lg mb-2 md:mb-3">معلومات</h4>
            <div className="flex flex-col text-xs md:text-base text-text-secondary space-y-2 md:space-y-3">
              <Link href="/terms" className="hover:text-primary transition-colors">
                الشروط والأحكام
              </Link>
              <Link href="/privacy" className="hover:text-primary transition-colors">
                سياسة الخصوصية
              </Link>
              <a
                href="https://maroof.sa"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors inline-flex items-center gap-1"
              >
                <span>معروف</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
            <div className="pt-3 md:pt-5 mt-3 md:mt-5 border-t border-gray-800">
              <p className="text-[10px] md:text-sm text-text-muted">
                © 2025 سوفت 99
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
