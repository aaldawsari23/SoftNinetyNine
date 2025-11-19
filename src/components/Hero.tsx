import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  const stats = [
    { label: 'قطع وصيانة', helper: 'زيوت موتول، فلاتر، كهرباء ودعم فني' },
    { label: 'معدات السلامة', helper: 'خوذ، جاكيتات، قفازات وإكسسوارات حماية' },
    { label: 'مواقف وخدمات', helper: 'مواقف للإيجار واستلام سريع من المعرض' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-950 via-background to-background py-12 md:py-20">
      {/* Background Pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-15">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid items-center gap-10 lg:gap-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="space-y-6 text-center lg:text-right">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-1.5 text-xs md:text-sm text-text-secondary">
              <span className="text-primary text-base">●</span>
              <span>خدمة متخصصة لبيع وصيانة الدراجات في جيزان</span>
            </div>

            <div className="space-y-5">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-snug">
                كل ما تحتاجه دراجتك من متجر واحد موثوق
              </h1>
              <p className="text-sm md:text-lg text-text-secondary leading-relaxed">
                متجر سوفت تسعة وتسعين يوفر دراجات جديدة ومميزة، قطع غيار أصلية، زيوت موتول، إكسسوارات حماية، وخدمة مواقف آمنة مع فريق يعرف متطلبات راكبي الدراجات في المنطقة.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-2xl mx-auto lg:mx-0">
              <Link href="/catalog" className="btn-primary flex-1 py-3 md:py-4 text-base font-bold">
                تصفح المنتجات
              </Link>
              <a
                href="https://wa.me/966568663381"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex-1 py-3 md:py-4 text-base font-semibold"
              >
                تواصل عبر واتساب
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="card bg-white/5 border-white/10 text-right py-4 px-4">
                  <p className="text-white font-semibold text-lg">{stat.label}</p>
                  <p className="text-text-secondary text-xs md:text-sm leading-relaxed">{stat.helper}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative order-first lg:order-last">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-gradient-to-br from-primary/20 to-transparent">
              <Image
                src="/Images/1210.jpg"
                alt="دراجات نارية مميزة في معرض سوفت تسعة وتسعين"
                width={960}
                height={800}
                priority
                className="object-cover w-full h-full max-h-[420px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-0 right-0 left-0 p-4 md:p-6 flex items-center justify-between text-xs md:text-sm text-white">
                <div>
                  <p className="font-semibold">سوفت تسعة وتسعين</p>
                  <p className="text-text-secondary text-[11px]">Bikes • Parts • Parking</p>
                </div>
                <div className="flex items-center gap-2 bg-background/70 backdrop-blur px-3 py-1.5 rounded-full border border-white/10 text-primary text-xs font-semibold">
                  <span className="text-lg">🏍️</span>
                  <span>جاهزون للتسليم</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
