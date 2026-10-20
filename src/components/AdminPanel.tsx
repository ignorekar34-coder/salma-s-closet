import React, { useState } from 'react';
import {
  X,
  Plus,
  Edit2,
  Trash2,
  Phone,
  Save,
  RotateCcw,
  Image,
  Check,
  Lock,
  Unlock,
  KeyRound,
  LayoutTemplate,
  ShoppingBag,
} from 'lucide-react';
import { Product, StoreSettings, BannerConfig } from '../types';
import { PRESET_SAMPLE_IMAGES } from '../data/defaultProducts';
import { sanitizePhoneNumber } from '../utils/whatsapp';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onResetProducts: () => void;
  settings: StoreSettings;
  onUpdateSettings: (settings: StoreSettings) => void;
  bannerConfig: BannerConfig;
  onUpdateBanners: (banners: BannerConfig) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onResetProducts,
  settings,
  onUpdateSettings,
  bannerConfig,
  onUpdateBanners,
}) => {
  // Password Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  // Tab State
  const [activeTab, setActiveTab] = useState<'products' | 'banners' | 'whatsapp' | 'settings'>('products');

  // Product Form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState<Product['category']>('Khaddar');
  const [fabric, setFabric] = useState('3-Piece Pure Khaddar');
  const [description, setDescription] = useState('');
  const [shirt, setShirt] = useState('');
  const [dupatta, setDupatta] = useState('');
  const [trouser, setTrouser] = useState('');
  const [inStock, setInStock] = useState(true);

  // Banner State
  const [heroImage, setHeroImage] = useState(bannerConfig.heroImage);
  const [heroTitle, setHeroTitle] = useState(bannerConfig.heroTitle);
  const [heroSubtitle, setHeroSubtitle] = useState(bannerConfig.heroSubtitle);
  const [outletsImage, setOutletsImage] = useState(bannerConfig.outletsImage);
  const [outletsTitle, setOutletsTitle] = useState(bannerConfig.outletsTitle);
  const [outletsSubtitle, setOutletsSubtitle] = useState(bannerConfig.outletsSubtitle);

  // Settings form state
  const [waNumber, setWaNumber] = useState(settings.whatsappNumber);
  const [announcement, setAnnouncement] = useState(settings.announcementText);
  const [freeShip, setFreeShip] = useState(settings.freeShippingThreshold.toString());
  const [newAdminPassword, setNewAdminPassword] = useState(settings.adminPassword || 'salma123');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const showStatus = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === (settings.adminPassword || 'salma123')) {
      setIsAuthenticated(true);
      setPasswordError(false);
      setPasswordInput('');
    } else {
      setPasswordError(true);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setPrice('');
    setOriginalPrice('');
    setImage('');
    setCategory('Khaddar');
    setFabric('3-Piece Pure Khaddar');
    setDescription('');
    setShirt('');
    setDupatta('');
    setTrouser('');
    setInStock(true);
  };

  const handleEditClick = (p: Product) => {
    setEditingId(p.id);
    setName(p.name);
    setPrice(p.price.toString());
    setOriginalPrice(p.originalPrice ? p.originalPrice.toString() : '');
    setImage(p.image);
    setCategory(p.category);
    setFabric(p.fabric);
    setDescription(p.description);
    setShirt(p.details.shirt);
    setDupatta(p.details.dupatta);
    setTrouser(p.details.trouser);
    setInStock(p.inStock);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImage(reader.result);
          showStatus('سوٹ کی تصویر اپلوڈ ہو گئی!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHeroBannerFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setHeroImage(reader.result);
          showStatus('ہیرو بینر کی تصویر اپلوڈ ہو گئی!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOutletsBannerFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setOutletsImage(reader.result);
          showStatus('آؤٹ لیٹس بینر کی تصویر اپلوڈ ہو گئی!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price || !image.trim()) {
      showStatus('براہِ کرم Name, Price اور Image ضرور درج کریں!');
      return;
    }

    const numPrice = Number(price);
    const numOrig = originalPrice ? Number(originalPrice) : undefined;

    if (editingId) {
      const existing = products.find((p) => p.id === editingId);
      if (existing) {
        onUpdateProduct({
          ...existing,
          name: name.trim(),
          price: numPrice,
          originalPrice: numOrig,
          image: image.trim(),
          category,
          fabric: fabric.trim() || '3-Piece Eastern Suit',
          description: description.trim() || `${name} - Exclusive designer wear crafted with premium fabric.`,
          details: {
            shirt: shirt.trim() || 'Embroidered front with dyed back & sleeves',
            dupatta: dupatta.trim() || 'Coordinated designer dupatta',
            trouser: trouser.trim() || 'Dyed matching trousers',
          },
          inStock,
        });
        showStatus('Product کامیابی سے اپ ڈیٹ ہو گیا!');
      }
    } else {
      const code = `SC-${Math.floor(100 + Math.random() * 900)}`;
      onAddProduct({
        code,
        name: name.trim(),
        price: numPrice,
        originalPrice: numOrig,
        image: image.trim(),
        category,
        fabric: fabric.trim() || '3-Piece Eastern Suit',
        description: description.trim() || `${name} - Exclusive designer wear crafted with premium fabric.`,
        details: {
          shirt: shirt.trim() || 'Embroidered front with dyed back & sleeves',
          dupatta: dupatta.trim() || 'Coordinated designer dupatta',
          trouser: trouser.trim() || 'Dyed matching trousers',
        },
        inStock,
        featured: true,
        isNewArrival: true,
      });
      showStatus('نیا سوٹ کامیابی سے Add ہو گیا!');
    }

    resetForm();
  };

  const handleSaveBanners = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateBanners({
      heroImage: heroImage.trim() || bannerConfig.heroImage,
      heroTitle: heroTitle.trim() || 'The Winter Edit',
      heroSubtitle: heroSubtitle.trim() || 'Earthy tones. Timeless silhouettes. Crafted for the season.',
      outletsImage: outletsImage.trim() || bannerConfig.outletsImage,
      outletsTitle: outletsTitle.trim() || "SALMA'S CLOSET OUTLETS",
      outletsSubtitle: outletsSubtitle.trim() || 'Flagship Atelier & Outlets across Lahore, Karachi & Islamabad',
    });
    showStatus('تمام بینرز کی تصاویر اور ٹائٹل محفوظ ہو گئے!');
  };

  const handleSaveSettings = () => {
    const cleanedPhone = sanitizePhoneNumber(waNumber);
    onUpdateSettings({
      ...settings,
      whatsappNumber: cleanedPhone,
      announcementText: announcement,
      freeShippingThreshold: Number(freeShip) || 5000,
      adminPassword: newAdminPassword.trim() || 'salma123',
    });
    setWaNumber(cleanedPhone);
    showStatus('سیٹنگز اور ایڈمن پاس ورڈ محفوظ ہو گئے!');
  };

  const handleTestWhatsApp = () => {
    const cleaned = sanitizePhoneNumber(waNumber);
    const msg = encodeURIComponent("Assalam-o-Alaikum! Ye SALMA'S CLOSET boutique ka WhatsApp test message hai. System theek chal raha hai.");
    window.open(`https://wa.me/${cleaned}?text=${msg}`, '_blank');
  };

  // If NOT authenticated yet, show password prompt
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
        <div
          className="bg-white w-full max-w-md p-6 sm:p-8 shadow-2xl border border-stone-300 relative text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-stone-400 hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 bg-stone-100 text-stone-900 mx-auto rounded-full flex items-center justify-center mb-4">
            <Lock className="w-6 h-6" />
          </div>

          <h3 className="font-serif text-2xl text-stone-900 font-semibold mb-1">
            ایڈمن پاس ورڈ درج کریں
          </h3>
          <p className="text-xs uppercase tracking-wider text-stone-500 mb-6">
            SALMA'S CLOSET Boutique Admin Portal
          </p>

          {passwordError && (
            <div className="mb-4 p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs text-left">
              غلط پاس ورڈ! برائے مہربانی درست پاس ورڈ درج کریں۔
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="text-left">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                Admin Password
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password..."
                autoFocus
                className="w-full p-2.5 border border-stone-300 focus:outline-none focus:border-black text-sm bg-stone-50"
              />
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 text-[11px] text-amber-900 text-left">
              <strong>ڈیفالٹ پاس ورڈ:</strong> <code className="bg-white px-1 py-0.5 font-bold font-mono">salma123</code>
              <div className="text-stone-600 mt-0.5">
                (لاگ ان ہونے کے بعد آپ سیٹنگز میں جا کر پاس ورڈ تبدیل بھی کر سکتے ہیں)
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-black hover:bg-stone-800 text-white text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              <span>لاگ ان کریں (Unlock Admin)</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-[#F9F6F2] w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-300 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-6 border-b border-stone-300 bg-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-widest text-amber-900 font-semibold">
                Boutique Owner Portal
              </span>
              <span>·</span>
              <span className="text-xs text-stone-500">ایڈمن پینل</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl text-stone-900 font-semibold">
              SALMA'S CLOSET Store Management
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-500 hover:text-black hover:bg-stone-100 transition-colors"
            aria-label="Close admin"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Toast */}
        {statusMessage && (
          <div className="bg-emerald-800 text-white text-xs px-4 py-2.5 flex items-center justify-between font-medium">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>{statusMessage}</span>
            </span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-300 bg-stone-100 text-xs uppercase tracking-wider font-medium overflow-x-auto">
          <button
            onClick={() => setActiveTab('products')}
            className={`py-3 px-4 sm:px-5 whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeTab === 'products'
                ? 'bg-white border-b-2 border-black text-black font-semibold'
                : 'text-stone-600 hover:text-black'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Suits Management ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('banners')}
            className={`py-3 px-4 sm:px-5 whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeTab === 'banners'
                ? 'bg-white border-b-2 border-black text-black font-semibold'
                : 'text-stone-600 hover:text-black'
            }`}
          >
            <LayoutTemplate className="w-3.5 h-3.5" />
            <span>بینرز کی تصاویر (Banners)</span>
          </button>

          <button
            onClick={() => setActiveTab('whatsapp')}
            className={`py-3 px-4 sm:px-5 whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeTab === 'whatsapp'
                ? 'bg-white border-b-2 border-black text-black font-semibold'
                : 'text-stone-600 hover:text-black'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>WhatsApp Business</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 px-4 sm:px-5 whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeTab === 'settings'
                ? 'bg-white border-b-2 border-black text-black font-semibold'
                : 'text-stone-600 hover:text-black'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>پاس ورڈ و سیٹنگز</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-8">
          {/* TAB 1: PRODUCTS */}
          {activeTab === 'products' && (
            <>
              {/* Product Add / Edit Form */}
              <div className="bg-white p-5 border border-stone-300">
                <div className="flex items-center justify-between mb-4 border-b border-stone-200 pb-3">
                  <div>
                    <h3 className="font-serif text-lg text-stone-900 font-medium">
                      {editingId ? 'Edit Product (پراڈکٹ تبدیل کریں)' : 'Product Add Karne Ka Panel (نیا سوٹ شامل کریں)'}
                    </h3>
                    <p className="text-xs text-stone-500">
                      سارے فیلڈز بھریں اور save بٹن پر کلک کریں۔
                    </p>
                  </div>
                  {editingId && (
                    <button
                      onClick={resetForm}
                      className="text-xs text-stone-500 hover:text-black underline"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveProduct} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-800 mb-1">
                        Suit Name * (جیسے Embroidered Khaddar)
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Brown Khaddar Suit"
                        required
                        className="w-full text-xs p-2.5 border border-stone-300 focus:outline-none focus:border-black bg-stone-50"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-800 mb-1">
                          Price * (Rs.)
                        </label>
                        <input
                          type="number"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          placeholder="2850"
                          required
                          className="w-full text-xs p-2.5 border border-stone-300 focus:outline-none focus:border-black bg-stone-50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-800 mb-1">
                          Original Price (Cut Price)
                        </label>
                        <input
                          type="number"
                          value={originalPrice}
                          onChange={(e) => setOriginalPrice(e.target.value)}
                          placeholder="3400"
                          className="w-full text-xs p-2.5 border border-stone-300 focus:outline-none focus:border-black bg-stone-50"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-800 mb-1">
                        Collection / Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as any)}
                        className="w-full text-xs p-2.5 border border-stone-300 focus:outline-none focus:border-black bg-stone-50"
                      >
                        <option value="Khaddar">Khaddar Edit</option>
                        <option value="Velvet">Velvet Luxe</option>
                        <option value="Karandi">Karandi Edition</option>
                        <option value="Linen">Linen Collection</option>
                        <option value="Chiffon">Festive Chiffon</option>
                        <option value="Cotton">Cotton Pret</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-800 mb-1">
                        Fabric Summary
                      </label>
                      <input
                        type="text"
                        value={fabric}
                        onChange={(e) => setFabric(e.target.value)}
                        placeholder="e.g. 3-Piece Pure Khaddar with Wool Shawl"
                        className="w-full text-xs p-2.5 border border-stone-300 focus:outline-none focus:border-black bg-stone-50"
                      />
                    </div>
                  </div>

                  {/* Image Options: URL or Upload or Sample Preset */}
                  <div className="border border-stone-200 p-3 bg-stone-50/50 space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-800">
                      Product Image Link or Device Upload *
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="Image Link (URL) paste karein ya neeche se upload karein"
                        className="flex-1 text-xs p-2 border border-stone-300 focus:outline-none focus:border-black bg-white"
                      />
                      <label className="px-3 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-medium cursor-pointer flex items-center gap-1.5 shrink-0">
                        <Image className="w-3.5 h-3.5" />
                        <span>Upload File</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleProductFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div className="pt-2">
                      <span className="text-[11px] text-stone-500 block mb-1">
                        یا ہماری فوٹوشوٹ گیلری سے منتخب کریں:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {PRESET_SAMPLE_IMAGES.map((preset, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setImage(preset.url)}
                            className="text-[11px] px-2.5 py-1 border border-stone-300 bg-white hover:border-black flex items-center gap-1 cursor-pointer"
                          >
                            <img src={preset.url} alt="" className="w-4 h-4 object-cover" />
                            <span>{preset.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {image && (
                      <div className="flex items-center gap-3 pt-2">
                        <img
                          src={image}
                          alt="Preview"
                          className="w-12 h-16 object-cover border border-stone-300 bg-white"
                        />
                        <span className="text-xs text-emerald-700">تصویر پریویو درست ہے</span>
                      </div>
                    )}
                  </div>

                  {/* Description & 3-Piece specs */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-800 mb-1">
                      Short Description
                    </label>
                    <textarea
                      rows={2}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="سوٹ کی خصوصیات اور کشیدہ کاری کی تفصیلات..."
                      className="w-full text-xs p-2.5 border border-stone-300 focus:outline-none focus:border-black bg-stone-50"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[11px] text-stone-600 mb-1">Shirt Details</label>
                      <input
                        type="text"
                        value={shirt}
                        onChange={(e) => setShirt(e.target.value)}
                        placeholder="Embroidered Khaddar Front"
                        className="w-full text-xs p-2 border border-stone-300 bg-stone-50"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-stone-600 mb-1">Dupatta Details</label>
                      <input
                        type="text"
                        value={dupatta}
                        onChange={(e) => setDupatta(e.target.value)}
                        placeholder="Warm Printed Wool Shawl"
                        className="w-full text-xs p-2 border border-stone-300 bg-stone-50"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-stone-600 mb-1">Trouser Details</label>
                      <input
                        type="text"
                        value={trouser}
                        onChange={(e) => setTrouser(e.target.value)}
                        placeholder="Dyed Trouser (2.5m)"
                        className="w-full text-xs p-2 border border-stone-300 bg-stone-50"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <label className="flex items-center gap-2 text-xs font-medium text-stone-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={inStock}
                        onChange={(e) => setInStock(e.target.checked)}
                        className="w-4 h-4 text-black"
                      />
                      <span>In Stock (تیار اسٹاک)</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-black hover:bg-stone-800 text-white text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
                  >
                    {editingId ? 'Update Product' : 'Add Product (سوٹ شامل کریں)'}
                  </button>
                </form>
              </div>

              {/* Current Products Catalog List */}
              <div className="bg-white p-5 border border-stone-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-lg text-stone-900 font-medium">
                    Store Catalog ({products.length} Items)
                  </h3>
                  <button
                    onClick={() => {
                      if (confirm('Default products دوبارہ بحال کریں؟')) {
                        onResetProducts();
                        showStatus('ڈیفالٹ کلیکشن بحال ہو گئی!');
                      }
                    }}
                    className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset to Defaults</span>
                  </button>
                </div>

                <div className="divide-y divide-stone-200">
                  {products.map((p) => (
                    <div key={p.id} className="py-3 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-12 h-16 object-cover bg-stone-100 border border-stone-200 shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-serif text-sm font-semibold text-stone-900">
                              {p.name}
                            </span>
                            <span className="text-[10px] text-stone-500 font-mono">
                              {p.code}
                            </span>
                            {!p.inStock && (
                              <span className="text-[10px] bg-stone-200 text-stone-700 px-1.5 py-0.5">
                                Out of Stock
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-stone-600 mt-0.5">{p.fabric}</div>
                          <div className="font-serif text-xs font-bold text-amber-900 mt-1 tabular-nums">
                            Rs. {p.price.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleEditClick(p)}
                          className="p-2 text-stone-600 hover:text-black hover:bg-stone-100 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`"${p.name}" کو ڈیلیٹ کرنا چاہتے ہیں؟`)) {
                              onDeleteProduct(p.id);
                              showStatus(`"${p.name}" ڈیلیٹ ہو گیا!`);
                            }
                          }}
                          className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* TAB 2: BANNERS MANAGEMENT (Requested by user) */}
          {activeTab === 'banners' && (
            <form onSubmit={handleSaveBanners} className="space-y-6">
              <div className="bg-white p-5 border border-stone-300 space-y-5">
                <div className="border-b border-stone-200 pb-3">
                  <h3 className="font-serif text-lg text-stone-900 font-semibold">
                    1. Main Top Hero Banner (مرکزی ہیرو بینر)
                  </h3>
                  <p className="text-xs text-stone-500">
                    یہ بینر ویب سائٹ کے سب سے اوپر ہوم پیج پر نظر آتا ہے۔
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-800 mb-1">
                      Hero Banner Headline
                    </label>
                    <input
                      type="text"
                      value={heroTitle}
                      onChange={(e) => setHeroTitle(e.target.value)}
                      placeholder="e.g. The Winter Edit / Eid Collection"
                      className="w-full text-xs p-2.5 border border-stone-300 focus:outline-none focus:border-black bg-stone-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-800 mb-1">
                      Hero Banner Subtitle
                    </label>
                    <input
                      type="text"
                      value={heroSubtitle}
                      onChange={(e) => setHeroSubtitle(e.target.value)}
                      placeholder="e.g. Earthy tones. Timeless silhouettes..."
                      className="w-full text-xs p-2.5 border border-stone-300 focus:outline-none focus:border-black bg-stone-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-800 mb-1">
                    Hero Banner Image Link or Upload
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={heroImage}
                      onChange={(e) => setHeroImage(e.target.value)}
                      placeholder="Image link / URL paste karein"
                      className="flex-1 text-xs p-2 border border-stone-300 focus:outline-none focus:border-black bg-white"
                    />
                    <label className="px-3 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-medium cursor-pointer flex items-center gap-1.5 shrink-0">
                      <Image className="w-3.5 h-3.5" />
                      <span>Upload Device File</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleHeroBannerFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {heroImage && (
                  <div className="relative aspect-[16/9] max-h-48 overflow-hidden border border-stone-300 bg-stone-100">
                    <img
                      src={heroImage}
                      alt="Hero Preview"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs font-medium">
                      Hero Preview: {heroTitle}
                    </div>
                  </div>
                )}
              </div>

              {/* OUTLETS BANNER */}
              <div className="bg-white p-5 border border-stone-300 space-y-5">
                <div className="border-b border-stone-200 pb-3">
                  <h3 className="font-serif text-lg text-stone-900 font-semibold">
                    2. Salma's Outlets Banner (سلمہ آؤٹ لیٹس بینر)
                  </h3>
                  <p className="text-xs text-stone-500">
                    یہ بینر سلمہ آؤٹ لیٹس اور فلیگ شپ اسٹوڈیوز والے سیکشن میں نظر آتا ہے۔
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-800 mb-1">
                      Outlets Section Title
                    </label>
                    <input
                      type="text"
                      value={outletsTitle}
                      onChange={(e) => setOutletsTitle(e.target.value)}
                      placeholder="e.g. SALMA'S CLOSET OUTLETS"
                      className="w-full text-xs p-2.5 border border-stone-300 focus:outline-none focus:border-black bg-stone-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-800 mb-1">
                      Outlets Section Subtitle
                    </label>
                    <input
                      type="text"
                      value={outletsSubtitle}
                      onChange={(e) => setOutletsSubtitle(e.target.value)}
                      placeholder="e.g. Flagship Atelier & Outlets across Lahore, Karachi & Islamabad"
                      className="w-full text-xs p-2.5 border border-stone-300 focus:outline-none focus:border-black bg-stone-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-800 mb-1">
                    Outlets Banner Image Link or Upload
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={outletsImage}
                      onChange={(e) => setOutletsImage(e.target.value)}
                      placeholder="Outlets image link"
                      className="flex-1 text-xs p-2 border border-stone-300 focus:outline-none focus:border-black bg-white"
                    />
                    <label className="px-3 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-medium cursor-pointer flex items-center gap-1.5 shrink-0">
                      <Image className="w-3.5 h-3.5" />
                      <span>Upload Device File</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleOutletsBannerFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {outletsImage && (
                  <div className="relative aspect-[16/7] max-h-44 overflow-hidden border border-stone-300 bg-stone-100">
                    <img
                      src={outletsImage}
                      alt="Outlets Preview"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs font-medium">
                      Outlets Preview: {outletsTitle}
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-black hover:bg-stone-800 text-white text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>تمام بینرز محفوظ کریں (Save All Banners)</span>
              </button>
            </form>
          )}

          {/* TAB 3: WHATSAPP SETTINGS */}
          {activeTab === 'whatsapp' && (
            <div className="bg-white p-6 border border-stone-300 space-y-6">
              <div>
                <h3 className="font-serif text-xl text-stone-900 font-medium mb-1">
                  Boutique WhatsApp Business Number
                </h3>
                <p className="text-xs text-stone-600">
                  یہاں اپنا وہ واٹس ایپ نمبر لکھیں جس پر کسٹمرز کے سارے آرڈرز موصول ہونے چاہئیں۔
                </p>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-none text-xs text-emerald-900 space-y-1">
                <div className="font-semibold">فارمیٹ گائیڈ (Format Guide):</div>
                <p>• پاکستانی نمبر: <strong>923XXXXXXXXX</strong> (مثلاً 923001234567)</p>
                <p>• اگر آپ 03001234567 لکھیں گے تو سسٹم خود اسے 923001234567 میں تبدیل کر دے گا۔</p>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-800 mb-2">
                  Store WhatsApp Number
                </label>
                <div className="flex gap-2 max-w-md">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-2.5 text-stone-400 text-xs">
                      <Phone className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      value={waNumber}
                      onChange={(e) => setWaNumber(e.target.value)}
                      placeholder="923000000000"
                      className="w-full text-sm pl-9 p-2.5 border border-stone-300 focus:outline-none focus:border-black bg-stone-50 font-mono"
                    />
                  </div>
                  <button
                    onClick={handleSaveSettings}
                    className="px-5 py-2.5 bg-black hover:bg-stone-800 text-white text-xs uppercase tracking-wider font-semibold cursor-pointer"
                  >
                    Save Number
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200">
                <h4 className="text-xs font-semibold text-stone-800 uppercase tracking-wider mb-2">
                  Test Your WhatsApp Connection
                </h4>
                <p className="text-xs text-stone-500 mb-3">
                  نیچے بٹن پر کلک کر کے ایک ٹیسٹ میسج بھیج کر چیک کریں کہ آپ کے نمبر پر چیٹ کھل رہی ہے۔
                </p>
                <button
                  onClick={handleTestWhatsApp}
                  className="px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs uppercase tracking-wider font-semibold flex items-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Send Test WhatsApp Ping</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: PASSWORD & STORE SETTINGS */}
          {activeTab === 'settings' && (
            <div className="bg-white p-6 border border-stone-300 space-y-6">
              <div>
                <h3 className="font-serif text-xl text-stone-900 font-medium mb-1">
                  ایڈمن پاس ورڈ اور اسٹور سیٹنگز
                </h3>
                <p className="text-xs text-stone-600">
                  اپنا ایڈمن لاگ ان پاس ورڈ اور ڈیلیوری چارجز کی حد تبدیل کریں۔
                </p>
              </div>

              {/* Password change */}
              <div className="p-4 bg-stone-50 border border-stone-300 max-w-md space-y-3">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-stone-800" />
                  <span className="text-xs uppercase tracking-wider font-bold text-stone-900">
                    Change Admin Password (پاس ورڈ تبدیل کریں)
                  </span>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    New Admin Password
                  </label>
                  <input
                    type="text"
                    value={newAdminPassword}
                    onChange={(e) => setNewAdminPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full text-xs p-2.5 border border-stone-300 focus:outline-none focus:border-black bg-white font-mono"
                  />
                  <span className="text-[11px] text-stone-500 mt-1 block">
                    موجودہ ڈیفالٹ پاس ورڈ: <strong>salma123</strong>
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-800 mb-1">
                  Top Announcement Ribbon Text
                </label>
                <input
                  type="text"
                  value={announcement}
                  onChange={(e) => setAnnouncement(e.target.value)}
                  className="w-full text-xs p-2.5 border border-stone-300 focus:outline-none focus:border-black bg-stone-50"
                />
              </div>

              <div className="max-w-xs">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-800 mb-1">
                  Free Shipping Threshold (Rs.)
                </label>
                <input
                  type="number"
                  value={freeShip}
                  onChange={(e) => setFreeShip(e.target.value)}
                  className="w-full text-xs p-2.5 border border-stone-300 focus:outline-none focus:border-black bg-stone-50"
                />
                <span className="text-[11px] text-stone-500 mt-1 block">
                  اس رقم کے برابر یا زیادہ پر مفت ڈیلیوری ہوگی۔
                </span>
              </div>

              <button
                onClick={handleSaveSettings}
                className="px-6 py-3 bg-black hover:bg-stone-800 text-white text-xs uppercase tracking-widest font-semibold cursor-pointer"
              >
                Save All Settings
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
