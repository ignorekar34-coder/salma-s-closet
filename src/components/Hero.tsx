import React from 'react';
import { ArrowDown, MessageCircle } from 'lucide-react';
import { BannerConfig } from '../types';
import { createGeneralInquiryWhatsAppUrl } from '../utils/whatsapp';

interface HeroProps {
  bannerConfig: BannerConfig;
  onShopClick: () => void;
  whatsappNumber: string;
}

export const Hero: React.FC<HeroProps> = ({ bannerConfig, onShopClick, whatsappNumber }) => {
  const whatsappInquiryUrl = createGeneralInquiryWhatsAppUrl(
    whatsappNumber,
    `Assalam-o-Alaikum! Mujhe Salma's Closet ${bannerConfig.heroTitle} collection ke bare mein poochna hai.`
  );

  return (
    <div className="relative w-full h-[80vh] min-h-[600px] overflow-hidden flex items-center bg-[#1A1A1A]">
      {/* Background Campaign Image */}
      <img
        src={bannerConfig.heroImage}
        alt={bannerConfig.heroTitle}
        className="absolute inset-0 w-full h-full object-cover object-center"
        referrerPolicy="no-referrer"
      />

      {/* Dark Gradient only on left side - NOT ON FACE (Leaves model face on right completely clean) */}
      <div className="absolute inset-0 z-1 pointer-events-none bg-gradient-to-r from-black/75 via-black/40 via-45% to-transparent to-75%" />

      {/* Content - Aligned Left to keep face clean */}
      <div className="relative z-2 max-w-[580px] text-white px-6 sm:px-10 lg:pl-[6%] py-12">
        <p className="text-[#E6C78A] text-xs sm:text-[13px] tracking-[4px] uppercase m-0 mb-5 border-b border-[#E6C78A] inline-block pb-2 font-medium">
          HAUTE COUTURE WINTER 2026 COLLECTION
        </p>

        <h2 className="font-serif text-4xl sm:text-6xl lg:text-[68px] leading-[1.05] sm:leading-none my-4 font-normal text-white text-balance">
          {bannerConfig.heroTitle}
        </h2>

        <p className="font-sans text-stone-200 text-sm sm:text-base leading-relaxed my-5 font-light">
          {bannerConfig.heroSubtitle}
        </p>

        <div className="mt-8 flex gap-3.5 flex-wrap items-center">
          <button
            onClick={onShopClick}
            className="bg-[#F5EFE6] text-[#3E2B24] hover:bg-white px-7 py-4 text-xs tracking-[2px] uppercase font-semibold rounded-[6px] shadow-md transition-all cursor-pointer"
          >
            SHOP NEW ARRIVALS
          </button>

          <a
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-[#2A7F6F] hover:bg-[#236c5e] text-white px-7 py-4 text-xs tracking-[2px] uppercase font-semibold rounded-[6px] shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>ORDER ON WHATSAPP</span>
          </a>
        </div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <button
        onClick={onShopClick}
        aria-label="Scroll to collection"
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 text-white/60 hover:text-white transition-colors p-2 cursor-pointer"
      >
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </button>
    </div>
  );
};
