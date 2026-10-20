import React from 'react';
import { MessageCircle, Phone, MapPin, ShieldCheck, Heart } from 'lucide-react';
import { EXACT_LOGO_URL } from './Navbar';

interface FooterProps {
  onOpenAdmin: () => void;
  whatsappNumber: string;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, whatsappNumber }) => {
  return (
    <footer className="bg-[#1A1A1A] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Col 1: Brand & Logo */}
          <div className="space-y-4">
            <div className="bg-white p-3 inline-block rounded-none shadow-sm">
              <img
                src={EXACT_LOGO_URL}
                alt="SALMA'S CLOSET"
                className="h-9 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Curators of authentic Pakistani winter couture, heavy embroidered suits, luxurious velvet ensembles, and unstitched luxury fabrics.
            </p>
            <div className="pt-2">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#25D366] text-white text-xs font-semibold tracking-wider uppercase transition-colors hover:bg-[#20ba5a]"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Col 2: Collections */}
          <div>
            <h4 className="font-serif text-sm text-white font-medium tracking-wider uppercase mb-4">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#shop" className="hover:text-white transition-colors">
                  Winter Edit 2026
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-white transition-colors">
                  Pure Khaddar 3-Piece
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-white transition-colors">
                  Royal Velvet Shawl Ensembles
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-white transition-colors">
                  Embroidered Karandi & Linen
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-white transition-colors">
                  Festive Formals & Chiffon
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Ordering */}
          <div>
            <h4 className="font-serif text-sm text-white font-medium tracking-wider uppercase mb-4">
              Boutique Care
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Cash on Delivery (COD) Nationwide</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Lahore · Karachi · Islamabad & All Cities</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span>Direct WhatsApp Helpline: +{whatsappNumber}</span>
              </li>
              <li>
                <span>International Delivery via DHL Available</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Store Admin & Portal */}
          <div>
            <h4 className="font-serif text-sm text-white font-medium tracking-wider uppercase mb-4">
              Merchant Access
            </h4>
            <p className="text-xs text-stone-400 mb-3">
              Store Owner panel to add new suits, edit prices, update images, and manage WhatsApp orders.
            </p>
            <button
              onClick={onOpenAdmin}
              className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs uppercase tracking-wider font-medium border border-stone-700 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>ایڈمن پینل (Admin Portal)</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} SALMA'S CLOSET. All Rights Reserved. Crafted with care.</p>
          <div className="flex items-center gap-4 text-xs">
            <span>Cash on Delivery</span>
            <span>·</span>
            <span>Bank Transfer</span>
            <span>·</span>
            <span>EasyPaisa</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
