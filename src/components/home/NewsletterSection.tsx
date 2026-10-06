import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Mail, Check, Tag } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const { addNotification, applyCoupon } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      addNotification('error', 'Please enter a valid email address.');
      return;
    }
    setSubscribed(true);
    addNotification('success', 'Subscribed! Use code WELCOME10 for 10% OFF your first order.');
  };

  return (
    <section className="py-14 bg-emerald-950 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-amber-400 mb-2">
          <Tag className="w-3.5 h-3.5" />
          <span>Exclusive Pakistani Heritage Club</span>
        </span>

        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Get 10% Off Your First Order
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto mt-2 leading-relaxed">
          Subscribe to receive artisan drop announcements, Eid collections, and Sialkot bat releases.
        </p>

        {subscribed ? (
          <div className="mt-6 p-4 bg-emerald-900/60 border border-emerald-500/40 rounded-xl inline-flex flex-col sm:flex-row items-center gap-3">
            <span className="text-xs text-emerald-200">Your voucher is ready:</span>
            <code className="px-3 py-1 bg-stone-900 font-mono text-amber-400 font-bold text-sm rounded border border-amber-400/40">
              WELCOME10
            </code>
            <button
              onClick={() => applyCoupon('WELCOME10')}
              className="text-xs underline text-amber-300 hover:text-white cursor-pointer font-medium"
            >
              Apply to Cart Now
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full pl-9 pr-3 py-2.5 bg-emerald-900/40 border border-emerald-700/60 rounded-lg text-xs sm:text-sm text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer shrink-0"
            >
              Claim 10% Off
            </button>
          </form>
        )}
        <p className="text-[11px] text-stone-400 mt-3">
          We never spam. You can unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};
