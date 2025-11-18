import { Suspense } from 'react';
import CatalogContent from '@/components/CatalogContent';

export default function CatalogPage() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">المنتجات</h1>
          <p className="text-text-secondary">تصفح جميع المنتجات المتوفرة في متجرنا</p>
        </div>

        <Suspense fallback={<div className="text-center text-text-secondary">جاري التحميل...</div>}>
          <CatalogContent />
        </Suspense>
      </div>
    </div>
  );
}
