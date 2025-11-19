import Hero from '@/components/Hero';
import ProductGrid from '@/components/products/ProductGrid';
import { products } from '@/data/mockData';
import Link from 'next/link';

export default function Home() {
  // Get latest products (first 8 for better showcase)
  const latestProducts = products.filter(p => p.status === 'published').slice(0, 8);
  // Get bikes only (first 4)
  const bikes = products.filter(p => p.type === 'bike' && p.status === 'published').slice(0, 4);

  return (
    <>
      <Hero />

      {/* Main Categories Section - Enhanced Design */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-background-light relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-[150px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 md:mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              <span className="text-gradient-primary">تصفح حسب الفئة</span>
            </h2>
            <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto">اختر الفئة المناسبة لك واستكشف مجموعتنا المتنوعة</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Bikes Category */}
            <Link
              href="/catalog?type=bike"
              className="category-card group relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="text-6xl md:text-7xl mb-6 group-hover:scale-125 group-hover:rotate-3 transition-all duration-500">
                  🏍️
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-3 group-hover:text-primary transition-colors">
                  الدراجات النارية
                </h3>
                <p className="text-text-secondary text-sm md:text-base mb-6">
                  سبورت، كروزر، ادفنتشر، وغيرها
                </p>
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <span>تصفح الدراجات</span>
                  <span className="group-hover:translate-x-2 transition-transform">←</span>
                </div>
              </div>

              {/* Hover effect background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>

            {/* Parts Category */}
            <Link
              href="/catalog?type=part"
              className="category-card group relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="text-6xl md:text-7xl mb-6 group-hover:scale-125 group-hover:rotate-3 transition-all duration-500">
                  ⚙️
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-3 group-hover:text-primary transition-colors">
                  قطع الغيار
                </h3>
                <p className="text-text-secondary text-sm md:text-base mb-6">
                  زيوت، فلاتر، إطارات، وقطع احترافية
                </p>
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <span>تصفح القطع</span>
                  <span className="group-hover:translate-x-2 transition-transform">←</span>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-secondary/0 via-secondary/5 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>

            {/* Gear Category */}
            <Link
              href="/catalog?type=gear"
              className="category-card group relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="text-6xl md:text-7xl mb-6 group-hover:scale-125 group-hover:rotate-3 transition-all duration-500">
                  🪖
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-3 group-hover:text-primary transition-colors">
                  الإكسسوارات
                </h3>
                <p className="text-text-secondary text-sm md:text-base mb-6">
                  خوذ، قفازات، جاكيتات، وأحذية
                </p>
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <span>تصفح الإكسسوارات</span>
                  <span className="group-hover:translate-x-2 transition-transform">←</span>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Bikes Section - Enhanced */}
      {bikes.length > 0 && (
        <section className="py-16 md:py-24 bg-gradient-to-b from-background-light to-background relative">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 md:mb-12">
              <div className="animate-slide-up">
                <h2 className="section-title">الدراجات المميزة</h2>
                <p className="text-text-secondary text-sm md:text-base mt-2">أحدث الدراجات المتوفرة لدينا</p>
              </div>
              <Link
                href="/catalog?type=bike"
                className="group flex items-center gap-2 text-primary hover:text-primary-hover transition-colors font-bold animate-fade-in"
              >
                <span>عرض كل الدراجات</span>
                <span className="group-hover:translate-x-2 transition-transform">←</span>
              </Link>
            </div>
            <ProductGrid products={bikes} />
          </div>
        </section>
      )}

      {/* Latest Products Section - Enhanced */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-background-light relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 md:mb-12">
            <div className="animate-slide-up">
              <h2 className="section-title">أحدث المنتجات</h2>
              <p className="text-text-secondary text-sm md:text-base mt-2">آخر ما تم إضافته للمتجر</p>
            </div>
            <Link
              href="/catalog"
              className="group flex items-center gap-2 text-primary hover:text-primary-hover transition-colors font-bold animate-fade-in"
            >
              <span>عرض الكل</span>
              <span className="group-hover:translate-x-2 transition-transform">←</span>
            </Link>
          </div>
          <ProductGrid products={latestProducts} />
        </div>
      </section>

      {/* Features Section - New */}
      <section className="py-16 md:py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              <span className="text-gradient">لماذا نحن الأفضل؟</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: '🏆',
                title: 'جودة مضمونة',
                desc: 'جميع منتجاتنا أصلية ومضمونة',
                color: 'from-yellow-500/20 to-yellow-600/20'
              },
              {
                icon: '💸',
                title: 'أسعار منافسة',
                desc: 'أفضل الأسعار في السوق',
                color: 'from-green-500/20 to-green-600/20'
              },
              {
                icon: '🚀',
                title: 'توصيل سريع',
                desc: 'توصيل لجميع أنحاء المملكة',
                color: 'from-blue-500/20 to-blue-600/20'
              },
              {
                icon: '🛠️',
                title: 'دعم فني',
                desc: 'فريق متخصص لمساعدتك',
                color: 'from-purple-500/20 to-purple-600/20'
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="glass hover:bg-white/10 p-8 rounded-2xl text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <span className="text-4xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-text-secondary text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary/10 via-background to-background relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              هل لديك استفسار؟
            </h2>
            <p className="text-text-secondary text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              فريقنا جاهز لمساعدتك في اختيار الدراجة أو القطعة المناسبة
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="group relative px-10 py-4 bg-gradient-to-r from-primary to-primary-hover text-white font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/50 inline-flex items-center gap-3"
              >
                <span className="text-lg">تواصل معنا الآن</span>
                <span className="text-2xl group-hover:rotate-12 transition-transform">📞</span>
              </Link>

              <Link
                href="/parking"
                className="group relative px-10 py-4 bg-background-card/50 backdrop-blur-md text-white font-bold rounded-2xl border-2 border-accent/30 overflow-hidden transition-all duration-300 hover:scale-105 hover:border-accent hover:bg-accent/10 hover:shadow-xl inline-flex items-center gap-3"
              >
                <span className="text-lg">مواقف للإيجار</span>
                <span className="text-2xl group-hover:scale-110 transition-transform">🅿️</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
