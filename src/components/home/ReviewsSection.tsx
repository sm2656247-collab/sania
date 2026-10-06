import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const ReviewsSection: React.FC = () => {
  const { reviews } = useStore();

  return (
    <section className="py-16 bg-[#FBFBFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-xs uppercase font-semibold tracking-wider text-amber-800">
            Real Customer Feedback
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
            Verified Pakistani Customers
          </h2>
          <p className="text-xs text-stone-500 mt-2">
            Read authentic reviews from shoppers across Lahore, Karachi, Islamabad and Peshawar who tested our craft in person.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map(rev => (
            <div
              key={rev.id}
              className="bg-white rounded-xl p-6 border border-stone-200/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Rating stars & verified badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="flex items-center gap-1 text-[11px] text-emerald-800 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                    <CheckCircle className="w-3 h-3 text-emerald-700" />
                    Verified COD Buyer
                  </span>
                </div>

                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-stone-900">{rev.userName}</h4>
                  <p className="text-[11px] text-stone-500">{rev.city}</p>
                </div>
                <span className="text-[10px] font-mono text-stone-400">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
