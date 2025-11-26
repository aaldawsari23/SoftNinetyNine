'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import BrandForm from '@/components/admin/BrandForm';
import { getDataProvider } from '@/lib/data-providers';
import { Brand } from '@/types';

export default function NewBrandPage() {
  const router = useRouter();
  const dataProvider = getDataProvider();
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (brandData: Omit<Brand, 'id' | 'created_at'>) => {
    setIsSaving(true);
    try {
      await dataProvider.createBrand(brandData);
      router.push('/admin/brands');
    } catch (error) {
      console.error('Error creating brand', error);
      alert('-/+ .7# #+F'! %6'A) 'D9D'E) 'D*,'1J)');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="px-2 sm:px-4 pb-8 space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">%6'A) 9D'E) *,'1J) ,/J/)</h1>
          <p className="text-text-secondary text-sm">#/.D (J'F'* 'D9D'E) 'D*,'1J) H3J*E -A8G' E-DJ'K #+F'! 'D*7HJ1.</p>
        </div>
        <Link
          href="/admin/brands"
          className="text-text-secondary hover:text-white text-sm border border-white/10 px-3 py-1.5 rounded-md"
        >
          ê 'D1,H9 DD9D'E'*
        </Link>
      </div>

      <BrandForm
        mode="create"
        onSubmit={handleSubmit}
        onCancel={() => router.push('/admin/brands')}
      />

      {isSaving && (
        <div className="text-sm text-text-secondary">,'1M 'D-A8...</div>
      )}
    </div>
  );
}
