/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Search, MessageCircle, Sparkles, RefreshCw } from 'lucide-react';
import { Product, CartItem, StoreSettings, BannerConfig } from './types';
import { DEFAULT_PRODUCTS, DEFAULT_SETTINGS, DEFAULT_BANNERS } from './data/defaultProducts';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SideDrawerMenu } from './components/SideDrawerMenu';
import { OutletsSection } from './components/OutletsSection';
import { AdminPanel } from './components/AdminPanel';
import { BrandTrust } from './components/BrandTrust';
import { Footer } from './components/Footer';
import { createGeneralInquiryWhatsAppUrl } from './utils/whatsapp';

export default function App() {
  // Store Settings (with persistent WhatsApp number & admin password)
  const [settings, setSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem('salma_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_SETTINGS,
          ...parsed,
          adminPassword: parsed.adminPassword || 'salma123',
        };
      } catch {
        // fallback
      }
    }
    const legacyNumber = localStorage.getItem('salma_whatsapp_number');
    return legacyNumber
      ? { ...DEFAULT_SETTINGS, whatsappNumber: legacyNumber }
      : DEFAULT_SETTINGS;
  });

  // Banners Configuration (Main Hero & Outlets Banners)
  const [bannerConfig, setBannerConfig] = useState<BannerConfig>(() => {
    const saved = localStorage.getItem('salma_banners');
    if (saved) {
      try {
        return { ...DEFAULT_BANNERS, ...JSON.parse(saved) };
      } catch {
        // fallback
      }
    }
    return DEFAULT_BANNERS;
  });

  // Products (persisted under user's exact key 'salma_products')
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('salma_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((item, idx) => ({
            id: item.id || `sc-custom-${idx}`,
            code: item.code || `SC-${100 + idx}`,
            name: item.name || 'Embroidered Suit',
            price: Number(item.price) || 2850,
            originalPrice: item.originalPrice ? Number(item.originalPrice) : undefined,
            image: item.image || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
            category: item.category || 'Khaddar',
            fabric: item.fabric || '3-Piece Pure Khaddar',
            description: item.description || `${item.name} - Handcrafted Pakistani couture with intricate embroidery.`,
            details: item.details || {
              shirt: 'Embroidered front with dyed back & sleeves',
              dupatta: 'Coordinated designer dupatta (2.5m)',
              trouser: 'Dyed matching trousers (2.5m)',
            },
            inStock: item.inStock !== false,
            featured: item.featured ?? true,
            isNewArrival: item.isNewArrival ?? false,
          }));
        }
      } catch {
        // fallback
      }
    }
    return DEFAULT_PRODUCTS;
  });

  // Shopping Bag / Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('salma_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [];
  });

  // Wishlist State
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('salma_wishlist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [];
  });

  // UI state
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Sync products to localStorage
  useEffect(() => {
    localStorage.setItem('salma_products', JSON.stringify(products));
  }, [products]);

  // Sync settings & WhatsApp number to localStorage
  useEffect(() => {
    localStorage.setItem('salma_settings', JSON.stringify(settings));
    localStorage.setItem('salma_whatsapp_number', settings.whatsappNumber);
  }, [settings]);

  // Sync banners to localStorage
  useEffect(() => {
    localStorage.setItem('salma_banners', JSON.stringify(bannerConfig));
  }, [bannerConfig]);

  // Sync cart
  useEffect(() => {
    localStorage.setItem('salma_cart', JSON.stringify(cart));
  }, [cart]);

  // Sync wishlist
  useEffect(() => {
    localStorage.setItem('salma_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Scroll to section helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Product actions
  const handleAddProduct = (newProductData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...newProductData,
      id: `sc-${Date.now()}`,
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleUpdateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleResetProducts = () => {
    setProducts(DEFAULT_PRODUCTS);
  };

  // Cart actions
  const handleAddToCart = (
    product: Product,
    size: 'Unstitched' | 'Small (S)' | 'Medium (M)' | 'Large (L)' | 'Custom Stitching' = 'Unstitched',
    notes?: string
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += 1;
        if (notes) next[existingIndex].customNotes = notes;
        return next;
      }
      return [...prev, { product, quantity: 1, selectedSize: size, customNotes: notes }];
    });
  };

  const handleUpdateQuantity = (productId: string, size: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedSize === size
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string, size: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.selectedSize === size))
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist actions
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isWishlisted = (productId: string) => wishlist.some((p) => p.id === productId);

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (activeCategory !== 'All' && p.category !== activeCategory) {
          return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesName = p.name.toLowerCase().includes(q);
          const matchesFabric = p.fabric.toLowerCase().includes(q);
          const matchesCode = p.code.toLowerCase().includes(q);
          const matchesCategory = p.category.toLowerCase().includes(q);
          return matchesName || matchesFabric || matchesCode || matchesCategory;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        return 0;
      });
  }, [products, activeCategory, searchQuery, sortBy]);

  const categories = ['All', 'Khaddar', 'Velvet', 'Karandi', 'Linen', 'Chiffon'];

  const floatingWhatsAppUrl = createGeneralInquiryWhatsAppUrl(
    settings.whatsappNumber,
    "Assalam-o-Alaikum! Mujhe Salma's Closet se suits ki maloomat chahiye."
  );

  return (
    <div className="min-h-screen bg-[#F9F6F2] text-[#1A1A1A] flex flex-col font-sans selection:bg-[#1A1A1A] selection:text-white">
      {/* Navbar with Dead Center Logo & Side Menu Trigger */}
      <Navbar
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenSideMenu={() => setSideMenuOpen(true)}
        onOpenOutlets={() => scrollToSection('outlets')}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          scrollToSection('shop');
        }}
        announcementText={settings.announcementText}
        whatsappNumber={settings.whatsappNumber}
      />

      {/* Main Campaign Hero with Centered Logo Presentation */}
      <Hero
        bannerConfig={bannerConfig}
        whatsappNumber={settings.whatsappNumber}
        onShopClick={() => scrollToSection('shop')}
      />

      {/* Product Catalog Section */}
      <main id="shop" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 w-full">
        {/* Section Title & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-medium">
            Curated Autumn & Winter 2026
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 font-normal mt-2 mb-3">
            Handcrafted Eastern Couture
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Select your favorite suit and order immediately via WhatsApp, or add to bag for full Cash on Delivery checkout.
          </p>
        </div>

        {/* Filter Toolbar: Categories, Search, and Sorting */}
        <div className="bg-white border border-[#EAE4DC] p-3 sm:p-4 mb-10 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#1A1A1A] text-white'
                    : 'text-stone-600 hover:text-black hover:bg-stone-100'
                }`}
              >
                {cat === 'All' ? 'All Collections' : cat}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="relative flex-1 md:w-60">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search suits, fabric, code..."
                className="w-full text-xs pl-8 pr-3 py-1.5 border border-stone-300 focus:outline-none focus:border-black bg-stone-50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-stone-400 hover:text-stone-700 text-xs"
                >
                  ×
                </button>
              )}
            </div>

            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort collection by"
                className="text-xs py-1.5 px-3 border border-stone-300 bg-stone-50 text-stone-700 focus:outline-none focus:border-black cursor-pointer uppercase tracking-wider"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count & Active Filter indicator */}
        <div className="flex items-center justify-between text-xs text-stone-500 mb-6 px-1">
          <div>
            Showing <strong className="text-stone-900">{filteredProducts.length}</strong> luxurious designs
            {activeCategory !== 'All' && <span> in <strong>{activeCategory}</strong></span>}
            {searchQuery && <span> matching "<strong>{searchQuery}</strong>"</span>}
          </div>
          {(activeCategory !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="text-amber-900 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Clear Filters</span>
            </button>
          )}
        </div>

        {/* Product Cards Grid: 4 columns */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                whatsappNumber={settings.whatsappNumber}
                isWishlisted={isWishlisted(product.id)}
                onToggleWishlist={handleToggleWishlist}
                onQuickView={(p) => setQuickViewProduct(p)}
                onAddToCart={(p) => handleAddToCart(p, 'Unstitched')}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[#EAE4DC] p-12 text-center max-w-lg mx-auto">
            <Sparkles className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <h3 className="font-serif text-lg text-stone-800 mb-1">No suits match your search</h3>
            <p className="text-xs text-stone-500 mb-5">
              Try searching for "Khaddar", "Velvet", "Karandi" or reset your filters.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="px-5 py-2 bg-black text-white text-xs uppercase tracking-wider cursor-pointer"
            >
              View All Suits
            </button>
          </div>
        )}

        {/* Quick Admin Access Ribbon for Owner */}
        <div className="mt-16 p-4 bg-stone-100 border border-stone-300 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="font-serif text-sm font-semibold text-stone-900 block">
              Boutique Owner Notice (صرف دکان کے مالک کے لیے)
            </span>
            <span className="text-xs text-stone-600">
              نئے سوٹس شامل کرنے، بینرز تبدیل کرنے، یا واٹس ایپ نمبر سیٹ کرنے کے لیے ایڈمن پینل استعمال کریں۔ (پاس ورڈ: salma123)
            </span>
          </div>
          <button
            onClick={() => setAdminOpen(true)}
            className="px-5 py-2 bg-black hover:bg-stone-800 text-white text-xs uppercase tracking-wider font-semibold cursor-pointer shrink-0"
          >
            Open Admin Panel
          </button>
        </div>
      </main>

      {/* SALMA'S OUTLETS & ATELIER (سلمہ آؤٹ لیٹس) with CENTERED LOGO */}
      <OutletsSection
        bannerConfig={bannerConfig}
        whatsappNumber={settings.whatsappNumber}
      />

      {/* Brand Craftsmanship Story (No fake reviews) */}
      <BrandTrust />

      {/* Footer with exact uploaded brand logo */}
      <Footer
        onOpenAdmin={() => setAdminOpen(true)}
        whatsappNumber={settings.whatsappNumber}
      />

      {/* Floating WhatsApp Quick Concierge Button */}
      <aside aria-label="Customer support" className="fixed bottom-6 right-6 z-40">
        <a
          href={floatingWhatsAppUrl}
          target="_blank"
          rel="noreferrer"
          className="group relative flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          title="Direct WhatsApp Chat with Salma's Closet"
        >
          <MessageCircle className="w-6 h-6 fill-current" />
          <span className="hidden sm:inline text-xs font-semibold tracking-wider uppercase">
            Order on WhatsApp
          </span>
        </a>
      </aside>

      {/* Product Detail Modal */}
      <ProductModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        whatsappNumber={settings.whatsappNumber}
        onAddToCart={handleAddToCart}
      />

      {/* Shopping Bag Drawer (with WhatsApp Checkout) */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        whatsappNumber={settings.whatsappNumber}
        freeShippingThreshold={settings.freeShippingThreshold}
        shippingFee={settings.shippingFee}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        items={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={(p) => handleAddToCart(p, 'Unstitched')}
        whatsappNumber={settings.whatsappNumber}
      />

      {/* Side Slide-out Drawer Menu (Requested by user) */}
      <SideDrawerMenu
        isOpen={sideMenuOpen}
        onClose={() => setSideMenuOpen(false)}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          scrollToSection('shop');
        }}
        onOpenOutlets={() => scrollToSection('outlets')}
        onOpenAdmin={() => setAdminOpen(true)}
        whatsappNumber={settings.whatsappNumber}
      />

      {/* Admin Management Panel (with Password Protection and Banner Pictures Management) */}
      <AdminPanel
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        products={products}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onResetProducts={handleResetProducts}
        settings={settings}
        onUpdateSettings={setSettings}
        bannerConfig={bannerConfig}
        onUpdateBanners={setBannerConfig}
      />
    </div>
  );
}
