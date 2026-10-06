import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastNotifications: React.FC = () => {
  const { notifications, removeNotification } = useStore();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-20 left-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none no-print">
      {notifications.map(n => (
        <div
          key={n.id}
          className={`pointer-events-auto p-3.5 rounded-xl shadow-xl border flex items-center justify-between gap-3 text-xs animate-in slide-in-from-left duration-200 ${
            n.type === 'success'
              ? 'bg-emerald-950 text-white border-emerald-800'
              : n.type === 'error'
              ? 'bg-rose-950 text-white border-rose-800'
              : 'bg-stone-900 text-white border-stone-700'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {n.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
            {n.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
            {n.type === 'info' && <Info className="w-4 h-4 text-amber-400 shrink-0" />}
            <span className="font-medium leading-snug">{n.message}</span>
          </div>

          <button
            onClick={() => removeNotification(n.id)}
            className="text-stone-400 hover:text-white p-0.5 cursor-pointer shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
