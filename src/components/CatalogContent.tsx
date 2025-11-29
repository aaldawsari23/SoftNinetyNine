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

  return (
    <div className="space-y-3">
      {/* Ultra Compact Filter Bar - 15% of Screen */}
      <div className="bg-white/5 backdrop-blur-md rounded-lg p-2 border border-white/10 sticky top-14 md:top-14 z-40">
        {/* Single Row: Search + Results + Clear */}
        <div className="flex items-center gap-2 mb-1.5">
          {/* Search Icon */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className={`p-1.5 rounded-lg transition-all flex-shrink-0 ${
              isSearchOpen || searchQuery
                ? 'bg-primary/20 text-primary'
                : 'text-text-muted hover:text-white'
            }`}
            aria-label="بحث"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Expandable Search Input */}
          {isSearchOpen && (
            <input
              type="text"
              placeholder="ابحث..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-background/50 text-white px-2 py-1 rounded text-xs border border-white/10 focus:border-primary/50 focus:outline-none"
              autoFocus
            />
          )}

          {/* Results Count */}
          {!isSearchOpen && (
            <div className="flex-1">
              <p className="text-xs text-text-muted">
                <span className="text-primary font-bold">{filteredProducts.length}</span> منتج
              </p>
            </div>
          )}

          {/* Clear Button */}
          {(selectedCategory !== 'all' || selectedBrand !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedBrand('all');
                setSearchQuery('');
                setIsSearchOpen(false);
              }}
              className="text-xs text-primary hover:text-primary/80 px-2 py-1 bg-primary/10 rounded flex-shrink-0"
            >
              مسح
            </button>
          )}
        </div>

        {/* Category Chips - Wrapped, No Scroll, Smart Toggle */}
        {availableCategories.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedBrand('all');
              }}
              className={`px-2.5 py-1 text-xs rounded-full transition-all whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'bg-background/50 text-text-muted border border-white/10 hover:text-white hover:border-primary/30'
              }`}
            >
              الكل
            </button>
            {availableCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  // Toggle behavior: click again to deselect
                  if (selectedCategory === cat.id) {
                    setSelectedCategory('all');
                    setSelectedBrand('all');
                  } else {
                    setSelectedCategory(cat.id);
                    setSelectedBrand('all');
                  }
                }}
                className={`px-2.5 py-1 text-xs rounded-full transition-all whitespace-nowrap group ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-background/50 text-text-muted border border-white/10 hover:text-white hover:border-primary/30'
                }`}
              >
                {cat.name_ar}
                {cat.count > 0 && (
                  <span className={`mr-1 ${selectedCategory === cat.id ? 'opacity-80' : 'opacity-60'}`}>
                    ({cat.count})
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Brand Chips - Only show when category is selected, Smart Toggle */}
        {selectedCategory !== 'all' && availableBrands.length > 1 && (
          <div className="flex flex-wrap gap-1.5 mt-1.5 animate-in slide-in-from-top-2 duration-200">
            <button
              onClick={() => setSelectedBrand('all')}
              className={`px-2.5 py-1 text-xs rounded-full transition-all whitespace-nowrap ${
                selectedBrand === 'all'
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'bg-background/50 text-text-muted border border-white/10 hover:text-white hover:border-primary/30'
              }`}
            >
              الكل
            </button>
            {availableBrands.map((brand) => (
              <button
                key={brand.id}
                onClick={() => {
                  // Toggle behavior: click again to deselect
                  setSelectedBrand(selectedBrand === brand.id ? 'all' : brand.id);
                }}
                className={`px-2.5 py-1 text-xs rounded-full transition-all whitespace-nowrap ${
                  selectedBrand === brand.id
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-background/50 text-text-muted border border-white/10 hover:text-white hover:border-primary/30'
                }`}
              >
                {brand.name}
                {brand.count > 0 && (
                  <span className={`mr-1 ${selectedBrand === brand.id ? 'opacity-80' : 'opacity-60'}`}>
                    ({brand.count})
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

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
