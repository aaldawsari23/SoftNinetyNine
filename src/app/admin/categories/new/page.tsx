'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import CategoryForm from '@/components/admin/CategoryForm';
import { getDataProvider } from '@/lib/data-providers';
import { Category } from '@/types';

export default function NewCategoryPage() {
  const router = useRouter();
  const dataProvider = getDataProvider();
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (categoryData: Omit<Category, 'id' | 'created_at'>) => {
    setIsSaving(true);
    try {
      await dataProvider.createCategory(categoryData);
      router.push('/admin/categories');
    } catch (error) {
      console.error('Error creating category', error);
      alert('-/+ .7# #+F'! %6'A) 'DA&)');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="px-2 sm:px-4 pb-8 space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">%6'A) A&) ,/J/)</h1>
          <p className="text-text-secondary text-sm">#/.D (J'F'* 'DA&) H3J*E -A8G' E-DJ'K #+F'! 'D*7HJ1.</p>
        </div>
        <Link
          href="/admin/categories"
          className="text-text-secondary hover:text-white text-sm border border-white/10 px-3 py-1.5 rounded-md"
        >
          ê 'D1,H9 DDA&'*
        </Link>
      </div>

      <CategoryForm
        mode="create"
        onSubmit={handleSubmit}
        onCancel={() => router.push('/admin/categories')}
      />

      {isSaving && (
        <div className="text-sm text-text-secondary">,'1M 'D-A8...</div>
      )}
    </div>
  );
}
