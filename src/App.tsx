/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { WhatsAppButton } from './components/layout/WhatsAppButton';
import { ToastNotifications } from './components/layout/ToastNotifications';
import { HeroBanner } from './components/home/HeroBanner';
import { CategoryGrid } from './components/home/CategoryGrid';
import { LadiesCollectionSpotlight } from './components/home/LadiesCollectionSpotlight';
import { FeaturedProducts } from './components/home/FeaturedProducts';
import { ReviewsSection } from './components/home/ReviewsSection';
import { NewsletterSection } from './components/home/NewsletterSection';
import { ProductCatalog } from './components/catalog/ProductCatalog';
import { CustomerDashboard } from './components/account/CustomerDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ProductDetailModal } from './components/product/ProductDetailModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { OrderTrackingModal } from './components/orders/OrderTrackingModal';
import { InvoiceModal } from './components/orders/InvoiceModal';
import { StaticModals } from './components/static/StaticModals';
import { Truck, ShieldCheck, RefreshCw, Award } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeView } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA]">
      <Navbar />

      <main className="flex-1">
        {activeView === 'home' && (
          <>
            <HeroBanner />

            {/* Pakistani Trust Strip */}
            <section className="bg-stone-50 border-b border-stone-200/80 py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-stone-700">
                  <div className="flex items-center gap-3 p-2">
                    <Truck className="w-5 h-5 text-emerald-800 shrink-0" />
                    <div>
                      <p className="font-bold text-stone-900">150+ Cities Covered</p>
                      <p className="text-[11px] text-stone-500">TCS, Trax & Leopards courier</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-800 shrink-0" />
                    <div>
                      <p className="font-bold text-stone-900">Cash on Delivery (COD)</p>
                      <p className="text-[11px] text-stone-500">Pay when parcel reaches you</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2">
                    <RefreshCw className="w-5 h-5 text-emerald-800 shrink-0" />
                    <div>
                      <p className="font-bold text-stone-900">7-Day Free Exchanges</p>
                      <p className="text-[11px] text-stone-500">Hassle-free size replacement</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2">
                    <Award className="w-5 h-5 text-emerald-800 shrink-0" />
                    <div>
                      <p className="font-bold text-stone-900">Direct From Artisans</p>
                      <p className="text-[11px] text-stone-500">Charsadda, Sindh & Sialkot</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <CategoryGrid />
            <LadiesCollectionSpotlight />
            <FeaturedProducts />
            <ReviewsSection />
            <NewsletterSection />
          </>
        )}

        {activeView === 'catalog' && <ProductCatalog />}
        {activeView === 'account' && <CustomerDashboard />}
        {activeView === 'admin' && <AdminDashboard />}
      </main>

      <Footer />

      {/* Interactive Modals and Floating Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderTrackingModal />
      <InvoiceModal />
      <StaticModals />
      <WhatsAppButton />
      <ToastNotifications />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
