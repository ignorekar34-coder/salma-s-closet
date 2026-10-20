import React from 'react';
import { Sparkles, Shield, Clock, HeartHandshake } from 'lucide-react';

export const BrandTrust: React.FC = () => {
  return (
    <section id="story" className="py-20 border-t border-[#EAE4DC] bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Atelier Story Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-amber-900 font-semibold block mb-3">
            The Atelier & Heritage
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 mb-6 font-normal">
            Rooted in Tradition, Crafted for the Modern Wardrobe
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            SALMA’S CLOSET is dedicated to authentic Pakistani handloom textiles, rich winter weaves, and detailed artisanal embroidery. Every ensemble in our collection is curated to honor the timeless grace of Eastern silhouette.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 border border-[#EDE7DF] text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-stone-100 flex items-center justify-center text-stone-800">
              <Sparkles className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-base text-stone-900 mb-2 font-medium">Authentic Weaves</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Strictly pure Khaddar, micro-velvet, slub linen, and winter Karandi with guaranteed durability.
            </p>
          </div>

          <div className="bg-white p-6 border border-[#EDE7DF] text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-stone-100 flex items-center justify-center text-stone-800">
              <HeartHandshake className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-base text-stone-900 mb-2 font-medium">1-on-1 WhatsApp Service</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Direct consultation with our boutique stylists for size guidance, video closeups, and customization.
            </p>
          </div>

          <div className="bg-white p-6 border border-[#EDE7DF] text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-stone-100 flex items-center justify-center text-stone-800">
              <Shield className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-base text-stone-900 mb-2 font-medium">Cash on Delivery (COD)</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Shop with total peace of mind. Pay when your parcel arrives safely at your doorstep anywhere in Pakistan.
            </p>
          </div>

          <div className="bg-white p-6 border border-[#EDE7DF] text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-stone-100 flex items-center justify-center text-stone-800">
              <Clock className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-base text-stone-900 mb-2 font-medium">Swift Dispatch</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Orders dispatched within 24–48 hours via top couriers with live tracking provided directly on WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
