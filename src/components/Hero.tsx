import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-gray-900 via-background to-background py-8 md:py-12 overflow-hidden min-h-[60vh] flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Title */}
          <div className="flex flex-col items-center justify-center gap-3 mb-6">
            <div className="relative w-16 h-16 md:w-20 md:h-20">
              <Image
                src="/logo.svg"
                alt="سوفت تسعة وتسعين"
                fill
                className="rounded-lg shadow-lg object-cover"
                priority
              />
            </div>
            <h1 className="flex flex-col items-center gap-1">
              <span className="text-primary text-2xl md:text-4xl font-bold">
                سوفت تسعة وتسعين
              </span>
              <span className="text-white text-lg md:text-2xl font-semibold">
                SoftNinteyNine Bikes
              </span>
            </h1>
          </div>

          {/* Tagline */}
          <p className="text-sm md:text-lg text-text-secondary mb-4 max-w-2xl mx-auto leading-relaxed">
            قطع غيار أصلية + زيوت ومواد الصيانة + إكسسوارات + مواقف للإيجار
          </p>

          <p className="text-xs md:text-base text-text-muted mb-8 md:mb-10 max-w-xl mx-auto">
            نوفّر أفضل قطع الغيار والزيوت والإكسسوارات عالية الجودة في جيزان
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center max-w-md mx-auto">
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
