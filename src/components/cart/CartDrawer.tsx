import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Tag,
  CheckCircle,
  Truck,
  MessageCircle
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    subtotal,
    discountAmount,
    shippingFee,
    grandTotal,
    settings,
    setIsCheckoutOpen,
    selectedCity,
    setSelectedCity,
    shippingRates
  } = useStore();

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponCodeInput.trim()) return;
    const res = applyCoupon(couponCodeInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponCodeInput('');
    }
  };

  const amountNeededForFreeShipping = Math.max(0, settings.freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / settings.freeShippingThreshold) * 100));

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;
    const itemsList = cart
      .map(
        i =>
          `• ${i.product.name} ${i.variantName ? `(${i.variantName})` : ''} x ${i.quantity} = Rs. ${(i.price * i.quantity).toLocaleString()}`
      )
      .join('\n');

    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const msg = `Assalam-o-Alaikum! I want to order via WhatsApp:\n\n${itemsList}\n\n*Destination City:* ${selectedCity}\n*Total PKR:* Rs. ${grandTotal.toLocaleString()}\n*Payment Method:* Cash on Delivery (COD)\n\nPlease process my order!`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-950" />
            <h3 className="font-display text-base font-bold text-stone-900">
              Shopping Cart ({cart.reduce((sum, i) => sum + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-emerald-50/70 p-3 px-5 border-b border-emerald-100 text-xs">
          {amountNeededForFreeShipping > 0 ? (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between font-medium text-emerald-900">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5" />
                  Add Rs. {amountNeededForFreeShipping.toLocaleString()} for Free Shipping
                </span>
                <span className="font-mono">{freeShippingProgress}%</span>
              </div>
              <div className="w-full bg-emerald-200/80 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-emerald-800 h-full rounded-full transition-all duration-300"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 font-bold text-emerald-900">
              <CheckCircle className="w-4 h-4 text-emerald-700" />
              <span>Congratulations! Free Nationwide Shipping Unlocked!</span>
            </div>
          )}
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500">
              <ShoppingBag className="w-12 h-12 text-stone-300 mb-3 stroke-[1.5]" />
              <p className="font-display text-base font-semibold text-stone-800">Your cart is empty</p>
              <p className="text-xs text-stone-500 mt-1 max-w-xs">
                Explore our authentic Charsadda chappals, Sindhi Ajrak, and Sialkot willow sports gear.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-5 px-5 py-2.5 bg-emerald-950 text-white rounded-lg text-xs font-semibold hover:bg-emerald-900 transition-colors cursor-pointer"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div
                key={`${item.productId}-${item.variantId || 'base'}`}
                className="p-3 rounded-xl border border-stone-200 bg-stone-50/50 flex gap-3 items-center"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 object-cover rounded-lg bg-stone-200 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-stone-900 truncate">
                    {item.product.name}
                  </h4>
                  {item.variantName && (
                    <p className="text-[11px] text-amber-800 font-medium truncate">
                      {item.variantName}
                    </p>
                  )}
                  <p className="font-mono tabular-nums text-xs font-bold text-stone-900 mt-0.5">
                    Rs. {item.price.toLocaleString()}
                  </p>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border border-stone-300 rounded bg-white overflow-hidden">
                      <button
                        onClick={() =>
                          updateCartQuantity(item.productId, item.quantity - 1, item.variantId)
                        }
                        className="px-2 py-0.5 text-stone-600 hover:bg-stone-100 text-xs cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 font-mono text-xs font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateCartQuantity(item.productId, item.quantity + 1, item.variantId)
                        }
                        className="px-2 py-0.5 text-stone-600 hover:bg-stone-100 text-xs cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.productId, item.variantId)}
                      className="text-stone-400 hover:text-rose-600 p-1 cursor-pointer transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono tabular-nums text-xs font-bold text-emerald-950">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Area */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 space-y-3">
            {/* Coupon Code Section */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2 bg-emerald-100/70 border border-emerald-300 rounded-lg text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-900 font-semibold">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Coupon: {appliedCoupon.code}</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-stone-500 hover:text-stone-800 text-[11px] underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-1">
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={couponCodeInput}
                      onChange={e => setCouponCodeInput(e.target.value)}
                      placeholder="Coupon Code (e.g. WELCOME10)"
                      className="flex-1 px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs uppercase font-mono focus:outline-none focus:ring-1 focus:ring-emerald-800"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-[11px] text-rose-600 font-medium">{couponError}</p>
                  )}
                  <p className="text-[10px] text-stone-400">
                    Available vouchers: <code className="text-amber-800 font-bold">WELCOME10</code>, <code className="text-amber-800 font-bold">AZADI20</code>
                  </p>
                </form>
              )}
            </div>

            {/* City Selection for live shipping calculation */}
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-stone-600 font-medium">Destination City:</span>
              <select
                value={selectedCity}
                onChange={e => setSelectedCity(e.target.value)}
                className="bg-white border border-stone-300 rounded px-2 py-1 text-xs text-stone-800 cursor-pointer"
              >
                {shippingRates.map(c => (
                  <option key={c.city} value={c.city}>
                    {c.city}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-200">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums text-stone-900 font-semibold">
                  Rs. {subtotal.toLocaleString()}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Voucher Discount</span>
                  <span className="font-mono tabular-nums">-Rs. {discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping ({selectedCity})</span>
                <span className="font-mono tabular-nums text-stone-900 font-semibold">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700 font-bold">FREE</span>
                  ) : (
                    `Rs. ${shippingFee.toLocaleString()}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-sm font-bold text-stone-950 pt-2 border-t border-stone-300">
                <span>Total (PKR)</span>
                <span className="font-mono tabular-nums text-base text-emerald-950">
                  Rs. {grandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 space-y-2">
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3 bg-emerald-950 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm Order via WhatsApp</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
