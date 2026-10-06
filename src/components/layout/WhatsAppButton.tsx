import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { MessageCircle, X, Send, ShoppingBag } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const { settings, cart, grandTotal } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');

  const handleSendStandard = () => {
    const text = encodeURIComponent(
      'Assalam-o-Alaikum KhaasBazaar Team! I need assistance with product availability and delivery.'
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  const handleSendCartOrder = () => {
    if (cart.length === 0) return;
    const itemsList = cart
      .map(
        i =>
          `• ${i.product.name} ${i.variantName ? `(${i.variantName})` : ''} x ${i.quantity} = Rs. ${(i.price * i.quantity).toLocaleString()}`
      )
      .join('\n');

    const msg = `Assalam-o-Alaikum! I want to place an order via WhatsApp:\n\n${itemsList}\n\n*Total Amount:* Rs. ${grandTotal.toLocaleString()} PKR\n*Payment Preference:* Cash on Delivery (COD)\n\nPlease confirm my order!`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    window.open(
      `https://wa.me/${cleanPhone}?text=${encodeURIComponent(customMsg.trim())}`,
      '_blank'
    );
    setCustomMsg('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 no-print">
      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 w-80 sm:w-96 p-4 mb-3 animate-in fade-in slide-in-from-bottom-2">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-stone-900">KhaasBazaar WhatsApp</h4>
                <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Online · Replies in 5 mins
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Options */}
          <div className="py-3 space-y-2 text-xs">
            <button
              onClick={handleSendStandard}
              className="w-full text-left p-2.5 bg-stone-50 hover:bg-emerald-50 text-stone-800 rounded-lg border border-stone-200/60 transition-colors flex items-center justify-between group cursor-pointer"
            >
              <span>💬 Chat with Customer Representative</span>
              <Send className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-700" />
            </button>

            {cart.length > 0 && (
              <button
                onClick={handleSendCartOrder}
                className="w-full text-left p-2.5 bg-emerald-950 text-white rounded-lg transition-colors flex items-center justify-between group cursor-pointer hover:bg-emerald-900"
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-emerald-300" />
                  <span className="font-semibold">Order Current Cart on WhatsApp ({cart.length})</span>
                </div>
                <span className="font-mono text-xs text-amber-300">Rs. {grandTotal.toLocaleString()}</span>
              </button>
            )}
          </div>

          {/* Custom Message Input */}
          <form onSubmit={handleCustomSend} className="relative mt-1">
            <input
              type="text"
              value={customMsg}
              onChange={e => setCustomMsg(e.target.value)}
              placeholder="Type your question or city..."
              className="w-full pl-3 pr-10 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-emerald-700"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 p-1 text-emerald-800 hover:text-emerald-950 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          <p className="text-[10px] text-stone-400 text-center mt-2">
            Pakistani Support Hours: Mon–Sun 10:00 AM – 10:00 PM PKT
          </p>
        </div>
      ) : null}

      {/* Floating Pill/Circle Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20ba59] transition-all hover:scale-105 cursor-pointer font-medium text-xs sm:text-sm"
        aria-label="Order on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 shrink-0" />
        <span className="hidden sm:inline">WhatsApp Order & Helpline</span>
        <span className="sm:hidden">WhatsApp</span>
      </button>
    </div>
  );
};
