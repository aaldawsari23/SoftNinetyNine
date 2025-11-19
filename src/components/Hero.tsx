import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-gray-900 via-background to-background py-10 sm:py-14 overflow-hidden min-h-[60vh] flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto bg-background/40 rounded-3xl border border-white/5 shadow-2xl shadow-primary/5 px-4 sm:px-8 py-8 sm:py-10 backdrop-blur">
          {/* Main Title */}
          <div className="flex flex-col items-center justify-center gap-4 mb-6">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 p-1.5 rounded-2xl border border-primary/40 bg-background shadow-lg">
              <Image
                src="/logo.png"
                alt="سوفت تسعة وتسعين"
                fill
                sizes="(max-width: 640px) 96px, 128px"
                className="rounded-xl object-contain"
                priority
              />
            </div>
            <h1 className="flex flex-col items-center gap-1">
              <span className="text-primary text-2xl md:text-4xl font-bold text-balance">
                سوفت تسعة وتسعين
              </span>
              <span className="text-white text-lg md:text-2xl font-semibold">
                SoftNinteyNine Bikes
              </span>
            </h1>
          </div>

          {/* Tagline */}
          <p className="text-sm md:text-lg text-text-secondary mb-4 max-w-2xl mx-auto leading-relaxed text-balance">
            قطع غيار أصلية + زيوت ومواد الصيانة + إكسسوارات + مواقف للإيجار
          </p>

          <p className="text-xs md:text-base text-text-muted mb-8 md:mb-10 max-w-xl mx-auto text-balance">
            نوفّر أفضل قطع الغيار والزيوت والإكسسوارات عالية الجودة في جيزان
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center max-w-md mx-auto w-full">
            <Link
              href="/catalog"
              className="btn-primary px-6 md:px-8 py-3 md:py-4 text-sm md:text-base w-full sm:w-auto font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              تصفح المنتجات 🛍️
            </Link>
            <Link 
              href="/contact" 
              className="btn-secondary px-6 md:px-8 py-3 md:py-4 text-sm md:text-base w-full sm:w-auto font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              تواصل معنا 📞
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
