import Hero from '@/components/Hero';
import ProductGrid from '@/components/products/ProductGrid';
import { products } from '@/data/realData';
import Link from 'next/link';

export default function Home() {
  // Get latest products (first 8 for better showcase)
  const latestProducts = products.filter(p => p.is_available).slice(0, 8);

  // Get bikes only (first 4)
  const bikes = products.filter(p => p.category_id?.startsWith('c-') && p.is_available).slice(0, 4);

  return (
    <>
      <Hero />

      {/* Main Categories Section - placed first for better UX */}
      <section className="py-10 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">تصفح حسب الفئة</h2>
            <p className="text-text-secondary text-sm md:text-base">اختر الفئة المناسبة لك</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Bikes Category */}
            <Link
              href="/catalog?type=bike"
              className="group card p-6 md:p-8 text-center hover:border-primary transition-all duration-300"
            >
              <div className="text-5xl md:text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                🏍️
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                الدراجات النارية
              </h3>
              <p className="text-text-secondary text-xs md:text-sm mb-4">
                سبورت، كروزر، ادفنتشر، وغيرها
              </p>
              <span className="text-primary text-sm group-hover:underline">
                تصفح الدراجات ←
              </span>
            </Link>

            {/* Parts Category */}
            <Link
              href="/catalog?type=part"
              className="group card p-6 md:p-8 text-center hover:border-primary transition-all duration-300"
            >
              <div className="text-5xl md:text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                ⚙️
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                قطع الغيار
              </h3>
              <p className="text-text-secondary text-xs md:text-sm mb-4">
                زيوت، فلاتر، إطارات، وقطع احترافية
              </p>
              <span className="text-primary text-sm group-hover:underline">
                تصفح القطع ←
              </span>
            </Link>

            {/* Gear Category */}
            <Link
              href="/catalog?type=gear"
              className="group card p-6 md:p-8 text-center hover:border-primary transition-all duration-300"
            >
              <div className="text-5xl md:text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                🪖
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                الإكسسوارات
              </h3>
              <p className="text-text-secondary text-xs md:text-sm mb-4">
                خوذ، قفازات، جاكيتات، وأحذية
              </p>
              <span className="text-primary text-sm group-hover:underline">
                تصفح الإكسسوارات ←
              </span>
            </Link>
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
