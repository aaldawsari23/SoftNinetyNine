'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import ProductGrid from '@/components/products/ProductGrid';
import { products, categories, brands } from '@/data/products';
import { ProductType } from '@/types';
import ScrollToTop from '@/components/ui/ScrollToTop';

const ITEMS_PER_PAGE = 20;

export default function CatalogContent() {
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
    let filtered = products.filter(p => p.status === 'published');

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category_id === selectedCategory);
    }

    if (selectedBrand !== 'all') {
      filtered = filtered.filter(p => p.brand_id === selectedBrand);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => {
        // Search in name and description
        const matchesNameOrDesc = p.name?.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query);

        // Search in SKU
        const matchesSku = p.sku?.toLowerCase().includes(query);

        // Search in model (from specifications)
        const matchesModel = p.specifications?.model?.toLowerCase().includes(query);

        // Search in brand name
        const brand = brands.find(b => b.id === p.brand_id);
        const matchesBrand = brand?.name.toLowerCase().includes(query);

        return matchesNameOrDesc || matchesSku || matchesModel || matchesBrand;
      });
    }

    return filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [selectedCategory, selectedBrand, searchQuery]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedBrand, searchQuery]);

  const availableCategories = useMemo(() => {
    return categories;
  }, []);

  // Optimized: Calculate available brands from base products, not filtered
  // This prevents unnecessary recalculation when filters change
  const availableBrands = useMemo(() => {
    const publishedProducts = products.filter(p => p.status === 'published');

    // If category is selected, only show brands that have products in that category
    if (selectedCategory !== 'all') {
      const brandIds = new Set(
        publishedProducts
          .filter(p => p.category_id === selectedCategory)
          .map(p => p.brand_id)
      );
      return brands.filter(b => brandIds.has(b.id));
    }

    // Otherwise show all brands that have published products
    const brandIds = new Set(publishedProducts.map(p => p.brand_id));
    return brands.filter(b => brandIds.has(b.id));
  }, [selectedCategory]);

  // Paginate the filtered products
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  return (
    <div className="space-y-4">
      {/* Modern Filter Bar with Chips */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3 md:p-4 border border-white/10">
        {/* Search */}
        <div className="relative mb-3">
          <input
            type="text"
            placeholder="ابحث عن منتج..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-background/50 text-white px-4 py-3 pr-11 rounded-xl border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Category Chips */}
        {availableCategories.length > 0 && (
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-text-muted font-semibold">الفئات:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 text-xs md:text-sm rounded-full transition-all duration-200 ${
                  selectedCategory === 'all'
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-background/50 text-text-muted border border-white/10 hover:border-primary/30 hover:text-white active:scale-95'
                }`}
              >
                الكل
              </button>
              {availableCategories.slice(0, 8).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs md:text-sm rounded-full transition-all duration-200 ${
                    selectedCategory === cat.id
                      ? 'bg-primary text-white shadow-lg shadow-primary/30'
                      : 'bg-background/50 text-text-muted border border-white/10 hover:border-primary/30 hover:text-white active:scale-95'
                  }`}
                >
                  {cat.name_ar}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Brand Chips */}
        {availableBrands.length > 1 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-text-muted font-semibold">العلامات التجارية:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedBrand('all')}
                className={`px-3 py-1.5 text-xs md:text-sm rounded-full transition-all duration-200 ${
                  selectedBrand === 'all'
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-background/50 text-text-muted border border-white/10 hover:border-primary/30 hover:text-white active:scale-95'
                }`}
              >
                الكل
              </button>
              {availableBrands.slice(0, 10).map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => setSelectedBrand(brand.id)}
                  className={`px-3 py-1.5 text-xs md:text-sm rounded-full transition-all duration-200 ${
                    selectedBrand === brand.id
                      ? 'bg-primary text-white shadow-lg shadow-primary/30'
                      : 'bg-background/50 text-text-muted border border-white/10 hover:border-primary/30 hover:text-white active:scale-95'
                  }`}
                >
                  {brand.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
          <p className="text-xs md:text-sm text-text-muted">
            <span className="text-primary font-bold">{filteredProducts.length}</span> منتج
          </p>
          {(selectedCategory !== 'all' || selectedBrand !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedBrand('all');
                setSearchQuery('');
              }}
              className="text-xs text-primary hover:text-primary/80 transition-colors"
            >
              مسح الفلاتر ✕
            </button>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <ProductGrid products={paginatedProducts} />

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
