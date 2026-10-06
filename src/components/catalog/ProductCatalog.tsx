import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../product/ProductCard';
import {
  SlidersHorizontal,
  Search,
  X,
  RotateCcw,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';

export const ProductCatalog: React.FC = () => {
  const {
    products,
    categories,
    searchQuery,
    setSearchQuery,
    selectedCategoryFilter,
    setSelectedCategoryFilter
  } = useStore();

  const [selectedOrigin, setSelectedOrigin] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(25000);

  // Available unique cities
  const cities = useMemo(() => {
    const list = new Set(products.map(p => p.originCity));
    return Array.from(list);
  }, [products]);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchSku = p.sku.toLowerCase().includes(q);
          const matchBrand = p.brand.toLowerCase().includes(q);
          const matchTags = p.tags.some(t => t.toLowerCase().includes(q));
          if (!matchName && !matchSku && !matchBrand && !matchTags) return false;
        }

        // Category filter
        if (selectedCategoryFilter && p.category !== selectedCategoryFilter) {
          return false;
        }

        // Origin filter
        if (selectedOrigin !== 'all' && p.originCity !== selectedOrigin) {
          return false;
        }

        // In stock only
        if (inStockOnly && p.stock <= 0) {
          return false;
        }

        // Max price
        if (p.price > maxPrice) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return b.id.localeCompare(a.id);
        return 0; // featured default
      });
  }, [products, searchQuery, selectedCategoryFilter, selectedOrigin, inStockOnly, maxPrice, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategoryFilter('');
    setSelectedOrigin('all');
    setInStockOnly(false);
    setMaxPrice(25000);
    setSortBy('featured');
  };

  return (
    <div className="py-10 bg-[#FBFBFA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              Complete Storefront
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              {selectedCategoryFilter || 'All Pakistani Craftsmanship'}
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Showing {filteredProducts.length} items with Cash on Delivery nationwide
            </p>
          </div>

          {/* Search bar inside catalog */}
          <div className="flex items-center gap-2 max-w-sm w-full">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search catalog..."
                className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 rounded-lg text-xs focus:ring-1 focus:ring-emerald-800"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-2 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 2-Column Catalog: Filters Sidebar + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Filters Sidebar (3 cols) */}
          <div className="lg:col-span-3 bg-white rounded-xl border border-stone-200 p-5 space-y-6 text-xs shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <span className="font-bold text-stone-900 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Filters
              </span>
              <button
                onClick={handleResetFilters}
                className="text-stone-500 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Category Selector */}
            <div className="space-y-2">
              <span className="font-bold text-stone-800 block">Category</span>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategoryFilter('')}
                  className={`w-full text-left py-1.5 px-2 rounded transition-colors cursor-pointer ${
                    selectedCategoryFilter === ''
                      ? 'bg-emerald-950 text-white font-bold'
                      : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  All Categories ({products.length})
                </button>
                {categories.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategoryFilter(c.name)}
                    className={`w-full text-left py-1.5 px-2 rounded transition-colors cursor-pointer ${
                      selectedCategoryFilter === c.name
                        ? 'bg-emerald-950 text-white font-bold'
                        : 'text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-2 pt-3 border-t border-stone-100">
              <div className="flex justify-between items-center font-bold text-stone-800">
                <span>Max Price (PKR)</span>
                <span className="font-mono text-emerald-950">Rs. {maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={2000}
                max={25000}
                step={500}
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full accent-emerald-950 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                <span>Rs. 2,000</span>
                <span>Rs. 25,000</span>
              </div>
            </div>

            {/* Regional Origin Filter */}
            <div className="space-y-2 pt-3 border-t border-stone-100">
              <span className="font-bold text-stone-800 block">Artisan Craft Origin</span>
              <select
                value={selectedOrigin}
                onChange={e => setSelectedOrigin(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded text-xs cursor-pointer"
              >
                <option value="all">All Pakistani Cities</option>
                {cities.map(cty => (
                  <option key={cty} value={cty}>{cty}</option>
                ))}
              </select>
            </div>

            {/* Availability */}
            <div className="pt-3 border-t border-stone-100">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-stone-700">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={e => setInStockOnly(e.target.checked)}
                  className="rounded text-emerald-900"
                />
                <span>In Stock Only</span>
              </label>
            </div>
          </div>

          {/* Products Column (9 cols) */}
          <div className="lg:col-span-9 space-y-6">
            {/* Sort bar */}
            <div className="bg-white p-3.5 rounded-xl border border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-stone-500 font-medium">
                {filteredProducts.length} items found
              </span>

              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
                <span className="text-stone-600 font-semibold">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className="px-2.5 py-1 bg-stone-50 border border-stone-300 rounded text-xs cursor-pointer font-medium"
                >
                  <option value="featured">Featured Collection</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Customer Rating</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl border border-stone-200 p-12 text-center text-stone-500 space-y-3">
                <Sparkles className="w-10 h-10 text-stone-300 mx-auto" />
                <h3 className="font-semibold text-stone-800 text-sm">No products found</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Try clearing your search keyword or relaxing price and category filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-emerald-950 text-white rounded-lg text-xs font-semibold hover:bg-emerald-900 cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
