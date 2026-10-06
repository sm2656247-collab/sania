import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  X,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Truck,
  RotateCcw,
  HelpCircle,
  Ruler,
  Send,
  CreditCard
} from 'lucide-react';

export const StaticModals: React.FC = () => {
  const { staticPageKey, setStaticPageKey, settings, addNotification, setTrackingOrderId } = useStore();

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [submittedContact, setSubmittedContact] = useState(false);

  // Quick track input inside modal
  const [trackQuery, setTrackQuery] = useState('');

  if (!staticPageKey) return null;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedContact(true);
    addNotification('success', 'Message sent! Our Lahore customer team will call or WhatsApp you shortly.');
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackQuery.trim()) {
      setTrackingOrderId(trackQuery.trim());
      setStaticPageKey(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 relative animate-in fade-in">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-stone-200 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xs z-10">
          <h2 className="font-display text-lg font-bold text-stone-900 capitalize">
            {staticPageKey === 'returns' && '7-Day Return & Exchange Policy'}
            {staticPageKey === 'shipping' && 'Nationwide Shipping & Delivery Terms'}
            {staticPageKey === 'payment-methods' && 'Pakistani Payment Methods'}
            {staticPageKey === 'size-guide' && 'Pakistani Sizing Guide (Footwear & Apparel)'}
            {staticPageKey === 'faq' && 'Frequently Asked Questions'}
            {staticPageKey === 'contact' && 'Contact Us & Store Location'}
            {staticPageKey === 'tracking' && 'Track Your Parcel'}
            {staticPageKey === 'privacy' && 'Privacy Policy'}
            {staticPageKey === 'terms' && 'Terms of Service'}
          </h2>
          <button
            onClick={() => setStaticPageKey(null)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 text-xs text-stone-700 space-y-4 leading-relaxed">
          {/* Tracking */}
          {staticPageKey === 'tracking' && (
            <div className="space-y-4">
              <p>Enter your order number or courier tracking code to monitor real-time delivery status:</p>
              <form onSubmit={handleTrackSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={trackQuery}
                  onChange={e => setTrackQuery(e.target.value)}
                  placeholder="e.g. PK-2026-004812"
                  className="flex-1 px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs font-mono uppercase"
                  required
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-950 text-white rounded-lg font-bold hover:bg-emerald-900 cursor-pointer"
                >
                  Track Now
                </button>
              </form>
              <div className="p-3 bg-stone-50 rounded-lg text-stone-500 text-[11px]">
                Tip: Demo sample order: <button type="button" onClick={() => { setTrackingOrderId('PK-2026-004812'); setStaticPageKey(null); }} className="text-emerald-900 font-bold underline cursor-pointer">PK-2026-004812</button>
              </div>
            </div>
          )}

          {/* 7-Day Returns */}
          {staticPageKey === 'returns' && (
            <div className="space-y-3">
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <h3 className="font-bold text-emerald-950 text-sm">Hassle-Free Pakistani Exchange Guarantee</h3>
                <p className="mt-1">
                  We understand that finding the exact size for traditional Peshawari chappals or Boski kurtas online can sometimes need adjustments. That’s why KhaasBazaar offers a full 7-day size replacement and return guarantee across all Pakistani cities.
                </p>
              </div>
              <h4 className="font-bold text-stone-900 text-sm mt-3">Terms & Conditions:</h4>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Items must be unworn and in original condition with tags and packaging intact.</li>
                <li>Size replacement is 100% free; we dispatch the replacement via TCS courier.</li>
                <li>Refunds are transferred directly to your JazzCash, Easypaisa, or Pakistani Bank Account within 48 hours of return receipt.</li>
                <li>To initiate a return, click "Request Return" from your Customer Orders page or WhatsApp our team at {settings.whatsappNumber}.</li>
              </ul>
            </div>
          )}

          {/* Shipping */}
          {staticPageKey === 'shipping' && (
            <div className="space-y-3">
              <p>
                We dispatch all shipments through Pakistan's leading courier networks: <strong>TCS Express, Trax Logistics, and Leopards Courier</strong>.
              </p>
              <div className="grid grid-cols-2 gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200 font-mono text-[11px]">
                <div>Lahore: 1–2 Business Days (Rs. 150)</div>
                <div>Islamabad/Rawalpindi: 1–2 Days (Rs. 180)</div>
                <div>Karachi: 2–3 Business Days (Rs. 220)</div>
                <div>Peshawar / Faisalabad: 2 Days (Rs. 180–200)</div>
                <div>Quetta / Balochistan: 3–4 Days (Rs. 260)</div>
                <div>Gilgit / AJK: 3–5 Days (Rs. 250–300)</div>
              </div>
              <p className="font-bold text-emerald-900">
                Nationwide Free Shipping applies on all orders totaling Rs. {settings.freeShippingThreshold.toLocaleString()} or above!
              </p>
            </div>
          )}

          {/* Payment Methods */}
          {staticPageKey === 'payment-methods' && (
            <div className="space-y-3">
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                <h4 className="font-bold text-stone-900">1. Cash on Delivery (COD)</h4>
                <p className="text-stone-600 mt-0.5">Pay in Pakistani Rupees to the delivery rider when your parcel arrives. You can inspect parcel sealed condition before payment.</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                <h4 className="font-bold text-stone-900">2. Easypaisa & JazzCash Wallets</h4>
                <p className="text-stone-600 mt-0.5">Direct in-app push authorization or OTP transaction via 11-digit mobile number.</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                <h4 className="font-bold text-stone-900">3. Direct Bank Transfer (Meezan Bank IBFT)</h4>
                <p className="text-stone-600 mt-0.5">Interbank funds transfer via Meezan Bank IBAN: <code>{settings.bankDetails.iban}</code></p>
              </div>
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                <h4 className="font-bold text-stone-900">4. Credit / Debit Cards</h4>
                <p className="text-stone-600 mt-0.5">Visa, Mastercard, and PayPak with 3D-Secure 2-factor OTP verification.</p>
              </div>
            </div>
          )}

          {/* Size Guide */}
          {staticPageKey === 'size-guide' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-stone-900 text-sm mb-2">Peshawari & Kaptaan Chappal Footwear Size Chart</h4>
                <table className="w-full text-center border border-stone-200 rounded overflow-hidden">
                  <thead className="bg-stone-100 font-bold">
                    <tr>
                      <th className="p-2 border">Pak / UK Size</th>
                      <th className="p-2 border">EU Size</th>
                      <th className="p-2 border">Foot Length (Inches)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y font-mono">
                    <tr><td className="p-2 border">Size 7</td><td className="p-2 border">40</td><td className="p-2 border">9.8"</td></tr>
                    <tr><td className="p-2 border">Size 8</td><td className="p-2 border">41</td><td className="p-2 border">10.2"</td></tr>
                    <tr><td className="p-2 border">Size 9</td><td className="p-2 border">42</td><td className="p-2 border">10.5"</td></tr>
                    <tr><td className="p-2 border">Size 10</td><td className="p-2 border">43</td><td className="p-2 border">10.9"</td></tr>
                    <tr><td className="p-2 border">Size 11</td><td className="p-2 border">44</td><td className="p-2 border">11.3"</td></tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 text-sm mb-2">Men Stitched Kurta & Boski Size Chart</h4>
                <table className="w-full text-center border border-stone-200 rounded overflow-hidden">
                  <thead className="bg-stone-100 font-bold">
                    <tr>
                      <th className="p-2 border">Size</th>
                      <th className="p-2 border">Chest (Inches)</th>
                      <th className="p-2 border">Length (Inches)</th>
                      <th className="p-2 border">Shoulder (Inches)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y font-mono">
                    <tr><td className="p-2 border">Small</td><td className="p-2 border">38"</td><td className="p-2 border">40"</td><td className="p-2 border">17.5"</td></tr>
                    <tr><td className="p-2 border">Medium</td><td className="p-2 border">41"</td><td className="p-2 border">42"</td><td className="p-2 border">18.5"</td></tr>
                    <tr><td className="p-2 border">Large</td><td className="p-2 border">44"</td><td className="p-2 border">44"</td><td className="p-2 border">19.5"</td></tr>
                    <tr><td className="p-2 border">X-Large</td><td className="p-2 border">47"</td><td className="p-2 border">45"</td><td className="p-2 border">20.5"</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* FAQ */}
          {staticPageKey === 'faq' && (
            <div className="space-y-3">
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                <h4 className="font-bold text-stone-900">How long does delivery take in Pakistan?</h4>
                <p className="text-stone-600 mt-1">Lahore, Rawalpindi, and Islamabad take 1 to 2 business days. Karachi, Multan, and Peshawar take 2 to 3 days via TCS Express.</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                <h4 className="font-bold text-stone-900">Is Cash on Delivery (COD) available in small villages and tehsils?</h4>
                <p className="text-stone-600 mt-1">Yes, through our partnership with TCS and Leopards Courier, we deliver COD parcels across 150+ Pakistani cities and surrounding tehsils.</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                <h4 className="font-bold text-stone-900">What if the size does not fit?</h4>
                <p className="text-stone-600 mt-1">Simply contact us on WhatsApp at {settings.whatsappNumber}. We arrange reverse pickup and deliver the replacement size free of charge.</p>
              </div>
            </div>
          )}

          {/* Contact */}
          {staticPageKey === 'contact' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <span className="font-bold text-stone-900 block">Lahore Headquarters:</span>
                  <p className="text-stone-600">{settings.address}</p>
                </div>
                <div>
                  <span className="font-bold text-stone-900 block">Direct Helpline:</span>
                  <p className="font-mono">{settings.contactPhone}</p>
                  <p className="font-mono text-emerald-800 font-bold">WhatsApp: {settings.whatsappNumber}</p>
                </div>
              </div>

              {submittedContact ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-emerald-900 font-semibold">
                  Thank you! Your inquiry has been submitted. A representative will contact you within 2 hours.
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold mb-1">Your Name</label>
                      <input
                        type="text"
                        value={contactName}
                        onChange={e => setContactName(e.target.value)}
                        placeholder="e.g. Bilal Khan"
                        className="w-full px-3 py-2 border rounded"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Mobile Number</label>
                      <input
                        type="tel"
                        value={contactPhone}
                        onChange={e => setContactPhone(e.target.value)}
                        placeholder="03001234567"
                        className="w-full px-3 py-2 border rounded font-mono"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Message</label>
                    <textarea
                      rows={3}
                      value={contactMessage}
                      onChange={e => setContactMessage(e.target.value)}
                      placeholder="Ask about bulk ordering, sizing, or custom artisan requests..."
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-950 text-white font-bold rounded-lg hover:bg-emerald-900 cursor-pointer flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Privacy & Terms */}
          {(staticPageKey === 'privacy' || staticPageKey === 'terms') && (
            <div className="space-y-3 text-stone-600">
              <p>
                KhaasBazaar Pakistan is committed to protecting customer confidentiality. We never sell or share customer contact numbers, addresses, or billing data with third parties.
              </p>
              <p>
                All prices quoted in Pakistani Rupees (PKR) include all statutory duties. Cash on Delivery parcels are subject to verification via automated SMS or WhatsApp order confirmation.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
