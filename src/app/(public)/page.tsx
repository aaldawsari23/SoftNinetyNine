import { Suspense } from 'react';
import CatalogContent from '@/components/CatalogContent';

export default function Home() {
  return (
    <div className="min-h-screen bg-background py-3 md:py-4">
      <div className="container mx-auto px-3 md:px-4">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              <p className="mt-4 text-text-muted">جاري التحميل...</p>
            </div>
          </div>
        }>
          <CatalogContent />
        </Suspense>
      </div>
    </div>
  );
}
