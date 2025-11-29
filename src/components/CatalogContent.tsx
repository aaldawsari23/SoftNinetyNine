'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import ProductGrid from '@/components/products/ProductGrid';
import { Product, Category, Brand } from '@/types';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { getDataProvider } from '@/lib/data-providers';
import { filterProducts, sortProducts, paginateProducts } from '@/utils/catalog';

const ITEMS_PER_PAGE = 20;

// ترتيب الفئات في الشريط الهجين حسب منطق المتجر
const CATEGORY_ORDER: string[] = [
  'motorcycles', // دراجات نارية
  'c1',          // زيوت
  'c5',          // إطارات
  'c2',          // فلاتر
  'c4',          // بطاريات
  'c15',         // ملابس
  'c13',         // إكسسوارات
  'c14',         // قطع متفرقة
];

export default function CatalogContent() {
  const dataProvider = getDataProvider();

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // URL params
  const categoryParam = searchParams.get('category');
  const brandParam = searchParams.get('brand');
  const searchParam = searchParams.get('q');
  const minPriceParam = searchParams.get('min');
  const maxPriceParam = searchParams.get('max');

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');
  const [selectedBrand, setSelectedBrand] = useState<string>(brandParam || 'all');
  const [searchQuery, setSearchQuery] = useState<string>(searchParam || '');
  const [minPrice, setMinPrice] = useState<string>(minPriceParam || '');
  const [maxPrice, setMaxPrice] = useState<string>(maxPriceParam || '');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);

  // Data state
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load data once
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        setIsLoading(true);
        const [productsData, categoriesData, brandsData] = await Promise.all([
          dataProvider.getProducts({ status: 'published' }),
          dataProvider.getCategories(),
          dataProvider.getBrands(),
        ]);

        if (!isMounted) return;

        setProducts(productsData);
        setCategories(categoriesData);
        setBrands(brandsData);
      } catch (error) {
        console.error('Error loading catalog data', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [dataProvider]);

  // Sync filters → URL
  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedCategory !== 'all') {
      params.set('category', selectedCategory);
    }

    if (selectedBrand !== 'all') {
      params.set('brand', selectedBrand);
    }

    if (searchQuery) {
      params.set('q', searchQuery);
    }

    if (minPrice) {
      params.set('min', minPrice);
    }

    if (maxPrice) {
      params.set('max', maxPrice);
    }

    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

    router.replace(newUrl, { scroll: false });
  }, [selectedCategory, selectedBrand, searchQuery, minPrice, maxPrice, pathname, router]);

  // Filter & sort products
  const filteredProducts = useMemo(() => {
    if (isLoading || products.length === 0) {
      return [];
    }

    const minPriceNum = minPrice ? Number(minPrice) : undefined;
    const maxPriceNum = maxPrice ? Number(maxPrice) : undefined;

    let filtered = filterProducts(products, {
      category: selectedCategory !== 'all' ? selectedCategory : undefined,
      brand: selectedBrand !== 'all' ? selectedBrand : undefined,
      minPrice: Number.isFinite(minPriceNum as number) ? minPriceNum : undefined,
      maxPrice: Number.isFinite(maxPriceNum as number) ? maxPriceNum : undefined,
      search: searchQuery || undefined,
      status: 'published',
    });

    filtered = sortProducts(filtered, 'newest');

    return filtered;
  }, [products, selectedCategory, selectedBrand, searchQuery, minPrice, maxPrice, isLoading]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedBrand, searchQuery, minPrice, maxPrice]);

  // Pagination
  const {
    items: paginatedProducts,
    totalPages,
    totalItems,
    currentPage: safePage,
  } = useMemo(() => {
    return paginateProducts(filteredProducts, currentPage, ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // تأكيد أن الصفحة الحالية من paginate
  useEffect(() => {
    if (safePage !== currentPage) {
      setCurrentPage(safePage);
    }
  }, [safePage, currentPage]);

  // Categories sorted by business logic
  const availableCategories = useMemo(() => {
    if (!categories) return [];

    const orderMap = new Map<string, number>();
    CATEGORY_ORDER.forEach((id, index) => {
      orderMap.set(id, index);
    });

    return [...categories].sort((a, b) => {
      const aOrder = orderMap.has(a.id) ? orderMap.get(a.id)! : CATEGORY_ORDER.length;
      const bOrder = orderMap.has(b.id) ? orderMap.get(b.id)! : CATEGORY_ORDER.length;

      if (aOrder !== bOrder) {
        return aOrder - bOrder;
      }

      return (a.name_ar || '').localeCompare(b.name_ar || '', 'ar');
    });
  }, [categories]);

  // Brands available for current category
  const availableBrands = useMemo(() => {
    if (products.length === 0) return [];

    const publishedProducts = products.filter((p) => p.status === 'published');

    if (selectedCategory !== 'all') {
      const brandIds = new Set(
        publishedProducts.filter((p) => p.category_id === selectedCategory).map((p) => p.brand_id),
      );
      return brands.filter((b) => brandIds.has(b.id));
    }

    const brandIds = new Set(publishedProducts.map((p) => p.brand_id));
    return brands.filter((b) => brandIds.has(b.id));
  }, [selectedCategory, products, brands]);

  const hasActiveFilters =
    selectedBrand !== 'all' ||
    !!searchQuery ||
    !!minPrice ||
    !!maxPrice;

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSearchQuery('');
    setMinPrice('');
    setMaxPrice('');
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
          <p className="mt-4 text-text-muted">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* الشريط الهجين المثبت */}
      <div className="sticky top-14 z-30 bg-background/95 backdrop-blur-md border-b border-white/5 -mx-4 px-4 pt-3 pb-2 shadow-sm">
        {/* الصف العلوي: بحث (ديسكتوب) + زر فلتر */}
        <div className="flex items-center gap-2 mb-2">
          {/* البحث (ديسكتوب) */}
          <div className="hidden md:block flex-1">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن منتج، رقم موديل، أو كود..."
                className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-2.5 pr-10 text-sm text-white placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-2 flex items-center text-text-muted hover:text-white"
                  aria-label="مسح البحث"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
              <span className="absolute inset-y-0 left-3 flex items-center">
                <svg className="w-4 h-4 text-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>

          {/* زر الفلتر */}
          <button
            type="button"
            onClick={() => setIsFilterDrawerOpen(true)}
            className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full border transition-all ${
              hasActiveFilters
                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                : 'bg-white/5 text-text-muted border-white/10 hover:bg-white/10'
            }`}
            aria-label="فتح الفلاتر"
          >
            <div className="relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M6 6a2 2 0 104 0m-4 0a2 2 0 114 0M4 12h10m-8 0a2 2 0 104 0m-4 0a2 2 0 114 0m8 6h6m-4 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                />
              </svg>
              {hasActiveFilters && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full border-2 border-background flex items-center justify-center text-[8px] font-bold">
                  !
                </span>
              )}
            </div>
          </button>
        </div>

        {/* شريط الفئات (شيبس) */}
        {availableCategories.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-1.5 text-xs md:text-sm font-medium rounded-full border transition-all flex-shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-white text-black border-white shadow-md'
                  : 'bg-white/5 text-text-muted border-white/10 hover:bg-white/15'
              }`}
            >
              الكل
            </button>
            {availableCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-1.5 text-xs md:text-sm font-medium rounded-full border transition-all flex-shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-white border-primary shadow-md shadow-primary/30'
                    : 'bg-white/5 text-text-muted border-white/10 hover:bg-white/15'
                }`}
              >
                {cat.name_ar}
              </button>
            ))}
          </div>
        )}

        {/* الفلاتر النشطة (Chips) */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-2 pt-2 border-t border-white/5">
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-[11px] rounded-full border border-primary/20"
              >
                <span>بحث: {searchQuery}</span>
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}

            {selectedBrand !== 'all' && (
              <button
                type="button"
                onClick={() => setSelectedBrand('all')}
                className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-[11px] rounded-full border border-primary/20"
              >
                <span>
                  ماركة:{' '}
                  {availableBrands.find((b) => b.id === selectedBrand)?.name ||
                    brands.find((b) => b.id === selectedBrand)?.name ||
                    selectedBrand}
                </span>
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}

            {(minPrice || maxPrice) && (
              <button
                type="button"
                onClick={() => {
                  setMinPrice('');
                  setMaxPrice('');
                }}
                className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-[11px] rounded-full border border-primary/20"
              >
                <span>
                  السعر:{' '}
                  {minPrice && maxPrice
                    ? `${minPrice} - ${maxPrice} ريال`
                    : minPrice
                    ? `من ${minPrice} ريال`
                    : `حتى ${maxPrice} ريال`}
                </span>
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}

            <button
              type="button"
              onClick={resetFilters}
              className="text-[11px] text-text-muted underline decoration-dotted hover:text-white ml-auto"
            >
              مسح الكل
            </button>
          </div>
        )}
      </div>

      {/* الشبكة + الباجينيشن */}
      <div className="space-y-3">
        <ProductGrid products={paginatedProducts} />

        {totalPages > 1 && (
          <div className="mt-4 flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs md:text-sm text-text-muted disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/10"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    d="M15 19l-7-7 7-7"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>السابق</span>
              </button>

              <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs md:text-sm text-text-muted">
                صفحة <span className="text-primary font-semibold mx-1">{currentPage}</span>
                من <span className="text-primary font-semibold mx-1">{totalPages}</span>
                {totalItems > 0 && (
                  <span className="ml-2 hidden sm:inline text-[11px]">
                    (عرض {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                    {Math.min(currentPage * ITEMS_PER_PAGE, totalItems)} من {totalItems})
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs md:text-sm text-text-muted disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/10"
              >
                <span>التالي</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    d="M9 5l7 7-7 7"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Drawer الفلاتر */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-40 flex justify-end md:justify-center md:items-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsFilterDrawerOpen(false)}
          />
          <div className="relative w-full md:w-[460px] h-[80vh] md:h-[560px] bg-[#1a1a1a] mt-auto md:mt-0 md:rounded-2xl border-t md:border border-white/10 shadow-2xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <h3 className="text-base md:text-lg font-bold text-white">تصفية المنتجات</h3>
              <button
                type="button"
                onClick={() => setIsFilterDrawerOpen(false)}
                className="p-2 rounded-full bg-white/5 text-text-muted hover:text-white"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
              {/* البحث (للموبايل) */}
              <div className="md:hidden">
                <label className="block text-xs font-medium text-text-muted mb-1">بحث</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="اسم المنتج، الموديل، أو الكود..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 pr-9 text-sm text-white placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                  <span className="absolute inset-y-0 left-3 flex items-center">
                    <svg className="w-4 h-4 text-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              {/* الماركات */}
              {availableBrands.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-white">الماركة</h4>
                    {selectedBrand !== 'all' && (
                      <button
                        type="button"
                        onClick={() => setSelectedBrand('all')}
                        className="text-[11px] text-text-muted underline decoration-dotted hover:text-white"
                      >
                        مسح
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedBrand('all')}
                      className={`px-3 py-2 text-xs rounded-lg border text-right ${
                        selectedBrand === 'all'
                          ? 'bg-primary/20 border-primary text-primary'
                          : 'bg-white/5 border-white/5 text-text-muted hover:bg-white/10'
                      }`}
                    >
                      الكل
                    </button>
                    {availableBrands.map((brand) => (
                      <button
                        key={brand.id}
                        type="button"
                        onClick={() => setSelectedBrand(brand.id)}
                        className={`px-3 py-2 text-xs rounded-lg border text-right ${
                          selectedBrand === brand.id
                            ? 'bg-primary/20 border-primary text-primary'
                            : 'bg-white/5 border-white/5 text-text-muted hover:bg-white/10'
                        }`}
                      >
                        {brand.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* نطاق السعر */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-white">نطاق السعر (ريال)</h4>
                  {(minPrice || maxPrice) && (
                    <button
                      type="button"
                      onClick={() => {
                        setMinPrice('');
                        setMaxPrice('');
                      }}
                      className="text-[11px] text-text-muted underline decoration-dotted hover:text-white"
                    >
                      مسح
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] text-text-muted mb-1">من</label>
                    <input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-text-muted mb-1">إلى</label>
                    <input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                      placeholder="1000"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-white/10 flex items-center gap-2">
              <button
                type="button"
                onClick={resetFilters}
                className="flex-1 px-3 py-2 rounded-xl border border-white/15 bg-white/5 text-xs text-text-muted hover:bg-white/10"
              >
                إعادة تعيين
              </button>
              <button
                type="button"
                onClick={() => setIsFilterDrawerOpen(false)}
                className="flex-[2] px-3 py-2 rounded-xl bg-primary hover:bg-primary-dark text-xs md:text-sm text-white font-semibold shadow-lg shadow-primary/25"
              >
                عرض {filteredProducts.length} منتج
              </button>
            </div>
          </div>
        </div>
      )}

      <ScrollToTop />
    </div>
  );
}
