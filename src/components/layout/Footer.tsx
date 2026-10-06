import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Truck, ShieldCheck, RefreshCw, PhoneCall, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView, setSelectedCategoryFilter, setStaticPageKey, settings, setTrackingOrderId } = useStore();

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-stone-800">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-950/80 text-emerald-400 border border-emerald-800/50">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Nationwide Express Delivery</h4>
              <p className="text-xs text-stone-400 mt-0.5">
                TCS, Trax & Leopards delivery in 150+ Pakistani cities with live rider tracking.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-950/80 text-emerald-400 border border-emerald-800/50">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Cash on Delivery (COD)</h4>
              <p className="text-xs text-stone-400 mt-0.5">
                Inspect parcel and pay in PKR when rider reaches your doorstep. 100% verified.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-950/80 text-emerald-400 border border-emerald-800/50">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">7-Day Easy Returns</h4>
              <p className="text-xs text-stone-400 mt-0.5">
                Size issue? Hassle-free exchanges and instant refunds via JazzCash or bank.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-950/80 text-emerald-400 border border-emerald-800/50">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">WhatsApp & Phone Support</h4>
              <p className="text-xs text-stone-400 mt-0.5">
                Daily 10 AM to 10 PM PKT support on WhatsApp ({settings.whatsappNumber}).
              </p>
            </div>
          </div>
        </div>

        {/* 4 Column Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 py-12 border-b border-stone-800 text-sm">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <span className="font-display text-2xl font-bold tracking-tight text-white">
                KhaasBazaar
              </span>
              <p className="text-xs text-amber-500 font-medium tracking-wide uppercase mt-0.5">
                Pakistan Artisan Marketplace
              </p>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Connecting heritage Pakistani craftsmen from Charsadda, Bhit Shah, Multan, and Sialkot directly to your home. We celebrate authentic Pakistani roots with uncompromised material quality.
            </p>
            <div className="space-y-1.5 text-xs text-stone-400 pt-1">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Gulberg III, Main Boulevard, Lahore, Pakistan</span>
              </p>
              <p className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{settings.contactPhone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{settings.contactEmail}</span>
              </p>
              <p className="text-[11px] text-stone-500 font-mono mt-1">
                FBR NTN: {settings.ntnNumber}
              </p>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h5 className="font-semibold text-white uppercase text-xs tracking-wider mb-3">Shop Crafts</h5>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => {
                    setSelectedCategoryFilter("Women's Festive Pret & Lawn");
                    setActiveView('catalog');
                  }}
                  className="hover:text-amber-400 font-medium transition-colors cursor-pointer text-amber-200"
                >
                  Women's Festive Lawn Suits
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategoryFilter('Handcrafted Bridal Khussas');
                    setActiveView('catalog');
                  }}
                  className="hover:text-amber-400 font-medium transition-colors cursor-pointer text-amber-200"
                >
                  Handcrafted Bridal Khussas
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategoryFilter('Artisan Kundan & Jhumkas');
                    setActiveView('catalog');
                  }}
                  className="hover:text-amber-400 font-medium transition-colors cursor-pointer text-amber-200"
                >
                  Artisan Kundan & Jhumkas
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategoryFilter('Footwear & Peshawari Chappals');
                    setActiveView('catalog');
                  }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Charsadda Chappals
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategoryFilter('Handloom Shawls & Ajrak');
                    setActiveView('catalog');
                  }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Sindhi Ajrak & Pashmina
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategoryFilter('Eastern Apparel & Kurtas');
                    setActiveView('catalog');
                  }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Boski & Cotton Kurtas
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Policies */}
          <div>
            <h5 className="font-semibold text-white uppercase text-xs tracking-wider mb-3">Customer Care</h5>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => {
                    setStaticPageKey('tracking');
                  }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Track Order
                </button>
              </li>
              <li>
                <button
                  onClick={() => setStaticPageKey('returns')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  7-Day Return Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setStaticPageKey('shipping')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Shipping & Cities
                </button>
              </li>
              <li>
                <button
                  onClick={() => setStaticPageKey('payment-methods')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Payment Methods (COD / Wallets)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setStaticPageKey('size-guide')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Pakistani Size Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => setStaticPageKey('faq')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Major Cities Delivery */}
          <div>
            <h5 className="font-semibold text-white uppercase text-xs tracking-wider mb-3">Cities We Deliver To</h5>
            <div className="grid grid-cols-2 gap-1.5 text-xs text-stone-400">
              <span className="hover:text-stone-300">Lahore (1-2 Days)</span>
              <span className="hover:text-stone-300">Karachi (2-3 Days)</span>
              <span className="hover:text-stone-300">Islamabad (1-2 Days)</span>
              <span className="hover:text-stone-300">Rawalpindi (1-2 Days)</span>
              <span className="hover:text-stone-300">Peshawar (2-3 Days)</span>
              <span className="hover:text-stone-300">Faisalabad (2 Days)</span>
              <span className="hover:text-stone-300">Multan (2-3 Days)</span>
              <span className="hover:text-stone-300">Quetta (3-4 Days)</span>
              <span className="hover:text-stone-300">Sialkot (1-2 Days)</span>
              <span className="hover:text-stone-300">Gujranwala (1-2 Days)</span>
              <span className="hover:text-stone-300">Hyderabad (2-3 Days)</span>
              <span className="hover:text-stone-300">+ 140 More Cities</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Payment Logos & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-stone-400 font-medium mr-1">Accepted in Pakistan:</span>
            <span className="px-2 py-0.5 bg-stone-800 rounded text-stone-300 font-mono text-[11px] border border-stone-700">Cash on Delivery</span>
            <span className="px-2 py-0.5 bg-stone-800 rounded text-stone-300 font-mono text-[11px] border border-stone-700">JazzCash</span>
            <span className="px-2 py-0.5 bg-stone-800 rounded text-stone-300 font-mono text-[11px] border border-stone-700">Easypaisa</span>
            <span className="px-2 py-0.5 bg-stone-800 rounded text-stone-300 font-mono text-[11px] border border-stone-700">Meezan IBFT</span>
            <span className="px-2 py-0.5 bg-stone-800 rounded text-stone-300 font-mono text-[11px] border border-stone-700">Visa / Mastercard / PayPak</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setStaticPageKey('privacy')}
              className="hover:text-stone-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => setStaticPageKey('terms')}
              className="hover:text-stone-300 transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <span>·</span>
            <span>© {new Date().getFullYear()} KhaasBazaar Pakistan. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
