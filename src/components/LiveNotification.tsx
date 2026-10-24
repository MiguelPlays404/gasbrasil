import React, { useState, useEffect, useRef } from 'react';
import { Flame, X } from 'lucide-react';
import { LIVE_PURCHASE_NOTIFICATIONS } from '../data/gasData';

export const LiveNotification: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);

  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const nextScheduleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const showNotification = () => {
      // Pick next notification
      setCurrentIndex((prev) => (prev + 1) % LIVE_PURCHASE_NOTIFICATIONS.length);
      setIsMounted(true);

      // Trigger enter transition in next frame
      requestAnimationFrame(() => {
        setTimeout(() => {
          setIsAnimatingIn(true);
        }, 20);
      });

      // Keep visible for 5.5s, then start exit animation
      hideTimeoutRef.current = setTimeout(() => {
        dismissNotification();
      }, 5500);
    };

    const scheduleNext = () => {
      // Average ~40 seconds (between 33s and 47s)
      const delay = Math.floor(33000 + Math.random() * 14000);
      nextScheduleTimeoutRef.current = setTimeout(() => {
        showNotification();
      }, delay);
    };

    // First appearance after 4.5 seconds
    const initialTimer = setTimeout(() => {
      showNotification();
    }, 4500);

    return () => {
      clearTimeout(initialTimer);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      if (nextScheduleTimeoutRef.current) clearTimeout(nextScheduleTimeoutRef.current);
    };
  }, []);

  const dismissNotification = () => {
    // Smooth exit animation
    setIsAnimatingIn(false);

    // Unmount after animation completes (500ms) and schedule next
    setTimeout(() => {
      setIsMounted(false);
      // Average ~40 seconds (between 33s and 47s)
      const delay = Math.floor(33000 + Math.random() * 14000);
      nextScheduleTimeoutRef.current = setTimeout(() => {
        // Trigger next show
        setCurrentIndex((prev) => (prev + 1) % LIVE_PURCHASE_NOTIFICATIONS.length);
        setIsMounted(true);
        requestAnimationFrame(() => {
          setTimeout(() => setIsAnimatingIn(true), 20);
        });
        hideTimeoutRef.current = setTimeout(() => {
          dismissNotification();
        }, 5500);
      }, delay);
    }, 500);
  };

  if (!isMounted) return null;

  const currentOrder = LIVE_PURCHASE_NOTIFICATIONS[currentIndex];

  return (
    <div
      className={`fixed top-3 right-3 sm:top-5 sm:right-6 z-50 w-auto max-w-[260px] sm:max-w-[280px] pointer-events-auto transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) transform ${
        isAnimatingIn 
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
          : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2 sm:p-2.5 shadow-xl border-2 border-[#008751] flex items-center justify-between gap-2 text-slate-800">
        
        {/* Compact Flame Badge */}
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-50 text-[#008751] flex items-center justify-center shrink-0 border border-[#008751]/30">
          <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#FF6B00] text-[#FF6B00]" />
        </div>

        {/* Order Details: ONLY Name, Neighborhood, Product, Time (No payment method) */}
        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center gap-1 text-[11px] font-extrabold text-slate-900 truncate">
            <span className="truncate">{currentOrder.name}</span>
            <span className="text-slate-400 font-normal">·</span>
            <span className="text-[#008751] font-bold truncate">{currentOrder.neighborhood}</span>
          </div>
          <p className="text-[10px] text-slate-700 truncate font-semibold leading-tight">
            Pediu {currentOrder.product}
          </p>
          <span className="text-[9px] text-slate-400 font-medium block">
            {currentOrder.timeAgo} · Bauru
          </span>
        </div>

        {/* Close Button */}
        <button
          onClick={dismissNotification}
          className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
          aria-label="Fechar notificação"
        >
          <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </button>

      </div>
    </div>
  );
};
