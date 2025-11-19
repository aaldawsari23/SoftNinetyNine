import { Suspense } from 'react';
import CatalogContent from '@/components/CatalogContent';

function CatalogLoading() {
  return (
    <div className="card text-center py-10">
      <div className="mx-auto mb-3 h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
      <p className="text-text-secondary text-sm">جاري تجهيز المنتجات...</p>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <section className="min-h-screen bg-background py-10 md:py-14">
      <div className="container mx-auto px-4 space-y-10">
        {/* Header */}
        <div className="card bg-gradient-to-l from-background-light to-background border-white/5">
          <p className="text-primary font-semibold text-sm mb-2">كل ما نقدمه في مكان واحد</p>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">كتالوج المنتجات الكامل</h1>
          <p className="text-text-secondary text-sm md:text-base">
            دراجات جديدة ومستعملة، قطع غيار أصلية، إكسسوارات حماية، وزيوت صيانة معروضة بوضوح حتى تختار ما يناسبك بسرعة.
          </p>
        </div>

        <Suspense fallback={<CatalogLoading />}>
          <CatalogContent />
        </Suspense>
      </div>
    </section>
  );
}
