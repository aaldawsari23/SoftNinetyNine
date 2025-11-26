'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { getDataProvider } from '@/lib/data-providers';
import { Brand, Category, Product, ProductStatus, ProductType } from '@/types';

interface ProductFormProps {
  mode: 'create' | 'edit';
  initialData?: Product;
  onSubmit: (
    product: Omit<Product, 'id' | 'created_at' | 'updated_at'>
  ) => Promise<void>;
  onCancel?: () => void;
}

interface FormState {
  name_ar: string;
  name_en: string;
  sku: string;
  category_id: string;
  brand_id: string;
  type: ProductType;
  price: number;
  currency: string;
  description: string;
  short_description: string;
  status: ProductStatus;
  is_featured: boolean;
  stock_quantity: number;
  images: string[];
}

function normalizeInitialImages(product?: Product): string[] {
  if (!product) return [];
  if (product.images && product.images.length > 0) return product.images;
  if (product.image_url) return [product.image_url];
  return [];
}

export default function ProductForm({ mode, initialData, onSubmit, onCancel }: ProductFormProps) {
  const router = useRouter();
  const dataProvider = useMemo(() => getDataProvider(), []);

  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoadingMeta, setIsLoadingMeta] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formState, setFormState] = useState<FormState>(() => ({
    name_ar: initialData?.name_ar ?? '',
    name_en: initialData?.name_en ?? '',
    sku: initialData?.sku ?? '',
    category_id: initialData?.category_id ?? '',
    brand_id: initialData?.brand_id ?? '',
    type: initialData?.type ?? 'part',
    price: initialData?.price ?? 0,
    currency: initialData?.currency ?? 'SAR',
    description: initialData?.description ?? '',
    short_description: initialData?.short_description ?? '',
    status: initialData?.status ?? 'published',
    is_featured: initialData?.is_featured ?? false,
    stock_quantity: initialData?.stock_quantity ?? 0,
    images: normalizeInitialImages(initialData),
  }));

  // Load categories & brands for dropdowns
  useEffect(() => {
    async function loadMeta() {
      try {
        const [cats, brs] = await Promise.all([
          dataProvider.getCategories(),
          dataProvider.getBrands(),
        ]);
        setCategories(cats);
        setBrands(brs);
      } catch (metaError) {
        console.error('Error loading meta data', metaError);
        setError('حدث خطأ أثناء تحميل البيانات المساندة');
      } finally {
        setIsLoadingMeta(false);
      }
    }
    loadMeta();
  }, [dataProvider]);

  const handleInputChange = (
    field: keyof FormState,
    value: string | number | boolean
  ) => {
    setFormState(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRemoveImage = (index: number) => {
    setFormState(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleImageUrlAdd = (value: string) => {
    if (!value) return;
    setFormState(prev => ({
      ...prev,
      images: [...prev.images, value],
    }));
  };

  const handleFileChange = (file: File | null) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFormState(prev => ({
          ...prev,
          images: [...prev.images, reader.result as string],
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const validate = (): string | null => {
    if (!formState.name_ar.trim()) return 'اسم المنتج (بالعربية) مطلوب';
    if (!formState.category_id) return 'يجب اختيار الفئة';
    if (!formState.price || formState.price < 0) return 'السعر يجب أن يكون رقمًا أكبر من 0';
    if (!formState.currency) return 'العملة مطلوبة';
    if (!formState.description.trim()) return 'الوصف مطلوب';
    return null;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setIsSubmitting(true);

    const payload: Omit<Product, 'id' | 'created_at' | 'updated_at'> = {
      name: formState.name_ar, // compatibility
      name_ar: formState.name_ar,
      name_en: formState.name_en || undefined,
      sku: formState.sku || undefined,
      category_id: formState.category_id,
      brand_id: formState.brand_id || undefined,
      type: formState.type,
      price: Number(formState.price),
      currency: formState.currency,
      description: formState.description,
      short_description: formState.short_description || undefined,
      status: formState.status,
      is_featured: formState.is_featured,
      stock_quantity: formState.stock_quantity ? Number(formState.stock_quantity) : undefined,
      stock_status: formState.stock_quantity && formState.stock_quantity > 0 ? 'available' : 'unavailable',
      images: formState.images,
      image_url: formState.images[0],
      specs: initialData?.specs,
      specifications: initialData?.specifications,
      salla_url: initialData?.salla_url,
      is_available: formState.stock_quantity > 0,
      is_new: initialData?.is_new,
      remoteImageUrl: initialData?.remoteImageUrl,
    };

    try {
      await onSubmit(payload);
      if (mode === 'create') {
        router.push('/admin/products');
      }
    } catch (submitError) {
      console.error('Error saving product', submitError);
      setError('حدث خطأ أثناء حفظ المنتج');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Info */}
        <div className="card lg:col-span-2 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">
              {mode === 'create' ? 'إضافة منتج جديد' : 'تعديل المنتج'}
            </h2>
            {mode === 'edit' && initialData?.id && (
              <span className="text-xs text-text-muted">ID: {initialData.id}</span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm text-text-secondary">اسم المنتج (عربي) *</label>
              <input
                className="input-field"
                value={formState.name_ar}
                onChange={(e) => handleInputChange('name_ar', e.target.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-text-secondary">اسم المنتج (إنجليزي)</label>
              <input
                className="input-field"
                value={formState.name_en}
                onChange={(e) => handleInputChange('name_en', e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-text-secondary">رقم المنتج SKU</label>
              <input
                className="input-field"
                value={formState.sku}
                onChange={(e) => handleInputChange('sku', e.target.value)}
                placeholder="مثال: SKU-12345"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-text-secondary">نوع المنتج</label>
              <select
                className="input-field"
                value={formState.type}
                onChange={(e) => handleInputChange('type', e.target.value as ProductType)}
              >
                <option value="bike">دراجة</option>
                <option value="part">قطعة</option>
                <option value="gear">معدات</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm text-text-secondary">الفئة *</label>
              <select
                className="input-field"
                value={formState.category_id}
                onChange={(e) => handleInputChange('category_id', e.target.value)}
                required
                disabled={isLoadingMeta}
              >
                <option value="">اختر الفئة</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name_ar}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm text-text-secondary">الماركة</label>
              <select
                className="input-field"
                value={formState.brand_id}
                onChange={(e) => handleInputChange('brand_id', e.target.value)}
                disabled={isLoadingMeta}
              >
                <option value="">بدون ماركة</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name_ar || brand.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm text-text-secondary">السعر *</label>
              <input
                type="number"
                className="input-field"
                value={formState.price}
                onChange={(e) => handleInputChange('price', Number(e.target.value))}
                min={0}
                step="0.01"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-text-secondary">العملة *</label>
              <input
                className="input-field"
                value={formState.currency}
                onChange={(e) => handleInputChange('currency', e.target.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-text-secondary">الكمية في المخزون</label>
              <input
                type="number"
                className="input-field"
                value={formState.stock_quantity}
                onChange={(e) => handleInputChange('stock_quantity', Number(e.target.value))}
                min={0}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-text-secondary">الحالة</label>
              <select
                className="input-field"
                value={formState.status}
                onChange={(e) => handleInputChange('status', e.target.value as ProductStatus)}
              >
                <option value="published">منشور</option>
                <option value="hidden">مخفي</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input
                id="is_featured"
                type="checkbox"
                className="accent-primary"
                checked={formState.is_featured}
                onChange={(e) => handleInputChange('is_featured', e.target.checked)}
              />
              <label htmlFor="is_featured" className="text-sm text-text-secondary">
                مميز في المتجر
              </label>
            </div>
          </div>

          <div className="space-y-1 mt-4">
            <label className="text-sm text-text-secondary">وصف المنتج *</label>
            <textarea
              className="input-field min-h-[120px]"
              value={formState.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              required
            />
          </div>

          <div className="space-y-1 mt-4">
            <label className="text-sm text-text-secondary">وصف مختصر</label>
            <textarea
              className="input-field min-h-[80px]"
              value={formState.short_description}
              onChange={(e) => handleInputChange('short_description', e.target.value)}
              placeholder="جملة أو جملتان عن المنتج"
            />
          </div>
        </div>

        {/* Images & Status */}
        <div className="space-y-4">
          <div className="card p-4 sm:p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white">الصور</h3>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-sm text-text-secondary">أضف صورة عبر رابط</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    className="input-field flex-1"
                    placeholder="https://example.com/image.jpg"
                    onBlur={(e) => handleImageUrlAdd(e.target.value.trim())}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm text-text-secondary">أو ارفع صورة من جهازك</label>
                <input
                  type="file"
                  accept="image/*"
                  className="block w-full text-sm text-text-secondary"
                  onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
                />
                <p className="text-xs text-text-muted">سيتم حفظ الصورة كبيانات محلية فقط أثناء التطوير.</p>
              </div>

              {formState.images.length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                  {formState.images.map((img, index) => (
                    <div key={index} className="relative group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img}
                        alt={`Product image ${index + 1}`}
                        className="w-full aspect-square object-cover rounded-md border border-white/5"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        حذف
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="card p-4 sm:p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white">إجراءات</h3>
            {error && <div className="bg-red-500/10 text-red-300 text-sm p-3 rounded-md">{error}</div>}

            <div className="flex flex-col gap-3">
              <button
                type="submit"
                className="btn-primary text-center disabled:opacity-60"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'جاري الحفظ...' : mode === 'create' ? 'حفظ المنتج' : 'تحديث المنتج'}
              </button>
              {onCancel ? (
                <button
                  type="button"
                  onClick={onCancel}
                  className="w-full text-center py-2 px-3 rounded-md border border-white/10 text-text-secondary hover:text-white hover:border-white/20 transition-colors"
                  disabled={isSubmitting}
                >
                  إلغاء
                </button>
              ) : (
                <Link
                  href="/admin/products"
                  className="w-full text-center py-2 px-3 rounded-md border border-white/10 text-text-secondary hover:text-white hover:border-white/20 transition-colors"
                >
                  رجوع لقائمة المنتجات
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
