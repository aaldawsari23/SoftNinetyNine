import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-background-light border-t border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {/* About / Branding */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <img src="/logo.jpeg" alt="سوفت تسعه وتسعين" className="w-10 h-10 rounded-md" />
              <div className="flex flex-col leading-tight">
                <span className="text-primary font-bold text-base">سوفت تسعه وتسعين</span>
                <span className="text-text-muted text-xs">SoftNinteyNine</span>
              </div>
            </div>
            <p className="text-text-secondary text-xs md:text-sm leading-relaxed">
              متجر متخصص في بيع الدراجات النارية (جديد ومستعمل)، قطع الغيار، الإكسسوارات، ومواقف للإيجار الشهري.
            </p>
          </div>

          {/* Contact Numbers */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm md:text-base mb-3">تواصل معنا</h4>
            <div className="flex flex-col text-xs md:text-sm text-text-secondary space-y-2">
              <a
                href="https://wa.me/966568663381"
                className="hover:text-primary transition-colors flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>📞</span>
                <span>إبراهيم عسيري: 0568663381</span>
              </a>
              <a
                href="https://wa.me/966580874790"
                className="hover:text-primary transition-colors flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>📞</span>
                <span>حسين سهيل: 0580874790</span>
              </a>
            </div>
          </div>

          {/* Working hours & Location */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm md:text-base mb-3">معلومات المحل</h4>
            <div className="space-y-2 text-xs md:text-sm text-text-secondary">
              <p className="flex items-start gap-2">
                <span className="shrink-0">🕒</span>
                <span>يومياً من 5:30 عصراً حتى 3:00 فجراً</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="shrink-0">📍</span>
                <span>جيزان، بجوار مستشفى العميس</span>
              </p>
              <Link
                href="https://maps.app.goo.gl/t6pyLPj52d18BaPH6?g_st=ipc"
                target="_blank"
                className="text-primary hover:text-primary-hover inline-flex items-center gap-1 mt-1"
              >
                <span>فتح الخريطة</span>
                <span>←</span>
              </Link>
            </div>
          </div>

          {/* Social / Snap & Developer */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm md:text-base mb-3">تابعنا</h4>
            <a
              href="https://www.snapchat.com/add/h5jk6"
              className="flex items-center gap-2 text-xs md:text-sm text-text-secondary hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-lg">👻</span>
              <span>سناب: h5jk6</span>
            </a>
            <div className="pt-4 mt-4 border-t border-gray-800">
              <p className="text-[10px] md:text-xs text-text-muted">
                © 2025 Abdulkarim Aldawsari
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
