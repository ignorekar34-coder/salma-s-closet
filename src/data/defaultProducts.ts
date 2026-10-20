import { Product, StoreSettings, BannerConfig } from '../types';
import heroImg from '../assets/images/hero_winter_couture_1792479462287.jpg';
import khaddarBrownImg from '../assets/images/product_khaddar_brown_1792479464610.jpg';
import velvetEmeraldImg from '../assets/images/product_velvet_emerald_1792479465123.jpg';
import navyEmbroideredImg from '../assets/images/product_navy_embroidered_1792479464754.jpg';
import linenRustImg from '../assets/images/product_linen_rust_1792479465108.jpg';

export const DEFAULT_SETTINGS: StoreSettings = {
  whatsappNumber: '923000000000',
  storeName: "SALMA'S CLOSET",
  currency: 'Rs.',
  freeShippingThreshold: 5000,
  shippingFee: 250,
  announcementText: '✨ The Winter Edit 2026 is Live · Free Delivery on orders above Rs. 5,000 · WhatsApp Orders 24/7',
  adminPassword: 'salma123',
};

export const DEFAULT_BANNERS: BannerConfig = {
  heroImage: heroImg,
  heroTitle: 'The Winter Edit',
  heroSubtitle: 'Earthy tones. Timeless silhouettes. Crafted for the season.',
  outletsImage: heroImg,
  outletsTitle: "SALMA'S CLOSET OUTLETS",
  outletsSubtitle: 'Flagship Atelier & Outlets across Lahore, Karachi & Islamabad · Direct WhatsApp Concierge',
};

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'sc-101',
    code: 'SC-101',
    name: 'Brown Khaddar Suit',
    price: 2850,
    originalPrice: 3400,
    image: khaddarBrownImg,
    category: 'Khaddar',
    fabric: '3-Piece Pure Khaddar with Printed Woolen Shawl',
    description: 'Rich earth-toned embroidered khaddar featuring intricate floral neckline needlework and daman border. Paired with a warm printed woolen shawl and dyed khaddar trousers.',
    details: {
      shirt: 'Heavy Embroidered Khaddar Front (1.25m), Plain Back & Sleeves (1.75m)',
      dupatta: 'Premium Printed Warm Wool Shawl (2.5m)',
      trouser: 'Dyed Pure Khaddar Trouser (2.5m)',
    },
    inStock: true,
    featured: true,
    isNewArrival: true,
  },
  {
    id: 'sc-102',
    code: 'SC-102',
    name: 'Navy Embroidered Suit',
    price: 3250,
    originalPrice: 3850,
    image: navyEmbroideredImg,
    category: 'Karandi',
    fabric: '3-Piece Premium Winter Karandi with Resham Embroidery',
    description: 'Timeless midnight navy Karandi ensemble accented with exquisite ivory Resham thread embroidery on sleeves and daman. Comes with an artisanal printed modal shawl.',
    details: {
      shirt: 'Embroidered Winter Karandi Front & Embroidered Sleeve Patches',
      dupatta: 'Digital Printed Soft Modal Dupatta with Gold Borders',
      trouser: 'Matching Dyed Karandi Trouser (2.5m)',
    },
    inStock: true,
    featured: true,
    isNewArrival: true,
  },
  {
    id: 'sc-103',
    code: 'SC-103',
    name: 'Emerald Velvet Formal Suit',
    price: 4850,
    originalPrice: 5600,
    image: velvetEmeraldImg,
    category: 'Velvet',
    fabric: '3-Piece Micro Velvet with Zari & Tilla Embroidery',
    description: 'Regal bottle emerald green heavy micro-velvet shirt with elaborate zari and tilla threadwork. Includes a scalloped organza embroidered dupatta and raw silk trousers.',
    details: {
      shirt: 'Micro-Velvet Embroidered Front, Daman Lace & Neckline Motif',
      dupatta: 'Delicate Embroidered Net Organza Dupatta with 4-side borders',
      trouser: 'Dyed Korean Raw Silk Trouser',
    },
    inStock: true,
    featured: true,
    isNewArrival: true,
  },
  {
    id: 'sc-104',
    code: 'SC-104',
    name: 'Terracotta Rust Embroidered Linen',
    price: 3450,
    originalPrice: 4100,
    image: linenRustImg,
    category: 'Linen',
    fabric: '3-Piece Slub Linen with Contrast Printed Silk Dupatta',
    description: 'Warm terracotta rust linen suit with ochre gold needlework and delicate neckline stitching. Paired with a contrast printed vintage dupatta and tailored pants fabric.',
    details: {
      shirt: 'Slub Linen Embroidered Front Panel & Printed Sleeves',
      dupatta: 'Contrast Vintage Floral Printed Silk Dupatta (2.5m)',
      trouser: 'Dyed Matching Slub Linen Trouser',
    },
    inStock: true,
    featured: true,
    isNewArrival: false,
  },
];

export const PRESET_SAMPLE_IMAGES = [
  { label: 'Brown Khaddar', url: khaddarBrownImg },
  { label: 'Navy Karandi', url: navyEmbroideredImg },
  { label: 'Emerald Velvet', url: velvetEmeraldImg },
  { label: 'Terracotta Linen', url: linenRustImg },
  { label: 'Winter Campaign Hero', url: heroImg },
];
