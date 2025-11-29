import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-background-light border-t border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Development Disclaimer */}
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 mb-6 text-center">
          <p className="text-orange-400 text-sm md:text-base font-bold mb-1">
            ⚠️ الموقع تحت التطوير - نسخة تجريبية
          </p>
          <p className="text-orange-300/80 text-xs md:text-sm">
            المنتجات المعروضة غير حقيقية وتم استيرادها آلياً للتجربة فقط ولا تعكس كمية ونوع المنتجات في المحل
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* About / Branding */}
          <div className="space-y-3">
            <div className="flex flex-col leading-tight">
              <span className="text-primary font-bold text-base">سوفت تسعة وتسعين</span>
              <span className="text-text-muted text-xs">Soft Ninety Nine</span>
            </div>
            <p className="text-text-secondary text-xs md:text-sm leading-relaxed">
              متجر متخصص في بيع الدراجات النارية والإكسسوارات ومواقف للإيجار
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm md:text-base mb-3">روابط سريعة</h4>
            <div className="flex flex-col text-xs md:text-sm text-text-secondary space-y-2">
              <Link href="/" className="hover:text-primary transition-colors">
                المنتجات
              </Link>
              <Link href="/motorcycles" className="hover:text-primary transition-colors">
                الدراجات النارية
              </Link>
              <Link href="/maintenance" className="hover:text-primary transition-colors">
                الصيانة
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
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm md:text-base mb-3">معلومات قانونية</h4>
            <div className="flex flex-col text-xs md:text-sm text-text-secondary space-y-2">
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
            <div className="pt-4 mt-4 border-t border-gray-800">
              <p className="text-[10px] md:text-xs text-text-muted">
                تطوير: عبدالكريم الدوسري
              </p>
              <p className="text-[10px] md:text-xs text-text-muted mt-1">
                © 2025 سوفت تسعة وتسعين
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
