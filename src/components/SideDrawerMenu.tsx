import React from 'react';
import { X, MessageCircle, MapPin, ShieldCheck, Lock, ChevronRight, Phone } from 'lucide-react';
import { EXACT_LOGO_URL } from './Navbar';

interface SideDrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (category: string) => void;
  onOpenOutlets: () => void;
  onOpenAdmin: () => void;
  whatsappNumber: string;
}

export const SideDrawerMenu: React.FC<SideDrawerMenuProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
  onOpenOutlets,
  onOpenAdmin,
  whatsappNumber,
}) => {
  if (!isOpen) return null;

  const categories = [
    { label: 'All Collections (تمام سوٹس)', key: 'All' },
    { label: 'Winter Khaddar Edit (کھدر کلیکشن)', key: 'Khaddar' },
    { label: 'Velvet Luxe Formals (مائیکرو ویلوٹ)', key: 'Velvet' },
    { label: 'Karandi & Slub Linen (کرنڈی و لائلن)', key: 'Karandi' },
    { label: 'Festive Chiffon & Prêt (شیفون)', key: 'Chiffon' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-start">
      <div
        className="w-full max-w-sm bg-[#F9F6F2] h-full shadow-2xl flex flex-col border-r border-stone-300 animate-slideRight"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header with Exact Logo in center */}
        <div className="p-5 border-b border-stone-300 bg-white flex items-center justify-between">
          <div className="flex-1 flex justify-center">
            <img
              src={EXACT_LOGO_URL}
              alt="SALMA'S CLOSET"
              className="h-9 w-auto object-contain mix-blend-multiply"
            />
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-black transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Menu Navigation Links */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Main Links */}
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-amber-900 font-semibold block mb-2">
              Collections & Fabrics
            </span>
            <div className="divide-y divide-stone-200 border-y border-stone-200">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => {
                    onSelectCategory(cat.key);
                    onClose();
                  }}
                  className="w-full py-3 text-left text-xs uppercase tracking-wider font-medium text-stone-800 hover:text-black hover:translate-x-1 transition-all flex items-center justify-between cursor-pointer"
                >
                  <span>{cat.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                </button>
              ))}
            </div>
          </div>

          {/* Salma's Outlets Highlight */}
          <div className="bg-white p-4 border border-stone-300">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-amber-900" />
              <span className="text-xs uppercase tracking-wider font-semibold text-stone-900">
                سلمہ آؤٹ لیٹس (Salma's Outlets)
              </span>
            </div>
            <p className="text-xs text-stone-600 mb-3 leading-relaxed">
              Experience our fabrics in person at our flagship outlets in Lahore, Karachi & Islamabad, or place orders via WhatsApp.
            </p>
            <button
              onClick={() => {
                onOpenOutlets();
                onClose();
              }}
              className="w-full py-2 bg-stone-900 text-white text-xs uppercase tracking-wider font-medium hover:bg-black transition-colors cursor-pointer"
            >
              View Outlets & Atelier
            </button>
          </div>

          {/* WhatsApp Direct Help */}
          <div className="bg-[#25D366]/10 border border-[#25D366]/30 p-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-900 block mb-1">
              WhatsApp Order & Care
            </span>
            <p className="text-xs text-emerald-800 mb-3">
              Need custom measurements, video closeups, or urgent dispatch? Chat with Salma directly.
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Direct WhatsApp Chat</span>
            </a>
          </div>

          {/* Trust points */}
          <div className="space-y-2 text-xs text-stone-600 pt-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-stone-800" />
              <span>Cash on Delivery (COD) All Pakistan</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-stone-800" />
              <span>Helpline: +{whatsappNumber}</span>
            </div>
          </div>
        </div>

        {/* Drawer Footer: Admin Access */}
        <div className="p-4 border-t border-stone-300 bg-white">
          <button
            onClick={() => {
              onOpenAdmin();
              onClose();
            }}
            className="w-full py-2.5 border border-stone-400 text-stone-800 hover:bg-black hover:text-white hover:border-black text-xs uppercase tracking-wider font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Admin Portal (ایڈمن لاگ ان)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
