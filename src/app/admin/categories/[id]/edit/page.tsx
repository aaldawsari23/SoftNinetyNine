'use client';

import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import CategoryForm from '@/components/admin/CategoryForm';
import { getDataProvider } from '@/lib/data-providers';
import { Category } from '@/types';

export default function EditCategoryPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const dataProvider = getDataProvider();

  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCategory() {
      try {
        const found = await dataProvider.getCategoryById(id);
        if (!found) {
          setError('DE J*E 'D9+H1 9DI 'DA&)');
          return;
        }
        setCategory(found);
      } catch (loadError) {
        console.error('Error loading category', loadError);
        setError('-/+ .7# #+F'! *-EJD 'DA&)');
      } finally {
        setIsLoading(false);
      }
    }
    loadCategory();
  }, [dataProvider, id]);

  const handleSubmit = async (categoryData: Omit<Category, 'id' | 'created_at'>) => {
    try {
      await dataProvider.updateCategory(id, categoryData);
      router.push('/admin/categories');
    } catch (error) {
      console.error('Error updating category', error);
      alert('-/+ .7# #+F'! *-/J+ 'DA&)');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <p className="text-text-secondary">,'1M *-EJD (J'F'* 'DA&)...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-6">
        <div className="card p-4 space-y-3">
          <p className="text-red-400 text-sm">{error}</p>
          <Link
            href="/admin/categories"
            className="text-primary hover:text-primary-hover text-sm"
          >
            ê 'D1,H9 DDA&'*
          </Link>
        </div>
      </div>
    );
  }

  if (!category) {
    return null;
  }

  return (
    <div className="px-2 sm:px-4 pb-8 space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">*9/JD 'DA&)</h1>
          <p className="text-text-secondary text-sm">BE (*-/J+ (J'F'* 'DA&) +E '-A8 'D*:JJ1'*.</p>
        </div>
        <Link
          href="/admin/categories"
          className="text-text-secondary hover:text-white text-sm border border-white/10 px-3 py-1.5 rounded-md"
        >
          ê 'D1,H9 DDA&'*
        </Link>
      </div>

      <CategoryForm
        mode="edit"
        initialData={category}
        onSubmit={handleSubmit}
        onCancel={() => router.push('/admin/categories')}
      />
    </div>
  );
}
