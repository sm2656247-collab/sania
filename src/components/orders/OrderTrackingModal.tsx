import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  X,
  Truck,
  CheckCircle2,
  Clock,
  Package,
  MapPin,
  FileText,
  RotateCcw,
  Search
} from 'lucide-react';
import { OrderStatus } from '../../types';

export const OrderTrackingModal: React.FC = () => {
  const {
    trackingOrderId,
    setTrackingOrderId,
    orders,
    setPrintableOrder,
    submitReturnRequest,
    currentUser
  } = useStore();

  const [inputQuery, setInputQuery] = useState(trackingOrderId || '');
  const [returnModalOpen, setReturnModalOpen] = useState(false);
  const [returnReason, setReturnReason] = useState('Size Mismatch');
  const [returnDetails, setReturnDetails] = useState('');
  const [selectedReturnProduct, setSelectedReturnProduct] = useState('');

  if (!trackingOrderId) return null;

  const currentOrder = orders.find(
    o =>
      o.id.toLowerCase() === trackingOrderId.toLowerCase() ||
      o.trackingNumber?.toLowerCase() === trackingOrderId.toLowerCase()
  );

  const statuses: OrderStatus[] = [
    'Confirmed',
    'Processing',
    'Packed',
    'Shipped',
    'Out for Delivery',
    'Delivered'
  ];

  const currentStatusIndex = currentOrder ? statuses.indexOf(currentOrder.orderStatus) : -1;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputQuery.trim()) {
      setTrackingOrderId(inputQuery.trim());
    }
  };

  const handleReturnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentOrder || !selectedReturnProduct) return;
    const item = currentOrder.items.find(i => i.productId === selectedReturnProduct);
    submitReturnRequest(
      currentOrder.id,
      selectedReturnProduct,
      item?.productName || 'Item',
      returnReason,
      returnDetails
    );
    setReturnModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 relative animate-in fade-in">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-stone-200 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xs z-10">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-emerald-800" />
            <h2 className="font-display text-lg font-bold text-stone-900">
              Live Order & Parcel Tracking
            </h2>
          </div>
          <button
            onClick={() => setTrackingOrderId(null)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          {/* Search box for tracking another order */}
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="text"
                value={inputQuery}
                onChange={e => setInputQuery(e.target.value)}
                placeholder="Enter Order # (PK-2026-XXXXXX) or Courier Tracking #"
                className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-mono focus:ring-1 focus:ring-emerald-800"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 cursor-pointer"
            >
              Search
            </button>
          </form>

          {currentOrder ? (
            <div className="space-y-6">
              {/* Order Meta Card */}
              <div className="bg-stone-50 rounded-xl p-4 sm:p-5 border border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-stone-500 block">Order ID</span>
                  <span className="font-bold text-stone-900 font-mono text-sm">{currentOrder.id}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Courier & Consignment</span>
                  <span className="font-semibold text-emerald-900">{currentOrder.courierName || 'TCS'}</span>
                  <span className="font-mono text-[10px] text-stone-500 block truncate">{currentOrder.trackingNumber}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Total Amount</span>
                  <span className="font-mono font-bold text-stone-900 text-sm">Rs. {currentOrder.total.toLocaleString()}</span>
                  <span className="text-[10px] text-stone-500 block">{currentOrder.paymentMethod}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Current Status</span>
                  <span className="inline-block px-2 py-0.5 mt-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                    {currentOrder.orderStatus}
                  </span>
                </div>
              </div>

              {/* Graphical Status Stepper Progression */}
              <div className="py-4 px-2">
                <div className="hidden sm:flex items-center justify-between relative">
                  {/* Connecting Line */}
                  <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-stone-200 -translate-y-1/2 -z-0" />

                  {statuses.map((step, idx) => {
                    const isDone = currentStatusIndex >= idx;
                    const isCurrent = currentStatusIndex === idx;

                    return (
                      <div key={step} className="relative z-10 flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                            isDone
                              ? 'bg-emerald-900 text-white ring-4 ring-emerald-100'
                              : 'bg-white border-2 border-stone-300 text-stone-400'
                          }`}
                        >
                          {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>
                        <span
                          className={`text-[11px] mt-2 text-center font-medium max-w-[70px] ${
                            isCurrent
                              ? 'text-emerald-950 font-bold'
                              : isDone
                              ? 'text-stone-700'
                              : 'text-stone-400'
                          }`}
                        >
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Mobile Status Bar */}
                <div className="sm:hidden p-3 bg-emerald-50 rounded-lg border border-emerald-200 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-700 uppercase font-bold">Current Stage</span>
                    <h4 className="text-sm font-bold text-emerald-950">{currentOrder.orderStatus}</h4>
                  </div>
                </div>
              </div>

              {/* Timestamped Timeline Activity Logs */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800">
                  Tracking Activity Logs
                </h4>
                <div className="border border-stone-200 rounded-xl divide-y divide-stone-100 overflow-hidden bg-white">
                  {currentOrder.timeline.map((event, i) => (
                    <div key={i} className="p-3.5 flex items-start gap-3 text-xs">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-900">{event.status} · {event.location}</span>
                          <span className="text-[11px] font-mono text-stone-400">{event.timestamp}</span>
                        </div>
                        <p className="text-stone-600 text-xs mt-0.5">{event.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Items in Parcel */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800">
                  Products in Consignment ({currentOrder.items.length})
                </h4>
                <div className="border border-stone-200 rounded-xl divide-y divide-stone-100 bg-white">
                  {currentOrder.items.map((item, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.productName}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded object-cover bg-stone-100"
                        />
                        <div>
                          <p className="font-semibold text-stone-900">{item.productName}</p>
                          {item.variantName && (
                            <p className="text-[11px] text-amber-800">{item.variantName}</p>
                          )}
                          <p className="text-stone-500 text-[11px]">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-stone-900">
                        Rs. {item.subtotal.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Details */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-stone-500 font-medium block">Shipping Address:</span>
                  <p className="font-semibold text-stone-900 mt-0.5">
                    {currentOrder.shippingAddress.addressLine}, {currentOrder.shippingAddress.area},{' '}
                    {currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.province}
                  </p>
                </div>
                <div>
                  <span className="text-stone-500 font-medium block">Recipient Contact:</span>
                  <p className="font-semibold text-stone-900 mt-0.5">
                    {currentOrder.customerName} · {currentOrder.customerPhone}
                  </p>
                </div>
              </div>

              {/* Actions: Print Invoice & Return Option */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => setPrintableOrder(currentOrder)}
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Print Tax Invoice</span>
                </button>

                {currentOrder.orderStatus === 'Delivered' && (
                  <button
                    onClick={() => {
                      setSelectedReturnProduct(currentOrder.items[0]?.productId || '');
                      setReturnModalOpen(true);
                    }}
                    className="px-4 py-2 border border-rose-300 text-rose-700 hover:bg-rose-50 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Request 7-Day Return / Exchange</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-stone-500 space-y-3">
              <Package className="w-12 h-12 text-stone-300 mx-auto" />
              <p className="font-semibold text-stone-800 text-sm">No order found with ID "{trackingOrderId}"</p>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Please double check the order number received on your confirmation SMS or receipt (e.g. PK-2026-004812).
              </p>
              <button
                onClick={() => setTrackingOrderId('PK-2026-004812')}
                className="text-xs text-emerald-800 font-bold underline cursor-pointer"
              >
                View sample demo order (PK-2026-004812)
              </button>
            </div>
          )}
        </div>

        {/* Return Request Modal */}
        {returnModalOpen && currentOrder && (
          <div className="fixed inset-0 z-60 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 border border-stone-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-rose-600" />
                  <span>7-Day Return & Exchange Form</span>
                </h3>
                <button
                  onClick={() => setReturnModalOpen(false)}
                  className="text-stone-400 hover:text-stone-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleReturnSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Select Item to Return</label>
                  <select
                    value={selectedReturnProduct}
                    onChange={e => setSelectedReturnProduct(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                    required
                  >
                    {currentOrder.items.map(i => (
                      <option key={i.productId} value={i.productId}>
                        {i.productName} ({i.variantName || 'Standard'})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Reason for Return</label>
                  <select
                    value={returnReason}
                    onChange={e => setReturnReason(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                  >
                    <option value="Size Mismatch">Size Mismatch / Fitting Issue</option>
                    <option value="Defective or Damaged">Defective or Damaged during transit</option>
                    <option value="Wrong Item Delivered">Wrong Item Delivered</option>
                    <option value="Color or Fabric Variance">Color or Fabric Variance</option>
                    <option value="Change of Mind">Change of Mind</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Details / Notes</label>
                  <textarea
                    rows={3}
                    value={returnDetails}
                    onChange={e => setReturnDetails(e.target.value)}
                    placeholder="Provide specific notes for replacement size or refund method..."
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                    required
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setReturnModalOpen(false)}
                    className="px-4 py-2 border rounded-lg text-stone-600 hover:bg-stone-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-rose-700 text-white rounded-lg font-semibold hover:bg-rose-800 cursor-pointer"
                  >
                    Submit Return Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
