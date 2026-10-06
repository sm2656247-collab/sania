import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  X,
  Star,
  Check,
  Truck,
  ShieldCheck,
  RefreshCw,
  Heart,
  ShoppingBag,
  MessageCircle,
  Share2,
  ChevronRight
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProductId,
    setSelectedProductId,
    products,
    addToCart,
    wishlist,
    toggleWishlist,
    setIsCartOpen,
    shippingRates,
    selectedCity,
    setSelectedCity,
    reviews,
    addReview,
    settings,
    currentUser
  } = useStore();

  const product = products.find(p => p.id === selectedProductId);

  // Variant & Purchase State
  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(
    product?.variants && product.variants.length > 0 ? product.variants[0].id : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews' | 'shipping'>('specs');

  // Review Form State
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [reviewerName, setReviewerName] = useState(currentUser?.name || '');
  const [reviewerCity, setReviewerCity] = useState('Lahore');
  const [showReviewForm, setShowReviewForm] = useState(false);

  if (!product) return null;

  const isSaved = wishlist.includes(product.id);
  const productReviews = reviews.filter(r => r.productId === product.id);

  // Find active variant
  const activeVariant = product.variants?.find(v => v.id === selectedVariantId);
  const finalPrice = product.price + (activeVariant?.priceDelta || 0);
  const currentStock = activeVariant ? activeVariant.stock : product.stock;

  // City Shipping Calculator
  const matchedCityRate = shippingRates.find(c => c.city.toLowerCase() === selectedCity.toLowerCase());
  const calculatedShippingFee =
    finalPrice >= settings.freeShippingThreshold ? 0 : matchedCityRate?.rate || settings.defaultShippingRate;

  const handleAddToCart = () => {
    addToCart(product, selectedVariantId, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedVariantId, quantity);
    setSelectedProductId(null);
    setIsCartOpen(true);
  };

  const handleOrderViaWhatsApp = () => {
    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const variantText = activeVariant ? ` (Variant: ${activeVariant.name})` : '';
    const text = encodeURIComponent(
      `Assalam-o-Alaikum KhaasBazaar! I want to order:\n\n*Product:* ${product.name}${variantText}\n*Price:* Rs. ${finalPrice.toLocaleString()} PKR\n*Quantity:* ${quantity}\n*City:* ${selectedCity}\n\nPlease confirm availability and Cash on Delivery.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    addReview(
      product.id,
      newRating,
      newComment.trim(),
      reviewerName.trim() || 'Verified Customer',
      reviewerCity
    );
    setNewComment('');
    setShowReviewForm(false);
  };

  // Related products
  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95">
        {/* Close Button */}
        <button
          onClick={() => setSelectedProductId(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer shadow-xs"
          aria-label="Close product details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-4 sm:p-8">
          {/* Breadcrumb unboxed */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-6">
            <span>Home</span>
            <ChevronRight className="w-3 h-3 text-stone-400" />
            <span>{product.category}</span>
            <ChevronRight className="w-3 h-3 text-stone-400" />
            <span className="text-stone-900 font-medium truncate max-w-xs">{product.name}</span>
          </div>

          {/* Contiguous PDP Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Gallery (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              {/* Main Image Display */}
              <div className="relative aspect-4/3 rounded-xl bg-stone-100 overflow-hidden border border-stone-200/80">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                <span className="absolute bottom-3 left-3 bg-stone-900/80 text-white text-[11px] font-medium px-2.5 py-1 rounded backdrop-blur-xs">
                  Handcrafted in {product.originCity}, Pakistan
                </span>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-20 h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImageIndex === idx ? 'border-emerald-800 ring-2 ring-emerald-800/20' : 'border-stone-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt="thumbnail"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Pakistani Artisan Trust Callout */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/70 text-xs space-y-2">
                <div className="flex items-center gap-2 text-emerald-900 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Khaas Quality Guarantee</span>
                </div>
                <p className="text-stone-600 leading-relaxed">
                  Every piece is verified by our master inspectors for leather density, stitching tension, and dye fastness before packaging.
                </p>
              </div>
            </div>

            {/* Right Column: Contiguous Purchase Module (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                {/* Brand & Rating */}
                <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
                  <span className="uppercase tracking-widest font-semibold text-amber-800">
                    {product.brand} · SKU: {activeVariant?.sku || product.sku}
                  </span>
                  <div className="flex items-center gap-1 text-stone-700">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-mono font-bold">{product.rating}</span>
                    <span className="text-stone-400">({product.reviewCount} reviews)</span>
                  </div>
                </div>

                <h1 className="font-display text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
                  {product.name}
                </h1>

                {/* Price Display */}
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="font-mono tabular-nums text-2xl sm:text-3xl font-bold text-stone-950">
                    Rs. {finalPrice.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="font-mono tabular-nums text-base text-stone-400 line-through">
                      Rs. {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="text-xs font-mono font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      Save Rs. {(product.originalPrice - finalPrice).toLocaleString()}
                    </span>
                  )}
                </div>

                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  {product.shortDescription}
                </p>
              </div>

              {/* Stock Indicator */}
              <div className="flex items-center gap-2 text-xs">
                {currentStock > 0 ? (
                  <span className="text-emerald-700 font-medium flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                    In Stock ({currentStock} available in warehouse)
                  </span>
                ) : (
                  <span className="text-rose-600 font-medium">Currently Out of Stock</span>
                )}
                <span className="text-stone-300">|</span>
                <span className="text-stone-500">Cash on Delivery Available</span>
              </div>

              {/* Variants Selector */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-2.5 pt-2 border-t border-stone-100">
                  <label className="block text-xs font-semibold text-stone-800">
                    Select Size / Option:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map(v => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariantId(v.id)}
                        className={`px-3.5 py-2 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                          selectedVariantId === v.id
                            ? 'border-emerald-900 bg-emerald-950 text-white shadow-xs'
                            : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800'
                        }`}
                      >
                        <span>{v.name}</span>
                        {v.stock <= 3 && (
                          <span className="block text-[10px] text-amber-300 font-mono">
                            Only {v.stock} left
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Actions */}
              <div className="pt-2 border-t border-stone-100 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-white">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-stone-600 hover:bg-stone-100 text-sm font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-3 py-2 text-xs font-mono font-bold text-stone-900 min-w-[2.5rem] text-center">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                      className="px-3 py-2 text-stone-600 hover:bg-stone-100 text-sm font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    disabled={currentStock <= 0}
                    className="flex-1 py-3 px-4 bg-emerald-950 hover:bg-emerald-900 disabled:bg-stone-300 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                      isSaved
                        ? 'border-amber-600 bg-amber-50 text-amber-700'
                        : 'border-stone-300 hover:bg-stone-50 text-stone-700'
                    }`}
                    title="Add to Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Buy Now & WhatsApp Ordering */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    onClick={handleBuyNow}
                    disabled={currentStock <= 0}
                    className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 disabled:bg-stone-300 text-stone-950 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    Instant Checkout
                  </button>

                  <button
                    onClick={handleOrderViaWhatsApp}
                    className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Order on WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Pakistani City Shipping Estimator */}
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-semibold text-stone-800">
                    <Truck className="w-4 h-4 text-emerald-800" />
                    <span>Estimated Delivery Calculator:</span>
                  </div>
                  <select
                    value={selectedCity}
                    onChange={e => setSelectedCity(e.target.value)}
                    className="bg-white border border-stone-300 rounded px-2 py-1 text-xs font-medium text-stone-800 focus:outline-none focus:ring-1 focus:ring-emerald-800 cursor-pointer"
                  >
                    {shippingRates.map(c => (
                      <option key={c.city} value={c.city}>
                        {c.city} ({c.province})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-between text-stone-600 pt-1 border-t border-stone-200/60">
                  <span>
                    Courier: {matchedCityRate?.province === 'Punjab' ? 'TCS Pakistan' : 'Trax Logistics'} ({matchedCityRate?.estimatedDays || '2-3 Days'})
                  </span>
                  <span className="font-mono font-bold text-stone-900">
                    {calculatedShippingFee === 0 ? (
                      <span className="text-emerald-700">FREE SHIPPING</span>
                    ) : (
                      `Rs. ${calculatedShippingFee}`
                    )}
                  </span>
                </div>
              </div>

              {/* 3 Pillars of trust */}
              <div className="grid grid-cols-3 gap-2 text-center text-[11px] text-stone-600 pt-1">
                <div className="p-2 bg-stone-50 rounded-lg border border-stone-200/60">
                  <span className="font-bold block text-stone-900">7 Days</span>
                  <span>Easy Returns</span>
                </div>
                <div className="p-2 bg-stone-50 rounded-lg border border-stone-200/60">
                  <span className="font-bold block text-stone-900">100% COD</span>
                  <span>Pay on Delivery</span>
                </div>
                <div className="p-2 bg-stone-50 rounded-lg border border-stone-200/60">
                  <span className="font-bold block text-stone-900">Genuine</span>
                  <span>Artisan Origin</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Tabs: Specifications, Reviews, Shipping Info */}
          <div className="mt-10 pt-8 border-t border-stone-200">
            {/* Tabs Header */}
            <div className="flex items-center gap-6 border-b border-stone-200 pb-3 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-3 -mb-3 transition-colors cursor-pointer ${
                  activeTab === 'specs'
                    ? 'text-emerald-950 border-b-2 border-emerald-950'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                Specifications & Features
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 -mb-3 transition-colors cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'text-emerald-950 border-b-2 border-emerald-950'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                Customer Reviews ({productReviews.length})
              </button>
              <button
                onClick={() => setActiveTab('shipping')}
                className={`pb-3 -mb-3 transition-colors cursor-pointer ${
                  activeTab === 'shipping'
                    ? 'text-emerald-950 border-b-2 border-emerald-950'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                Delivery & 7-Day Returns
              </button>
            </div>

            {/* Tab 1: Specs */}
            {activeTab === 'specs' && (
              <div className="py-6 space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-2">
                    Detailed Description
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed max-w-3xl">
                    {product.description}
                  </p>
                </div>

                {/* Key features bullet points */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-2">
                    Key Features
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Specs Table */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-2">
                    Material & Construction Specifications
                  </h4>
                  <div className="bg-stone-50 rounded-xl border border-stone-200 overflow-hidden max-w-2xl">
                    <table className="w-full text-xs text-left">
                      <tbody>
                        {Object.entries(product.specs).map(([k, val], i) => (
                          <tr key={k} className={i % 2 === 0 ? 'bg-white' : 'bg-stone-50'}>
                            <td className="py-2.5 px-4 font-medium text-stone-600 border-r border-stone-200/80 w-1/3">
                              {k}
                            </td>
                            <td className="py-2.5 px-4 text-stone-900 font-medium">{val}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Reviews */}
            {activeTab === 'reviews' && (
              <div className="py-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-stone-900">
                      Product Ratings & Customer Experiences
                    </h4>
                    <p className="text-xs text-stone-500">
                      Average {product.rating} / 5.0 based on verified purchases.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="px-4 py-2 bg-emerald-950 text-white rounded-lg text-xs font-semibold hover:bg-emerald-900 cursor-pointer"
                  >
                    {showReviewForm ? 'Cancel Review' : 'Write a Review'}
                  </button>
                </div>

                {/* Write Review Form */}
                {showReviewForm && (
                  <form onSubmit={handleSubmitReview} className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3 max-w-xl">
                    <h5 className="text-xs font-bold text-stone-900 uppercase">Share Your Experience</h5>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 mb-1">Your Name</label>
                        <input
                          type="text"
                          value={reviewerName}
                          onChange={e => setReviewerName(e.target.value)}
                          placeholder="e.g. Asad Rauf"
                          className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded text-xs"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 mb-1">City</label>
                        <input
                          type="text"
                          value={reviewerCity}
                          onChange={e => setReviewerCity(e.target.value)}
                          placeholder="e.g. Karachi"
                          className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded text-xs"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">Rating</label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewRating(star)}
                            className="p-1 cursor-pointer"
                          >
                            <Star
                              className={`w-5 h-5 ${
                                star <= newRating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-stone-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">Review Details</label>
                      <textarea
                        rows={3}
                        value={newComment}
                        onChange={e => setNewComment(e.target.value)}
                        placeholder="Describe the material quality, fitting, and delivery experience..."
                        className="w-full p-2.5 bg-white border border-stone-300 rounded text-xs"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-950 text-white rounded text-xs font-bold hover:bg-emerald-800 cursor-pointer"
                    >
                      Submit Verified Review
                    </button>
                  </form>
                )}

                {/* Reviews List */}
                <div className="space-y-4">
                  {productReviews.length === 0 ? (
                    <p className="text-xs text-stone-500 py-4">No reviews yet for this product. Be the first to review!</p>
                  ) : (
                    productReviews.map(rev => (
                      <div key={rev.id} className="p-4 bg-white rounded-xl border border-stone-200 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-stone-900">{rev.userName}</span>
                            <span className="text-stone-400">·</span>
                            <span className="text-stone-500">{rev.city}</span>
                            {rev.verifiedPurchase && (
                              <span className="text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">
                                Verified Purchase
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] font-mono text-stone-400">{rev.date}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>

                        <p className="text-xs text-stone-700 leading-relaxed">{rev.comment}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Tab 3: Shipping */}
            {activeTab === 'shipping' && (
              <div className="py-6 space-y-4 text-xs text-stone-700">
                <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200/60 space-y-2">
                  <h4 className="font-bold text-emerald-950 text-sm">Pakistani Shipping Terms</h4>
                  <p>
                    Orders are processed within 24 hours from our centralized fulfillment hub in Lahore. We deliver across Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan, Islamabad, and Azad Kashmir via TCS and Trax courier partners.
                  </p>
                  <p className="font-semibold text-emerald-900">
                    Standard Rates: Lahore (Rs. 150), Islamabad/Rawalpindi (Rs. 180), Karachi (Rs. 220), Other Cities (Rs. 200–260). Free shipping applies automatically for orders above Rs. {settings.freeShippingThreshold.toLocaleString()}.
                  </p>
                </div>

                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                  <h4 className="font-bold text-stone-900 text-sm">7-Day Return & Size Exchange Policy</h4>
                  <p>
                    If the size doesn’t fit, simply WhatsApp us at {settings.whatsappNumber} or submit a return request from your customer dashboard. We arrange reverse pickup or exchange at zero additional cost for genuine size mismatches.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Related Products Carousel/Row */}
          {relatedProducts.length > 0 && (
            <div className="mt-10 pt-8 border-t border-stone-200">
              <h4 className="font-display text-lg font-bold text-stone-900 mb-4">
                You May Also Like
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map(rel => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      setSelectedProductId(rel.id);
                      setActiveImageIndex(0);
                    }}
                    className="p-3 bg-stone-50 rounded-xl border border-stone-200 hover:border-emerald-800 transition-colors cursor-pointer flex items-center gap-3"
                  >
                    <img
                      src={rel.images[0]}
                      alt={rel.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 object-cover rounded-lg bg-stone-200"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-stone-900 truncate">{rel.name}</p>
                      <p className="font-mono text-xs font-bold text-emerald-900 mt-0.5">
                        Rs. {rel.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
