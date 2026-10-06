import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { PaymentMethod, Order } from '../../types';
import {
  X,
  ShieldCheck,
  Truck,
  CreditCard,
  Building,
  Smartphone,
  CheckCircle2,
  FileText,
  ArrowRight
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotal,
    discountAmount,
    shippingFee,
    grandTotal,
    selectedCity,
    setSelectedCity,
    shippingRates,
    placeOrder,
    setPrintableOrder,
    setTrackingOrderId,
    settings,
    currentUser
  } = useStore();

  // Customer Contact & Address Form
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '0300');
  const [province, setProvince] = useState('Punjab');
  const [area, setArea] = useState('Gulberg III');
  const [addressLine, setAddressLine] = useState('House 24, Street 12');
  const [postalCode, setPostalCode] = useState('54000');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('COD');
  const [walletPhone, setWalletPhone] = useState(currentUser?.phone || '03001234567');
  const [bankTxnId, setBankTxnId] = useState('');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('821');

  // Order Placement State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  if (!isCheckoutOpen) return null;

  const handleCityChange = (newCity: string) => {
    setSelectedCity(newCity);
    const matched = shippingRates.find(c => c.city.toLowerCase() === newCity.toLowerCase());
    if (matched) {
      setProvince(matched.province);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);
    try {
      const order = await placeOrder({
        customerName: name,
        customerEmail: email || `${phone}@customer.pk`,
        customerPhone: phone,
        address: {
          province,
          city: selectedCity,
          area,
          addressLine,
          postalCode,
          deliveryInstructions
        },
        paymentMethod
      });

      setPlacedOrder(order);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinish = () => {
    setPlacedOrder(null);
    setIsCheckoutOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 relative animate-in fade-in">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-stone-200 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xs z-10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-800" />
            <h2 className="font-display text-lg font-bold text-stone-900">
              {placedOrder ? 'Order Confirmed' : 'Secure Pakistani Checkout'}
            </h2>
          </div>
          <button
            onClick={handleFinish}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {placedOrder ? (
          /* Order Confirmation Success State */
          <div className="p-6 sm:p-10 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <p className="text-xs uppercase font-bold tracking-widest text-emerald-800">
                Shukriya! Order Placed Successfully
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
                Order Number: {placedOrder.id}
              </h3>
              <p className="text-xs text-stone-600 mt-2 max-w-md mx-auto">
                We have received your order. Our team in Lahore is preparing your parcel for dispatch via {placedOrder.courierName}.
              </p>
            </div>

            {/* Order snapshot card */}
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between py-1 border-b border-stone-200/80">
                <span className="text-stone-500">Recipient:</span>
                <span className="font-semibold text-stone-900">{placedOrder.customerName} ({placedOrder.customerPhone})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200/80">
                <span className="text-stone-500">Delivery Address:</span>
                <span className="font-semibold text-stone-900 text-right">{placedOrder.shippingAddress.addressLine}, {placedOrder.shippingAddress.city}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200/80">
                <span className="text-stone-500">Payment:</span>
                <span className="font-bold text-emerald-900">{placedOrder.paymentMethod} (Rs. {placedOrder.total.toLocaleString()})</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-stone-500">Courier Tracking:</span>
                <span className="font-mono font-bold text-stone-900">{placedOrder.trackingNumber}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setPrintableOrder(placedOrder);
                }}
                className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>View & Print Tax Invoice</span>
              </button>

              <button
                onClick={() => {
                  setTrackingOrderId(placedOrder.id);
                  handleFinish();
                }}
                className="px-5 py-2.5 bg-emerald-950 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer"
              >
                <Truck className="w-4 h-4" />
                <span>Track Parcel Live</span>
              </button>

              <button
                onClick={handleFinish}
                className="px-5 py-2.5 border border-stone-300 hover:bg-stone-50 text-stone-700 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          /* Normal Checkout Form */
          <form onSubmit={handleFormSubmit} className="p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Contact, Address & Pakistani Payment Gateways (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                {/* 1. Customer Contact */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-950 text-white flex items-center justify-center text-[10px]">1</span>
                    Customer Contact Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g. Tariq Mehmood"
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs focus:ring-1 focus:ring-emerald-800"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Pakistani Mobile Number *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="03001234567"
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-mono focus:ring-1 focus:ring-emerald-800"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Email Address (for order receipt & tracking)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="yourname@gmail.com"
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs focus:ring-1 focus:ring-emerald-800"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Pakistani Delivery Address */}
                <div className="pt-4 border-t border-stone-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-950 text-white flex items-center justify-center text-[10px]">2</span>
                    Delivery Address (Pakistan)
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        City *
                      </label>
                      <select
                        value={selectedCity}
                        onChange={e => handleCityChange(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-medium focus:ring-1 focus:ring-emerald-800 cursor-pointer"
                        required
                      >
                        {shippingRates.map(c => (
                          <option key={c.city} value={c.city}>
                            {c.city} ({c.province})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Province
                      </label>
                      <input
                        type="text"
                        value={province}
                        onChange={e => setProvince(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-100 border border-stone-300 rounded-lg text-xs text-stone-600"
                        readOnly
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Area / Sector / Colony *
                      </label>
                      <input
                        type="text"
                        value={area}
                        onChange={e => setArea(e.target.value)}
                        placeholder="e.g. DHA Phase 5 / F-10"
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Postal Code (Optional)
                      </label>
                      <input
                        type="text"
                        value={postalCode}
                        onChange={e => setPostalCode(e.target.value)}
                        placeholder="e.g. 54000"
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-mono"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Complete Street / House Address *
                      </label>
                      <textarea
                        rows={2}
                        value={addressLine}
                        onChange={e => setAddressLine(e.target.value)}
                        placeholder="House / Apartment #, Street #, Landmark near you"
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                        required
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Rider Instructions (Optional)
                      </label>
                      <input
                        type="text"
                        value={deliveryInstructions}
                        onChange={e => setDeliveryInstructions(e.target.value)}
                        placeholder="e.g. Call before arrival, leave with security guard"
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Pakistani Payment Methods */}
                <div className="pt-4 border-t border-stone-100 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-950 text-white flex items-center justify-center text-[10px]">3</span>
                    Select Payment Method
                  </h3>

                  <div className="space-y-2">
                    {/* COD */}
                    {settings.allowCOD && (
                      <label
                        className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                          paymentMethod === 'COD'
                            ? 'border-emerald-800 bg-emerald-50/50'
                            : 'border-stone-200 hover:bg-stone-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="COD"
                          checked={paymentMethod === 'COD'}
                          onChange={() => setPaymentMethod('COD')}
                          className="mt-1 text-emerald-800"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-stone-900">
                              Cash on Delivery (COD)
                            </span>
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                              Most Popular
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-500 mt-0.5">
                            Pay with cash to the courier rider when the parcel arrives at your address.
                          </p>
                        </div>
                      </label>
                    )}

                    {/* Easypaisa */}
                    {settings.allowEasypaisa && (
                      <label
                        className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                          paymentMethod === 'Easypaisa'
                            ? 'border-emerald-800 bg-emerald-50/50'
                            : 'border-stone-200 hover:bg-stone-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="Easypaisa"
                          checked={paymentMethod === 'Easypaisa'}
                          onChange={() => setPaymentMethod('Easypaisa')}
                          className="mt-1 text-emerald-800"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                              <Smartphone className="w-3.5 h-3.5 text-emerald-700" />
                              Easypaisa Mobile Wallet
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-500 mt-0.5">
                            Pay instantly using your 11-digit Easypaisa account.
                          </p>
                        </div>
                      </label>
                    )}

                    {/* JazzCash */}
                    {settings.allowJazzCash && (
                      <label
                        className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                          paymentMethod === 'JazzCash'
                            ? 'border-emerald-800 bg-emerald-50/50'
                            : 'border-stone-200 hover:bg-stone-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="JazzCash"
                          checked={paymentMethod === 'JazzCash'}
                          onChange={() => setPaymentMethod('JazzCash')}
                          className="mt-1 text-emerald-800"
                        />
                        <div className="flex-1">
                          <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                            <Smartphone className="w-3.5 h-3.5 text-amber-600" />
                            JazzCash Mobile Account
                          </span>
                          <p className="text-[11px] text-stone-500 mt-0.5">
                            Enter your JazzCash number to approve the prompt on your phone.
                          </p>
                        </div>
                      </label>
                    )}

                    {/* Bank Transfer */}
                    {settings.allowBankTransfer && (
                      <label
                        className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                          paymentMethod === 'BankTransfer'
                            ? 'border-emerald-800 bg-emerald-50/50'
                            : 'border-stone-200 hover:bg-stone-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="BankTransfer"
                          checked={paymentMethod === 'BankTransfer'}
                          onChange={() => setPaymentMethod('BankTransfer')}
                          className="mt-1 text-emerald-800"
                        />
                        <div className="flex-1">
                          <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                            <Building className="w-3.5 h-3.5 text-stone-700" />
                            Direct Bank Transfer (Meezan / HBL / Alfalah IBFT)
                          </span>
                          <p className="text-[11px] text-stone-500 mt-0.5">
                            Transfer directly to our official company bank account.
                          </p>
                        </div>
                      </label>
                    )}

                    {/* Card Payment */}
                    <label
                      className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                        paymentMethod === 'Card'
                          ? 'border-emerald-800 bg-emerald-50/50'
                          : 'border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Card"
                        checked={paymentMethod === 'Card'}
                        onChange={() => setPaymentMethod('Card')}
                        className="mt-1 text-emerald-800"
                      />
                      <div className="flex-1">
                        <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                          <CreditCard className="w-3.5 h-3.5 text-stone-700" />
                          Debit / Credit Card (Visa, Mastercard, PayPak)
                        </span>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          Secure 3D-Authenticated gateway in PKR.
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Sub-form for Easypaisa or JazzCash */}
                  {(paymentMethod === 'Easypaisa' || paymentMethod === 'JazzCash') && (
                    <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-2">
                      <label className="block font-semibold text-stone-800">
                        Enter your {paymentMethod} Mobile Number:
                      </label>
                      <input
                        type="tel"
                        value={walletPhone}
                        onChange={e => setWalletPhone(e.target.value)}
                        placeholder="03XXXXXXXXX"
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs font-mono"
                        required
                      />
                      <p className="text-[11px] text-stone-500">
                        You will receive an in-app approval or USSD pop-up on your mobile screen.
                      </p>
                    </div>
                  )}

                  {/* Sub-form for Bank Transfer */}
                  {paymentMethod === 'BankTransfer' && (
                    <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 text-xs space-y-2.5">
                      <p className="font-bold text-emerald-950">
                        Official Store Bank Account Details:
                      </p>
                      <div className="bg-white p-3 rounded-lg border border-emerald-200 space-y-1 font-mono text-[11px]">
                        <p><strong className="font-sans text-stone-500">Bank:</strong> {settings.bankDetails.bankName}</p>
                        <p><strong className="font-sans text-stone-500">Account Title:</strong> {settings.bankDetails.accountTitle}</p>
                        <p><strong className="font-sans text-stone-500">Account No:</strong> {settings.bankDetails.accountNumber}</p>
                        <p><strong className="font-sans text-stone-500">IBAN:</strong> {settings.bankDetails.iban}</p>
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                          Bank Transaction Reference / Stan ID (Optional)
                        </label>
                        <input
                          type="text"
                          value={bankTxnId}
                          onChange={e => setBankTxnId(e.target.value)}
                          placeholder="e.g. MEZN-928410294"
                          className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded text-xs"
                        />
                      </div>
                    </div>
                  )}

                  {/* Sub-form for Card Payment */}
                  {paymentMethod === 'Card' && (
                    <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 mb-1">Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={e => setCardNumber(e.target.value)}
                          placeholder="4242 •••• •••• 4242"
                          className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded font-mono text-xs"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-stone-700 mb-1">MM/YY</label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={e => setCardExpiry(e.target.value)}
                            placeholder="12/28"
                            className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded font-mono text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-stone-700 mb-1">CVV</label>
                          <input
                            type="password"
                            value={cardCvv}
                            onChange={e => setCardCvv(e.target.value)}
                            placeholder="•••"
                            className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded font-mono text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Order Summary & Place Order (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 space-y-4">
                  <h3 className="font-display text-sm font-bold text-stone-900 border-b border-stone-200 pb-2">
                    Order Summary ({cart.length} items)
                  </h3>

                  {/* Itemized list */}
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {cart.map(item => (
                      <div
                        key={`${item.productId}-${item.variantId || 'b'}`}
                        className="flex gap-3 text-xs"
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded object-cover bg-stone-200 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-stone-900 truncate">
                            {item.product.name}
                          </p>
                          {item.variantName && (
                            <p className="text-[10px] text-amber-800">{item.variantName}</p>
                          )}
                          <p className="text-stone-500 text-[11px]">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right font-mono font-bold text-stone-900">
                          Rs. {(item.price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Price Calculations */}
                  <div className="space-y-2 pt-3 border-t border-stone-200 text-xs text-stone-600">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-mono tabular-nums font-semibold text-stone-900">
                        Rs. {subtotal.toLocaleString()}
                      </span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-700 font-semibold">
                        <span>Discount</span>
                        <span className="font-mono tabular-nums">-Rs. {discountAmount.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Delivery ({selectedCity})</span>
                      <span className="font-mono tabular-nums font-semibold text-stone-900">
                        {shippingFee === 0 ? (
                          <span className="text-emerald-700 font-bold">FREE</span>
                        ) : (
                          `Rs. ${shippingFee.toLocaleString()}`
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between text-base font-bold text-stone-950 pt-2 border-t border-stone-300">
                      <span>Grand Total</span>
                      <span className="font-mono tabular-nums text-emerald-950 text-lg">
                        Rs. {grandTotal.toLocaleString()} PKR
                      </span>
                    </div>
                  </div>

                  {/* Place Order CTA */}
                  <button
                    type="submit"
                    disabled={isSubmitting || cart.length === 0}
                    className="w-full py-3.5 bg-emerald-950 hover:bg-emerald-900 disabled:bg-stone-300 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    {isSubmitting ? (
                      <span>Generating Order...</span>
                    ) : (
                      <>
                        <span>Place Order Now</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="p-3 bg-white rounded-lg border border-stone-200 text-[11px] text-stone-500 space-y-1">
                    <p className="flex items-center gap-1.5 text-stone-700 font-semibold">
                      <Truck className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Delivery via TCS / Trax Pakistan</span>
                    </p>
                    <p>
                      Inspection allowed before payment at doorstep. Includes 7-day official KhaasBazaar return warranty.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
