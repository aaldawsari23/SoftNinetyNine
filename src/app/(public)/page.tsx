import Hero from '@/components/Hero';
import ProductGrid from '@/components/products/ProductGrid';
import { products } from '@/data/realData';
import Link from 'next/link';

export default function Home() {
  // Get latest products (first 8 for better showcase)
  const latestProducts = products.filter(p => p.is_available).slice(0, 8);

  // Get bikes only (first 4)
  const bikes = products.filter(p => p.category_id?.startsWith('c-') && p.is_available).slice(0, 4);

  const categoriesHighlights = [
    {
      title: 'الدراجات النارية',
      description: 'سبورت، كروزر، ادفنتشر، صحراوي، ومستعمل مميز',
      icon: '🏍️',
      href: '/catalog?type=bike',
      cta: 'استعرض الدراجات',
    },
    {
      title: 'قطع الغيار والزيوت',
      description: 'زيوت موتول، فلاتر، كهرباء، نقل حركة وصيانة دورية',
      icon: '⚙️',
      href: '/catalog?type=part',
      cta: 'تصفح القطع',
    },
    {
      title: 'إكسسوارات ووقاية',
      description: 'خوذ، قفازات، جاكيتات وأدوات حماية للركاب',
      icon: '🛡️',
      href: '/catalog?type=gear',
      cta: 'تسوق الإكسسوارات',
    },
    {
      title: 'مواقف للإيجار',
      description: 'مساحات آمنة لحفظ الدراجة بخطط يومية، أسبوعية وشهرية',
      icon: '🅿️',
      href: '/parking',
      cta: 'تعرف على الأسعار',
    },
  ];

  return (
    <>
      <Hero />

      {/* Main Categories Section - placed first for better UX */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-14 space-y-3">
            <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-semibold">
              اختر الوجهة المناسبة لك
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">تصفح حسب الخدمة</h2>
            <p className="text-text-secondary text-sm md:text-base max-w-2xl mx-auto">
              الدراجات المميزة، القطع الأصلية، إكسسوارات الحماية وخدمة المواقف كلها متوفرة لتختار ما يناسبك بسرعة.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
            {categoriesHighlights.map((category) => (
              <Link
                key={category.title}
                href={category.href}
                aria-label={`الانتقال إلى ${category.title}`}
                className="group card h-full p-6 md:p-7 flex flex-col gap-4 text-right border border-white/5 bg-gradient-to-b from-background-light/70 to-background-light"
              >
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center text-3xl">
                    {category.icon}
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-text-muted">Soft99</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-text-secondary text-xs md:text-sm leading-relaxed">
                    {category.description}
                  </p>
                </div>
                <span className="mt-auto text-primary text-sm md:text-base font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {category.cta}
                  <span aria-hidden>←</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Bikes Section */}
      {bikes.length > 0 && (
        <section className="py-10 md:py-16 bg-background-light">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 md:mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">الدراجات المميزة</h2>
                <p className="text-text-secondary text-xs md:text-sm">أحدث الدراجات المتوفرة لدينا</p>
              </div>
              <Link
                href="/catalog?type=bike"
                className="text-primary hover:text-primary-hover transition-colors text-sm md:text-base font-semibold"
              >
                عرض كل الدراجات ←
              </Link>
            </div>
            <ProductGrid products={bikes} />
          </div>
        </section>
      )}

      {/* Latest Products Section */}
      <section className="py-10 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 md:mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">أحدث المنتجات</h2>
              <p className="text-text-secondary text-xs md:text-sm">آخر ما تم إضافته للمتجر</p>
            </div>
            <Link
              href="/catalog"
              className="text-primary hover:text-primary-hover transition-colors text-sm md:text-base font-semibold"
            >
              عرض الكل ←
            </Link>
          </div>
          <ProductGrid products={latestProducts} />
        </div>
      </section>

      {/* CTA Section - simplified */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-background-light to-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            هل لديك استفسار؟
          </h2>
          <p className="text-text-secondary text-sm md:text-base mb-6 max-w-xl mx-auto">
            فريقنا جاهز لمساعدتك في اختيار الدراجة أو القطعة المناسبة
          </p>
          <Link href="/contact" className="btn-primary px-6 md:px-8 py-2.5 md:py-3 text-base md:text-lg inline-block">
            تواصل معنا الآن 📞
          </Link>
        </div>
      </section>
    </>
  );
}
