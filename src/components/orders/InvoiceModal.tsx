import React from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Printer, CheckCircle } from 'lucide-react';

export const InvoiceModal: React.FC = () => {
  const { printableOrder, setPrintableOrder, settings } = useStore();

  if (!printableOrder) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-6 no-print-bg">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border border-stone-300 relative print:m-0 print:p-0 print:border-none print:shadow-none print:max-w-none print:w-full">
        {/* Modal Controls (Hidden in Print) */}
        <div className="p-4 border-b border-stone-200 flex items-center justify-between no-print sticky top-0 bg-white/95 backdrop-blur-xs z-10">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            Official E-Commerce Tax Invoice
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-emerald-950 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Print Invoice</span>
            </button>
            <button
              onClick={() => setPrintableOrder(null)}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Printable Sheet */}
        <div className="p-6 sm:p-10 space-y-8 bg-white print:p-0">
          {/* Header & Logo */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-stone-200">
            <div>
              <h1 className="font-display text-2xl font-bold tracking-tight text-emerald-950">
                KhaasBazaar
              </h1>
              <p className="text-[11px] font-semibold text-amber-800 uppercase tracking-widest mt-0.5">
                Pakistan Artisan Marketplace (Pvt) Ltd
              </p>
              <p className="text-xs text-stone-600 mt-1 max-w-xs leading-relaxed">
                {settings.address}
              </p>
              <p className="text-xs text-stone-500 mt-1 font-mono">
                NTN: {settings.ntnNumber} · Helpline: {settings.whatsappNumber}
              </p>
            </div>

            <div className="sm:text-right space-y-1">
              <span className="inline-block px-3 py-1 bg-stone-100 text-stone-800 font-mono text-xs font-bold rounded">
                TAX INVOICE
              </span>
              <p className="font-mono text-sm font-bold text-stone-900 mt-1">
                {printableOrder.id}
              </p>
              <p className="text-xs text-stone-500">
                Date: {new Date(printableOrder.createdAt).toLocaleDateString('en-PK', { dateStyle: 'medium' })}
              </p>
              <p className="text-xs text-stone-500">
                Courier: <strong className="text-stone-800">{printableOrder.courierName || 'TCS'}</strong> ({printableOrder.trackingNumber})
              </p>
            </div>
          </div>

          {/* Customer & Billing Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
              <span className="font-bold uppercase tracking-wider text-stone-500 text-[10px] block mb-1">
                Billed & Shipped To:
              </span>
              <p className="font-bold text-stone-900 text-sm">{printableOrder.customerName}</p>
              <p className="text-stone-700 font-mono">{printableOrder.customerPhone}</p>
              <p className="text-stone-600">{printableOrder.customerEmail}</p>
              <p className="text-stone-700 mt-1">
                {printableOrder.shippingAddress.addressLine}, {printableOrder.shippingAddress.area}
              </p>
              <p className="font-semibold text-stone-900">
                {printableOrder.shippingAddress.city}, {printableOrder.shippingAddress.province}
              </p>
            </div>

            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
              <span className="font-bold uppercase tracking-wider text-stone-500 text-[10px] block mb-1">
                Payment Details:
              </span>
              <p className="text-stone-700">
                Method: <strong className="text-stone-900">{printableOrder.paymentMethod}</strong>
              </p>
              <p className="text-stone-700">
                Payment Status:{' '}
                <span className={`font-bold ${printableOrder.paymentStatus === 'Paid' ? 'text-emerald-700' : 'text-amber-800'}`}>
                  {printableOrder.paymentStatus}
                </span>
              </p>
              <p className="text-stone-700">
                Order Status: <strong className="text-stone-900">{printableOrder.orderStatus}</strong>
              </p>
              {printableOrder.shippingAddress.deliveryInstructions && (
                <p className="text-stone-500 text-[11px] italic mt-1">
                  Note: "{printableOrder.shippingAddress.deliveryInstructions}"
                </p>
              )}
            </div>
          </div>

          {/* Items Table */}
          <div className="border border-stone-200 rounded-xl overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-stone-100 text-stone-700 uppercase font-semibold border-b border-stone-200 text-[11px]">
                <tr>
                  <th className="py-3 px-4">Item Description</th>
                  <th className="py-3 px-4 text-center">Qty</th>
                  <th className="py-3 px-4 text-right">Unit Price (PKR)</th>
                  <th className="py-3 px-4 text-right">Subtotal (PKR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-mono">
                {printableOrder.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/50">
                    <td className="py-3.5 px-4 font-sans">
                      <p className="font-semibold text-stone-900">{item.productName}</p>
                      {item.variantName && (
                        <p className="text-[11px] text-amber-800">{item.variantName}</p>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center text-stone-800 font-semibold">{item.quantity}</td>
                    <td className="py-3.5 px-4 text-right text-stone-800">
                      Rs. {item.price.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-stone-900">
                      Rs. {item.subtotal.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Breakdown */}
          <div className="flex justify-end">
            <div className="w-full sm:w-72 space-y-2 text-xs text-stone-600 bg-stone-50 p-4 rounded-xl border border-stone-200">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-mono tabular-nums font-semibold text-stone-900">
                  Rs. {printableOrder.subtotal.toLocaleString()}
                </span>
              </div>

              {printableOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-800 font-semibold">
                  <span>Voucher Discount:</span>
                  <span className="font-mono tabular-nums">-Rs. {printableOrder.discount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping ({printableOrder.shippingAddress.city}):</span>
                <span className="font-mono tabular-nums font-semibold text-stone-900">
                  {printableOrder.shippingFee === 0 ? 'FREE' : `Rs. ${printableOrder.shippingFee.toLocaleString()}`}
                </span>
              </div>

              <div className="flex justify-between pt-2 border-t border-stone-300 text-sm font-bold text-stone-950">
                <span>Amount Payable:</span>
                <span className="font-mono tabular-nums text-base text-emerald-950">
                  Rs. {printableOrder.total.toLocaleString()} PKR
                </span>
              </div>
            </div>
          </div>

          {/* Footer Terms & Stamp */}
          <div className="pt-6 border-t border-stone-200 text-center space-y-2 text-[11px] text-stone-500">
            <div className="flex items-center justify-center gap-1.5 text-emerald-900 font-semibold">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
              <span>7-Day Return & Size Exchange Valid across 150+ Pakistani Cities</span>
            </div>
            <p>
              This is a computer-generated tax invoice and requires no physical signature. Questions? WhatsApp {settings.whatsappNumber}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
