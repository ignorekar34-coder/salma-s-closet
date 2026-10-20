import React from 'react';
import { MapPin, Phone, Clock, MessageCircle, Sparkles } from 'lucide-react';
import { EXACT_LOGO_URL } from './Navbar';
import { BannerConfig } from '../types';

interface OutletsSectionProps {
  bannerConfig: BannerConfig;
  whatsappNumber: string;
}

export const OutletsSection: React.FC<OutletsSectionProps> = ({ bannerConfig, whatsappNumber }) => {
  const outlets = [
    {
      city: 'Lahore (لاہور)',
      title: 'Flagship Atelier & Studio',
      address: 'Near MM Alam Road, Gulberg III, Lahore',
      timing: 'Mon - Sat: 11:30 AM - 10:00 PM',
      phone: '+92 300 1234567',
      specialty: 'Complete Winter Khaddar, Custom Stitching & Velvet Showcase',
    },
    {
      city: 'Karachi (کراچی)',
      title: 'Clifton Boutique Outlet',
      address: 'Block 4, Clifton (Near Dolmen), Karachi',
      timing: 'Daily: 12:00 PM - 10:30 PM',
      phone: '+92 300 7654321',
      specialty: 'Ready-to-Wear Prêt, Luxury Karandi & Linen Suits',
    },
    {
      city: 'Islamabad (اسلام آباد)',
      title: 'Capital Gallery',
      address: 'Beverly Centre, Blue Area, F-6/1, Islamabad',
      timing: 'Mon - Sun: 11:00 AM - 9:30 PM',
      phone: '+92 300 9876543',
      specialty: 'Exclusive Velvet Shawls & Festive Chiffon Formals',
    },
  ];

  return (
    <section id="outlets" className="py-20 bg-white border-t border-[#EAE4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CENTERED LOGO & OUTLETS HEADER */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-900 font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-800" />
            <span>Atelier & Retail Presence</span>
          </div>

          {/* EXACT UPLOADED LOGO FEATURED IN THE DEAD CENTER */}
          <div className="my-4 py-3 flex justify-center">
            <div className="p-3 bg-[#FAF8F5] border border-stone-200 inline-block shadow-xs">
              <img
                src={EXACT_LOGO_URL}
                alt="SALMA'S CLOSET"
                className="h-14 sm:h-20 w-auto object-contain mix-blend-multiply transition-transform hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 mb-3 font-normal">
            سلمہ آؤٹ لیٹس (Salma's Outlets & Boutiques)
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed max-w-xl mx-auto">
            {bannerConfig.outletsSubtitle}
          </p>
        </div>

        {/* Outlets Banner Image (Customizable by Owner in Admin) */}
        {bannerConfig.outletsImage && (
          <div className="mb-14 overflow-hidden relative max-h-[360px] border border-stone-200 shadow-sm group">
            <img
              src={bannerConfig.outletsImage}
              alt="Salma's Outlets"
              className="w-full h-full object-cover object-center brightness-[0.85] transition-transform duration-700 group-hover:scale-102"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6 sm:p-10">
              <div className="text-white">
                <span className="text-xs uppercase tracking-[0.2em] text-amber-200 font-medium block mb-1">
                  Private Appointments & In-Store Experience
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                  {bannerConfig.outletsTitle}
                </h3>
              </div>
            </div>
          </div>
        )}

        {/* 3 Outlets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {outlets.map((outlet, index) => (
            <div
              key={index}
              className="bg-[#FAF8F5] p-6 border border-[#EDE7DF] flex flex-col justify-between hover:border-black transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3 border-b border-stone-200 pb-2">
                  <span className="text-xs uppercase tracking-wider font-semibold text-stone-900 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-900" />
                    <span>{outlet.city}</span>
                  </span>
                  <span className="text-[10px] text-stone-500 font-mono">Outlet #{index + 1}</span>
                </div>

                <h4 className="font-serif text-base text-stone-900 font-medium mb-2">
                  {outlet.title}
                </h4>

                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  {outlet.address}
                </p>

                <div className="text-xs text-stone-600 space-y-1.5 mb-4">
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <Clock className="w-3 h-3 text-stone-500" />
                    <span>{outlet.timing}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <Phone className="w-3 h-3 text-stone-500" />
                    <span>{outlet.phone}</span>
                  </div>
                </div>

                <div className="text-[11px] bg-white p-2.5 border border-stone-200 text-stone-700">
                  <strong className="text-stone-900 block mb-0.5">Speciality:</strong>
                  {outlet.specialty}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-stone-200">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Assalam-o-Alaikum! Mujhe Salma's Closet ${outlet.city} outlet ke baare mein maloomat chahiye.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 bg-white hover:bg-black hover:text-white text-stone-900 border border-stone-300 text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Outlet WhatsApp Query</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Worldwide Dispatch Banner */}
        <div className="p-6 bg-[#1A1A1A] text-white flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h4 className="font-serif text-lg font-normal mb-1">
              Can't visit our outlets? Shop via WhatsApp 24/7!
            </h4>
            <p className="text-xs text-stone-400">
              Free home delivery across Pakistan via Cash on Delivery (COD) · Worldwide DHL express dispatch to UK, USA, UAE & Canada.
            </p>
          </div>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs uppercase tracking-wider font-semibold flex items-center gap-2 shrink-0 transition-colors shadow-md"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chat with Salma</span>
          </a>
        </div>
      </div>
    </section>
  );
};
