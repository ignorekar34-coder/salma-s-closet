import React from 'react';
import { ShoppingBag, Heart, Lock, Menu, MapPin } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAdmin: () => void;
  onOpenSideMenu: () => void;
  onOpenOutlets: () => void;
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  announcementText: string;
  whatsappNumber: string;
}

export const EXACT_LOGO_URL = '/assets/aistudio/WhatsApp_Image_2026-10-20_at_11.52.11_AM_ca2153ef.jpeg';

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenAdmin,
  onOpenSideMenu,
  onOpenOutlets,
  activeCategory,
  onSelectCategory,
  whatsappNumber,
}) => {
  // Format WhatsApp number for display (e.g. 0300-0000000)
  const displayPhone = whatsappNumber.startsWith('92')
    ? '0' + whatsappNumber.slice(2)
    : whatsappNumber;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#EEEEEE] shadow-xs">
      {/* User's Exact Top Bar styling */}
      <div className="bg-[#3E2B24] text-[#F5EFE6] text-center py-2 px-4 text-[13px] font-sans tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span>Free Delivery on orders above Rs. 5,000</span>
          <span>-</span>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-amber-200 transition-colors font-medium underline underline-offset-2"
          >
            WhatsApp: {displayPhone}
          </a>
        </div>
      </div>

      {/* Main Header - LOGO BIGGER & CLEAN in the Center */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex items-center justify-between">
        {/* Left Side: Side Menu Trigger & Quick Links */}
        <div className="flex-1 flex items-center gap-4 sm:gap-6 justify-start">
          <button
            onClick={onOpenSideMenu}
            className="flex items-center gap-2 text-[#3E2B24] hover:text-black transition-colors cursor-pointer group py-1.5"
            aria-label="Open Side Menu"
          >
            <Menu className="w-5 h-5 text-[#3E2B24] group-hover:scale-110 transition-transform" />
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#3E2B24]">
              Menu
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-5 text-xs uppercase tracking-[0.18em] font-medium text-stone-700">
            <button
              onClick={() => onSelectCategory('All')}
              className={`hover:text-[#3E2B24] transition-colors cursor-pointer py-1 ${
                activeCategory === 'All' ? 'text-[#3E2B24] font-bold border-b border-[#3E2B24]' : ''
              }`}
            >
              Suits
            </button>
            <button
              onClick={() => onSelectCategory('Khaddar')}
              className={`hover:text-[#3E2B24] transition-colors cursor-pointer py-1 ${
                activeCategory === 'Khaddar' ? 'text-[#3E2B24] font-bold border-b border-[#3E2B24]' : ''
              }`}
            >
              Khaddar
            </button>
            <button
              onClick={() => onSelectCategory('Velvet')}
              className={`hover:text-[#3E2B24] transition-colors cursor-pointer py-1 ${
                activeCategory === 'Velvet' ? 'text-[#3E2B24] font-bold border-b border-[#3E2B24]' : ''
              }`}
            >
              Velvet
            </button>
            <button
              onClick={onOpenOutlets}
              className="hover:text-[#3E2B24] transition-colors cursor-pointer py-1 text-[#3E2B24] font-semibold flex items-center gap-1"
            >
              <MapPin className="w-3.5 h-3.5 text-[#3E2B24]" />
              <span>سلمہ آؤٹ لیٹس</span>
            </button>
          </nav>
        </div>

        {/* Center: The Exact Uploaded Logo (BIGGER & CLEAN) */}
        <div className="flex shrink-0 items-center justify-center">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('All');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center justify-center group"
            title="SALMA'S CLOSET"
          >
            <img
              src={EXACT_LOGO_URL}
              alt="SALMA'S CLOSET"
              className="h-12 sm:h-16 md:h-20 w-auto object-contain mix-blend-multiply transition-transform duration-200 group-hover:scale-102"
              referrerPolicy="no-referrer"
            />
          </a>
        </div>

        {/* Right Side: Wishlist, Shopping Bag & Admin Portal */}
        <div className="flex-1 flex items-center gap-2.5 sm:gap-4 justify-end">
          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-stone-700 hover:text-[#3E2B24] transition-colors rounded-full hover:bg-stone-100"
            title="Saved Suits"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5 stroke-[1.6]" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#3E2B24] text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Bag Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 bg-[#3E2B24] hover:bg-black text-[#F5EFE6] px-3.5 py-2.5 rounded-[4px] text-xs font-medium tracking-wider uppercase transition-all shadow-xs cursor-pointer"
            aria-label="Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Bag</span>
            <span className="bg-white/20 text-white px-1.5 py-0.5 text-[11px] rounded font-mono font-medium">
              {cartCount}
            </span>
          </button>

          {/* Admin Lock Button */}
          <button
            onClick={onOpenAdmin}
            className="p-2 text-stone-600 hover:text-stone-900 transition-colors border border-stone-300 text-[11px] tracking-wider uppercase flex items-center gap-1.5 hover:border-[#3E2B24] bg-stone-50 cursor-pointer rounded-[4px]"
            title="Admin Login / ایڈمن پاس ورڈ"
          >
            <Lock className="w-3.5 h-3.5 text-stone-700" />
            <span className="hidden md:inline">Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
};
