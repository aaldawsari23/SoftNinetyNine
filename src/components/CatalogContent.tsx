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
    <div className="space-y-3">
      {/* ✨ MINIMAL Filter Bar - Only 5% of screen */}
      <div className="sticky top-14 md:top-14 z-40">
        <div className="flex items-center gap-2">
          {/* Filter Button with Badge */}
          <button
            onClick={() => setIsFilterDrawerOpen(true)}
            className="relative flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-lg border border-white/10 transition-all"
          >
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span className="text-xs text-white">فلتر</span>
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Search */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="ابحث عن منتج..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 text-white px-3 py-2 pr-9 rounded-lg text-sm border border-white/10 focus:border-primary/50 focus:bg-white/10 focus:outline-none transition-all"
            />
            <svg className="w-4 h-4 text-text-muted absolute right-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Results Count */}
          <div className="px-3 py-2 bg-white/5 backdrop-blur-md rounded-lg border border-white/10">
            <span className="text-primary font-bold text-sm">{filteredProducts.length}</span>
          </div>

          {/* Clear Button (only if filters active) */}
          {activeFiltersCount > 0 && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedBrand('all');
                setSearchQuery('');
              }}
              className="p-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-all"
              aria-label="مسح الفلاتر"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Active Filters Display (Chips) */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full text-xs">
                {availableCategories.find(c => c.id === selectedCategory)?.name_ar}
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedBrand('all');
                  }}
                  className="hover:bg-primary/30 rounded-full p-0.5"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
            {selectedBrand !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full text-xs">
                {availableBrands.find(b => b.id === selectedBrand)?.name}
                <button
                  onClick={() => setSelectedBrand('all')}
                  className="hover:bg-primary/30 rounded-full p-0.5"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* 🎯 Filter Drawer - Opens from bottom */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsFilterDrawerOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-full md:w-2/3 lg:w-1/2 bg-background border-t md:border border-white/20 md:rounded-2xl shadow-2xl max-h-[80vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom-full md:slide-in-from-bottom-0 md:zoom-in-95 duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                فلترة المنتجات
              </h3>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-all"
              >
                <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Categories Section */}
              {availableCategories.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-text-muted mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    التصنيفات
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setSelectedBrand('all');
                      }}
                      className={`p-3 rounded-lg border transition-all text-sm font-medium ${
                        selectedCategory === 'all'
                          ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30'
                          : 'bg-white/5 border-white/10 text-text-muted hover:border-primary/30 hover:bg-white/10'
                      }`}
                    >
                      <div>الكل</div>
                      <div className="text-xs mt-1 opacity-70">
                        {products.filter(p => p.status === 'published').length}
                      </div>
                    </button>
                    {availableCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          if (selectedCategory === cat.id) {
                            setSelectedCategory('all');
                            setSelectedBrand('all');
                          } else {
                            setSelectedCategory(cat.id);
                            setSelectedBrand('all');
                          }
                        }}
                        className={`p-3 rounded-lg border transition-all text-sm font-medium ${
                          selectedCategory === cat.id
                            ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30'
                            : 'bg-white/5 border-white/10 text-text-muted hover:border-primary/30 hover:bg-white/10'
                        }`}
                      >
                        <div>{cat.name_ar}</div>
                        <div className="text-xs mt-1 opacity-70">{cat.count}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Brands Section - Only show when category selected */}
              {selectedCategory !== 'all' && availableBrands.length > 0 && (
                <div className="animate-in slide-in-from-top-2 duration-300">
                  <h4 className="text-sm font-semibold text-text-muted mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    الماركات
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <button
                      onClick={() => setSelectedBrand('all')}
                      className={`p-3 rounded-lg border transition-all text-sm font-medium ${
                        selectedBrand === 'all'
                          ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30'
                          : 'bg-white/5 border-white/10 text-text-muted hover:border-primary/30 hover:bg-white/10'
                      }`}
                    >
                      <div>الكل</div>
                      <div className="text-xs mt-1 opacity-70">
                        {products.filter(p => p.status === 'published' && p.category_id === selectedCategory).length}
                      </div>
                    </button>
                    {availableBrands.map((brand) => (
                      <button
                        key={brand.id}
                        onClick={() => {
                          setSelectedBrand(selectedBrand === brand.id ? 'all' : brand.id);
                        }}
                        className={`p-3 rounded-lg border transition-all text-sm font-medium ${
                          selectedBrand === brand.id
                            ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30'
                            : 'bg-white/5 border-white/10 text-text-muted hover:border-primary/30 hover:bg-white/10'
                        }`}
                      >
                        <div>{brand.name}</div>
                        <div className="text-xs mt-1 opacity-70">{brand.count}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-white/10 flex gap-3">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedBrand('all');
                  setSearchQuery('');
                }}
                className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-text-muted border border-white/10 rounded-lg transition-all text-sm font-medium"
              >
                إعادة تعيين
              </button>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="flex-1 px-4 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg transition-all text-sm font-medium shadow-lg shadow-primary/30"
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
