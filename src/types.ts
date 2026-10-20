export interface Product {
  id: string;
  name: string;
  code: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'Khaddar' | 'Velvet' | 'Linen' | 'Karandi' | 'Chiffon' | 'Cotton' | 'Pret';
  fabric: string; // e.g. "3-Piece Pure Khaddar with Wool Shawl"
  description: string;
  details: {
    shirt: string;
    dupatta: string;
    trouser: string;
  };
  inStock: boolean;
  featured?: boolean;
  isNewArrival?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: 'Unstitched' | 'Small (S)' | 'Medium (M)' | 'Large (L)' | 'Custom Stitching';
  customNotes?: string;
}

export interface BannerConfig {
  heroImage: string;
  heroTitle: string;
  heroSubtitle: string;
  outletsImage: string;
  outletsTitle: string;
  outletsSubtitle: string;
}

export interface StoreSettings {
  whatsappNumber: string; // e.g., "923000000000"
  storeName: string;
  currency: string;
  freeShippingThreshold: number;
  shippingFee: number;
  announcementText: string;
  adminPassword: string; // Default 'salma123'
}
