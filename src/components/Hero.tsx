import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] md:min-h-[85vh] bg-gradient-to-br from-background via-background-light to-background overflow-hidden flex items-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(to right, #FF2E2E 1px, transparent 1px), linear-gradient(to bottom, #FF2E2E 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>

        {/* Gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse-slow animation-delay-2000"></div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-float"></div>
          <div className="absolute top-3/4 left-3/4 w-2 h-2 bg-secondary rounded-full animate-float animation-delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-accent rounded-full animate-float animation-delay-2000"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Logo and Title with animation */}
          <div className="flex flex-col items-center justify-center gap-6 mb-8 animate-slide-down">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/30 blur-xl group-hover:bg-primary/50 transition-all duration-500"></div>
              <img
                src="/logo.jpeg"
                alt="سوفت تسعة وتسعين"
                className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl shadow-2xl border-2 border-primary/30 group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <h1 className="relative">
              <span className="block text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-hover to-accent animate-shimmer bg-[length:200%_auto]">
                سوفت تسعة وتسعين
              </span>
              <span className="block text-xl md:text-2xl lg:text-3xl font-bold text-white/80 mt-2">
                SoftNinteyNine Bikes
              </span>
            </h1>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up mt-8">
            <Link
              href="/catalog"
              className="group relative px-8 py-4 bg-gradient-to-r from-primary to-primary-hover text-white font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/50 w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>تصفح المنتجات</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-hover to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            <Link
              href="/contact"
              className="group relative px-8 py-4 bg-background-card/50 backdrop-blur-md text-white font-bold rounded-2xl border-2 border-primary/30 overflow-hidden transition-all duration-300 hover:scale-105 hover:border-primary hover:bg-primary/10 hover:shadow-xl w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>تواصل معنا</span>
              </span>
            </Link>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
