'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import ProductGrid from '@/components/products/ProductGrid';
import { Product, Category, Brand } from '@/types';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { getDataProvider } from '@/lib/data-providers';
import { filterProducts, sortProducts, searchProducts, paginateProducts } from '@/utils/catalog';

const ITEMS_PER_PAGE = 20;

export default function CatalogContent() {
  const dataProvider = getDataProvider();

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Initialize from URL params
  const categoryParam = searchParams.get('category');
  const brandParam = searchParams.get('brand');
  const searchParam = searchParams.get('q');

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');
  const [selectedBrand, setSelectedBrand] = useState<string>(brandParam || 'all');
  const [searchQuery, setSearchQuery] = useState(searchParam || '');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // State for data from provider
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from provider on mount
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const [productsData, categoriesData, brandsData] = await Promise.all([
          dataProvider.getProducts({ status: 'published' }),
          dataProvider.getCategories(),
          dataProvider.getBrands(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
        setBrands(brandsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Update URL when filters change
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

    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

    router.replace(newUrl, { scroll: false });
  }, [selectedCategory, selectedBrand, searchQuery, pathname, router]);

  const filteredProducts = useMemo(() => {
    if (isLoading || products.length === 0) {
      return [];
    }

    // Apply filters using utility functions
    let filtered = filterProducts(products, {
      category: selectedCategory !== 'all' ? selectedCategory : undefined,
      brand: selectedBrand !== 'all' ? selectedBrand : undefined,
      search: searchQuery || undefined,
      status: 'published',
    });

    // Apply sorting - always newest first
    filtered = sortProducts(filtered, 'newest');

    return filtered;
  }, [products, selectedCategory, selectedBrand, searchQuery, isLoading]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedBrand, searchQuery]);

  // Smart filtering: Only show categories that have products
  const availableCategories = useMemo(() => {
    if (products.length === 0) return [];

    const publishedProducts = products.filter(p => p.status === 'published');
    const categoryIds = new Set(publishedProducts.map(p => p.category_id));

    return categories
      .filter(c => categoryIds.has(c.id))
      .map(c => ({
        ...c,
        count: publishedProducts.filter(p => p.category_id === c.id).length
      }));
  }, [categories, products]);

  // Optimized: Calculate available brands from base products, not filtered
  // This prevents unnecessary recalculation when filters change
  const availableBrands = useMemo(() => {
    if (products.length === 0) return [];

    const publishedProducts = products.filter(p => p.status === 'published');

    // If category is selected, only show brands that have products in that category
    if (selectedCategory !== 'all') {
      const brandIds = new Set(
        publishedProducts
          .filter(p => p.category_id === selectedCategory)
          .map(p => p.brand_id)
      );
      return brands
        .filter(b => brandIds.has(b.id))
        .map(b => ({
          ...b,
          count: publishedProducts.filter(p => p.brand_id === b.id && p.category_id === selectedCategory).length
        }));
    }

    // Otherwise show all brands that have published products
    const brandIds = new Set(publishedProducts.map(p => p.brand_id));
    return brands
      .filter(b => brandIds.has(b.id))
      .map(b => ({
        ...b,
        count: publishedProducts.filter(p => p.brand_id === b.id).length
      }));
  }, [selectedCategory, products, brands]);

  // Paginate the filtered products
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="mt-4 text-text-muted">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  // Count active filters
  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedBrand !== 'all' ? 1 : 0) +
    (searchQuery ? 1 : 0);

  return (
    <div className="space-y-4">
      {/* 🎯 Hybrid Filter Bar - Sticky Header */}
      <div className="sticky top-14 z-30 bg-background/95 backdrop-blur-md border-b border-white/5 pb-2 pt-2 -mx-4 px-4 shadow-sm">
        <div className="flex items-center gap-3">
          {/* 1. The Filter Trigger Button (Opens Drawer for Advanced Filters) */}
          <button
            onClick={() => setIsFilterDrawerOpen(true)}
            className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full border transition-all ${
              selectedBrand !== 'all' || searchQuery
                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                : 'bg-white/5 text-text-muted border-white/10 hover:bg-white/10'
            }`}
            aria-label="Filter"
          >
            <div className="relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              {(selectedBrand !== 'all' || searchQuery) && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full border-2 border-[#121212] flex items-center justify-center text-[8px] font-bold">
                  !
                </span>
              )}
            </div>
          </button>

          {/* Vertical Divider */}
          <div className="w-px h-6 bg-white/10 flex-shrink-0" />

          {/* 2. Horizontal Scroll for Main Categories (Quick Access - No Drawer Needed!) */}
          <div className="flex-1 overflow-x-auto whitespace-nowrap scrollbar-hide flex items-center gap-2 pr-1">
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedBrand('all');
              }}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all border ${
                selectedCategory === 'all'
                  ? 'bg-white text-black border-white shadow-md'
                  : 'bg-white/5 text-text-muted border-transparent hover:bg-white/10'
              }`}
            >
              الكل
            </button>
            {availableCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSelectedBrand('all');
                }}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all border ${
                  selectedCategory === cat.id
                    ? 'bg-white text-black border-white shadow-md'
                    : 'bg-white/5 text-text-muted border-transparent hover:bg-white/10'
                }`}
              >
                {cat.name_ar}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Active Filters Chips (Only shows when advanced filters are active) */}
        {(selectedBrand !== 'all' || searchQuery) && (
          <div className="flex flex-wrap gap-2 mt-3 pt-2 border-t border-white/5 animate-in slide-in-from-top-2 fade-in duration-200">
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded border border-primary/20 hover:bg-primary/20 transition-colors"
              >
                <span>بحث: {searchQuery}</span>
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
            {selectedBrand !== 'all' && (
              <button
                onClick={() => setSelectedBrand('all')}
                className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded border border-primary/20 hover:bg-primary/20 transition-colors"
              >
                <span>{availableBrands.find(b => b.id === selectedBrand)?.name || 'ماركة'}</span>
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
            <button
              onClick={() => {
                setSelectedBrand('all');
                setSearchQuery('');
              }}
              className="text-xs text-text-muted underline decoration-dotted hover:text-white px-1 transition-colors"
            >
              مسح الكل
            </button>
          </div>
        )}
      </div>

      {/* 🎯 The Advanced Filter Drawer (Mobile Bottom Sheet / Desktop Modal) */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end sm:justify-center sm:items-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsFilterDrawerOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-full sm:w-[500px] h-[85vh] sm:h-[600px] bg-[#1a1a1a] mt-auto sm:mt-0 sm:rounded-2xl border-t sm:border border-white/10 shadow-2xl flex flex-col transform transition-transform duration-300 ease-out animate-in slide-in-from-bottom">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="text-lg font-bold text-white">تصفية متقدمة</h3>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="p-2 text-text-muted hover:text-white bg-white/5 rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Drawer Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Search within Drawer */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="ابحث عن اسم المنتج..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-10 text-white placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
                <svg className="w-5 h-5 text-text-muted absolute left-3 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Brands Section */}
              {availableBrands.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-white mb-3">الماركة</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedBrand('all')}
                      className={`px-3 py-2 text-sm rounded-lg border transition-all text-right ${
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
                        onClick={() => setSelectedBrand(brand.id)}
                        className={`px-3 py-2 text-sm rounded-lg border transition-all text-right ${
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
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-white/10 bg-[#1a1a1a]">
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/20 transition-all"
              >
                عرض {filteredProducts.length} منتج
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid or Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/10 text-center">
          <div className="max-w-md mx-auto">
            <svg className="w-20 h-20 mx-auto mb-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="text-xl font-bold text-white mb-2">لا توجد منتجات</h3>
            <p className="text-text-secondary text-sm mb-6">
              {searchQuery
                ? `لم نجد نتائج للبحث "${searchQuery}"`
                : selectedCategory !== 'all' || selectedBrand !== 'all'
                ? 'لا توجد منتجات في هذا التصنيف حالياً'
                : 'لا توجد منتجات متاحة حالياً'}
            </p>
            {(selectedCategory !== 'all' || selectedBrand !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedBrand('all');
                  setSearchQuery('');
                  setIsSearchOpen(false);
                }}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 active:scale-95"
              >
                إعادة تعيين الفلاتر
              </button>
            )}
          </div>
        </div>
      ) : (
        <ProductGrid products={paginatedProducts} />
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
          <div className="flex items-center justify-between gap-4">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                currentPage === 1
                  ? 'bg-background/30 text-text-muted cursor-not-allowed opacity-50'
                  : 'bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 hover:shadow-lg hover:shadow-primary/20 active:scale-95'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-semibold">السابق</span>
            </button>

            {/* Page Info */}
            <div className="text-center">
              <p className="text-sm text-text-muted">
                صفحة <span className="text-primary font-bold text-lg mx-1">{currentPage}</span>
                من <span className="text-primary font-bold text-lg mx-1">{totalPages}</span>
              </p>
              <p className="text-xs text-text-muted mt-1">
                عرض {((currentPage - 1) * ITEMS_PER_PAGE) + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} من {filteredProducts.length}
              </p>
            </div>

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                currentPage === totalPages
                  ? 'bg-background/30 text-text-muted cursor-not-allowed opacity-50'
                  : 'bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 hover:shadow-lg hover:shadow-primary/20 active:scale-95'
              }`}
            >
              <span className="text-sm font-semibold">التالي</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Page Number Pills (for desktop) */}
          {totalPages <= 10 && (
            <div className="hidden md:flex items-center justify-center gap-2 mt-4 pt-4 border-t border-white/10">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg transition-all duration-200 ${
                    currentPage === page
                      ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-110'
                      : 'bg-background/50 text-text-muted border border-white/10 hover:border-primary/30 hover:text-white active:scale-95'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}
