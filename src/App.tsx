/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { ProductSelector } from './components/ProductSelector';
import { DepotsMapSection } from './components/DepotsMapSection';
import { GasDoPovoSection } from './components/GasDoPovoSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { LiveNotification } from './components/LiveNotification';
import { FloatingScrollContacts } from './components/FloatingScrollContacts';
import { ReviewsProvider } from './context/ReviewsContext';

export default function App() {
  // Smooth scroll helper to order section
  const scrollToOrder = () => {
    const el = document.getElementById('produtos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Smooth scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <ReviewsProvider>
      <div className="min-h-screen bg-[#F1F4F9] text-slate-900 antialiased selection:bg-[#008751] selection:text-white flex flex-col justify-between">
        
        {/* Top Header with Official Gás Brasil Logo and non-wrapping mobile phone number */}
        <Header onOrderClick={scrollToOrder} />

        {/* Live Social Proof Push Notifications at Top-Right with smooth enter & exit */}
        <LiveNotification />

        {/* Floating Contact Buttons on Scroll */}
        <FloatingScrollContacts onOrderClick={scrollToOrder} />

        {/* Main Landing Page Flow */}
        <main className="flex-1 space-y-4">
          
          {/* Full-width 6-slide Hero Carousel & Natural Feature Trust Strip */}
          <HeroCarousel onOrderClick={scrollToOrder} />

          {/* Gas Product Selection with Isolated Photos & Natural WhatsApp Order */}
          <div className="scroll-reveal">
            <ProductSelector />
          </div>

          {/* The 2 Official Depots in Bauru with Interactive Map & Direct Route Buttons */}
          <div className="scroll-reveal">
            <DepotsMapSection />
          </div>

          {/* Gás do Povo Social Program with Attached Image & 3x Card Installment Info */}
          <div className="scroll-reveal">
            <GasDoPovoSection onOrderClick={scrollToOrder} />
          </div>

          {/* Google and On-Site Real-time Reviews */}
          <div className="scroll-reveal">
            <ReviewsSection />
          </div>

        </main>

        {/* Institutional Footer */}
        <Footer />

      </div>
    </ReviewsProvider>
  );
}
