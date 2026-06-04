/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  User, 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  CheckCircle2, 
  Plus, 
  Minus,
  Instagram,
  Facebook,
  Twitter,
  Store,
  Upload,
  Image as ImageIcon,
  ArrowLeft,
  Link,
  Percent,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { INITIAL_PRODUCTS, MOCK_VENDOR } from './constants';
import { CartItem, Product } from './types';

// --- Components ---

const Marquee = ({ images }: { images: string[] }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="flex gap-40 whitespace-nowrap items-center"
      >
        {[...images, ...images, ...images, ...images].map((src, i) => (
          <img 
            key={i} 
            src={src} 
            className="h-12 md:h-16 w-auto object-contain grayscale multiply opacity-20" 
            alt="" 
          />
        ))}
      </motion.div>
    </div>
  );
};
const Header = ({ 
  cartCount, 
  onOpenCart, 
  onOpenSeller,
  onOpenHowItWorks,
  selectedCategory,
  onSelectCategory
}: { 
  cartCount: number, 
  onOpenCart: () => void, 
  onOpenSeller: () => void,
  onOpenHowItWorks: () => void,
  selectedCategory: string | null,
  onSelectCategory: (category: string | null) => void
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = ["Nouveautés", "Vêtements", "Bijoux", "Art & Accessoires", "Livres", "Fêtes", "Épicerie Fine"];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoryClick = (category: string | null) => {
    onSelectCategory(category);
    setIsMobileMenuOpen(false);
  };
return (

<>
  <header className={`glass-header transition-all duration-500 ${isScrolled ? 'py-1' : 'py-3'}`}>
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      {/* Row 1: Logo & Actions */}
      <div className="flex items-center justify-between py-2">
        {/* Mobile Menu Button */}
        <div className="flex-1 lg:hidden">
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 text-black">
            <Menu size={24} />
          </button>
        </div>

        {/* Desktop Left Spacer */}
        <div className="hidden lg:flex flex-1"></div>

        {/* Logo */}
        <div className="flex flex-col items-center justify-center text-center">
          <button 
            onClick={() => handleCategoryClick(null)} 
            className="flex flex-col items-center group"
          >
            <img 
              src="/logo-yddish.png" 
              alt="YDDISH MARKET" 
              className="h-10 sm:h-12 md:h-20 mb-1 transition-all duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="text-lg sm:text-xl md:text-3xl font-gothic tracking-[0.2em] font-bold text-black pl-[0.2em] uppercase whitespace-nowrap">
              YDDISH<span className="font-light opacity-40"> MARKET</span>
            </div>
          </button>
          <span className="hebrew text-[7px] md:text-[9px] tracking-[0.2em] text-black/40 mt-0.5">שוק יידיש</span>
        </div>

        {/* Actions */}
        <div className="flex-1 flex items-center justify-end gap-2 md:gap-6 text-black">
          <button onClick={onOpenSeller} className="hidden xl:flex hover:text-black transition-all items-center gap-2 text-[10px] uppercase tracking-[0.2em] mr-2">
            <Store size={14} />
            Vendre
          </button>
          
          <button className="p-2 hover:opacity-50 transition-opacity">
            <Search size={22} />
          </button>
          
          <button 
            onClick={onOpenCart}
            className="p-2 hover:opacity-50 transition-opacity relative"
          >
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-black text-white text-[9px] flex items-center justify-center rounded-none font-bold">
                {cartCount}
              </span>
            )}
          </button>

          <button className="hidden md:flex items-center gap-2 hover:opacity-50 transition-opacity">
            <span className="text-[12px] uppercase tracking-[0.1em] font-medium">Connexion</span>
          </button>
        </div>
      </div>

      {/* Row 2: Navigation (Desktop only) */}
      <div className="hidden lg:flex items-center justify-center border-t border-black/5 mt-2 pt-4 pb-2">
        <nav className="flex items-center gap-10 text-[12px] uppercase tracking-[0.1em] font-medium text-black/60">
          <button 
            onClick={() => handleCategoryClick(null)} 
            className={`hover:text-black transition-all pb-1 border-b-2 ${selectedCategory === null ? 'text-black border-black' : 'border-transparent'}`}
          >
            Tout
          </button>
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => handleCategoryClick(cat)} 
              className={`hover:text-black transition-all pb-1 border-b-2 ${selectedCategory === cat ? 'text-black border-black' : 'border-transparent'}`}
            >
              {cat}
            </button>
          ))}
        </nav>
      </div>
    </div>
  </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 bg-[#FAFAFA] z-[110] flex flex-col lg:hidden"
          >
            <div className="flex justify-between items-center p-6 border-b border-black/10">
              <span className="font-gothic text-base tracking-[0.3em] font-bold">YDDISH MARKET</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-black">
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col gap-8 p-8 text-sm uppercase tracking-[0.3em] font-medium text-black">
              <button 
                onClick={() => handleCategoryClick(null)} 
                className={`hover:opacity-50 transition-opacity text-left ${selectedCategory === null ? 'font-bold' : ''}`}
              >
                Tout
              </button>
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => handleCategoryClick(cat)} 
                  className={`hover:opacity-50 transition-opacity text-left ${selectedCategory === cat ? 'font-bold' : ''}`}
                >
                  {cat}
                </button>
              ))}
              <button onClick={() => { setIsMobileMenuOpen(false); onOpenHowItWorks(); }} className="hover:opacity-50 transition-opacity flex items-center gap-4 text-left">
                <RotateCcw size={18} />
                Comment ça marche
              </button>
              <button onClick={() => { setIsMobileMenuOpen(false); onOpenSeller(); }} className="hover:opacity-50 transition-opacity flex items-center gap-4 text-left">
                <Store size={18} />
                Vendre
              </button>
            </nav>
            <div className="mt-auto p-8 border-t border-black/10">
              <span className="hebrew text-2xl text-black/20 block mb-4">שוק יידיש</span>
              <p className="text-[10px] uppercase tracking-[0.2em] text-black/40">L'essence de la tradition juive.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const SellerPortal = ({ isOpen, onClose, onAddProduct, isAuthenticated, onAuthenticate }: { 
  isOpen: boolean, 
  onClose: () => void,
  onAddProduct: (p: Product) => void,
  isAuthenticated: boolean,
  onAuthenticate: () => void
}) => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: 'Nouveautés',
    description: '',
    imageUrl: ''
  });
  const [authData, setAuthData] = useState({ email: '', password: '' });
  const [isLogin, setIsLogin] = useState(true);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAuthenticate();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.title,
      price: parseFloat(formData.price),
      shortDescription: formData.description.substring(0, 100) + '...',
      description: formData.description,
      category: formData.category,
      sku: 'YDD-' + Math.random().toString(36).substr(2, 5).toUpperCase(),
      shippingInfo: 'Expédition par le vendeur',
      stockStatus: 'in_stock',
      images: [{ url: formData.imageUrl || 'https://picsum.photos/seed/judaica/800/800', alt: formData.title }],
      vendor: MOCK_VENDOR,
      reviews: []
    };
    onAddProduct(newProduct);
    setFormData({ title: '', price: '', category: 'Judaïca', description: '', imageUrl: '' });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#FAFAFA] z-[100] overflow-y-auto text-black"
        >
          <div className="max-w-3xl mx-auto px-6 py-12">
            <button onClick={onClose} className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] mb-16 hover:opacity-50 transition-opacity">
              <ArrowLeft size={16} />
              Retour au marché
            </button>

            {!isAuthenticated ? (
              <div className="max-w-2xl mx-auto mt-10">
                <div className="mb-12 text-center">
                  <span className="hebrew text-3xl text-black/20 mb-4 block">כניסה</span>
                  <h2 className="text-4xl font-gothic mb-4">{isLogin ? "Les Portes du Sanctuaire" : "Devenir vendeur"}</h2>
                  <p className="text-black/40 text-sm tracking-wide uppercase tracking-[0.2em]">
                    {isLogin ? "Identifiez-vous pour proposer vos reliques." : "Rejoignez la marketplace Judaica premium. Créez votre boutique et commencez à vendre vos créations."}
                  </p>
                </div>

                <div className="flex gap-8 justify-center mb-12 border-b border-black/10">
                  <button 
                    type="button"
                    onClick={() => setIsLogin(true)}
                    className={`pb-4 text-[10px] uppercase tracking-[0.3em] font-bold transition-colors relative ${isLogin ? 'text-black' : 'text-black/30'}`}
                  >
                    S'identifier
                    {isLogin && <motion.div layoutId="auth-tab" className="absolute bottom-0 left-0 right-0 h-px bg-black" />}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsLogin(false)}
                    className={`pb-4 text-[10px] uppercase tracking-[0.3em] font-bold transition-colors relative ${!isLogin ? 'text-black' : 'text-black/30'}`}
                  >
                    Devenir Vendeur
                    {!isLogin && <motion.div layoutId="auth-tab" className="absolute bottom-0 left-0 right-0 h-px bg-black" />}
                  </button>
                </div>

                {isLogin ? (
                  <form onSubmit={handleAuthSubmit} className="space-y-8 max-w-md mx-auto">
                    <div className="space-y-4">
                      <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-black/40">Courriel</label>
                      <input 
                        required
                        type="email" 
                        value={authData.email}
                        onChange={e => setAuthData({...authData, email: e.target.value})}
                        placeholder="artisan@yddish.com"
                        className="w-full border-b border-black/20 bg-transparent py-4 focus:outline-none focus:border-black transition-colors text-lg"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-black/40">Sceau de sécurité</label>
                      <input 
                        required
                        type="password" 
                        value={authData.password}
                        onChange={e => setAuthData({...authData, password: e.target.value})}
                        placeholder="••••••••"
                        className="w-full border-b border-black/20 bg-transparent py-4 focus:outline-none focus:border-black transition-colors text-lg"
                      />
                    </div>
                    <button type="submit" className="w-full btn-premium py-6 mt-8">
                      Pénétrer le Sanctuaire
                    </button>
                  </form>
                ) : (
                  <div className="space-y-16">
                    {/* Stats/Features */}
                    <div className="grid grid-cols-3 gap-4 md:gap-8">
                      <div className="border border-black/10 p-6 text-center space-y-2">
                        <div className="flex justify-center text-black/20 mb-2">
                          <Percent size={20} />
                        </div>
                        <p className="text-xl font-gothic">20%</p>
                        <p className="text-[8px] uppercase tracking-[0.2em] text-black/40">sur chaque vente</p>
                      </div>
                      <div className="border border-black/10 p-6 text-center space-y-2">
                        <div className="flex justify-center text-black/20 mb-2">
                          <ShieldCheck size={20} />
                        </div>
                        <p className="text-xs font-bold uppercase tracking-[0.1em]">Sécurisé</p>
                        <p className="text-[8px] uppercase tracking-[0.2em] text-black/40">via Stripe Connect</p>
                      </div>
                      <div className="border border-black/10 p-6 text-center space-y-2">
                        <div className="flex justify-center text-black/20 mb-2">
                          <Users size={20} />
                        </div>
                        <p className="text-xs font-bold uppercase tracking-[0.1em]">Ciblée</p>
                        <p className="text-[8px] uppercase tracking-[0.2em] text-black/40">communauté Judaica</p>
                      </div>
                    </div>

                    <form onSubmit={handleAuthSubmit} className="space-y-12">
                      <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-4">
                          <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-black/40">Courriel *</label>
                          <input 
                            required
                            type="email" 
                            placeholder="artisan@yddish.com"
                            className="w-full border-b border-black/20 bg-transparent py-4 focus:outline-none focus:border-black transition-colors text-lg"
                          />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-black/40">Nom de la boutique *</label>
                          <input 
                            required
                            type="text" 
                            placeholder="Ex: Atelier David"
                            className="w-full border-b border-black/20 bg-transparent py-4 focus:outline-none focus:border-black transition-colors text-lg"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-black/40">Description (optionnel)</label>
                          <span className="text-[9px] text-black/20 uppercase tracking-widest">0/500 caractères</span>
                        </div>
                        <textarea 
                          rows={4}
                          placeholder="Présentez votre atelier, votre savoir-faire..."
                          className="w-full border border-black/10 bg-black/5 p-6 focus:outline-none focus:border-black/30 transition-colors rounded-none text-sm leading-relaxed"
                        />
                      </div>

                      <div className="space-y-4">
                        <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-black/40">Sceau de sécurité *</label>
                        <input 
                          required
                          type="password" 
                          placeholder="••••••••"
                          className="w-full border-b border-black/20 bg-transparent py-4 focus:outline-none focus:border-black transition-colors text-lg"
                        />
                      </div>

                      <div className="space-y-4 pt-4">
                        <ul className="space-y-3">
                          {[
                            "Inscription gratuite, vous ne payez que sur vos ventes",
                            "Dashboard complet pour gérer produits et commandes",
                            "Paiements automatiques sur votre compte bancaire"
                          ].map((benefit, i) => (
                            <li key={i} className="flex items-center gap-3 text-[10px] uppercase tracking-[0.1em] text-black/60">
                              <CheckCircle2 size={12} className="text-black/20" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button type="submit" className="w-full btn-premium py-6">
                        Créer ma boutique
                      </button>
                    </form>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="mb-16 text-center">
                  <span className="hebrew text-3xl text-black/20 mb-4 block">הידור מצווה</span>
                  <h2 className="text-5xl font-gothic mb-6">Le Sanctuaire</h2>
                  <p className="text-black/40 text-sm tracking-wide uppercase tracking-[0.2em]">Exposez vos objets de Kodesh sur YDDISH MARKET.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-12">
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-black/40">Nom du produit</label>
                      <input 
                        required
                        value={formData.title}
                        onChange={e => setFormData({...formData, title: e.target.value})}
                        type="text" 
                        placeholder="ex: Menorah en Argent"
                        className="w-full border-b border-black/20 bg-transparent py-4 focus:outline-none focus:border-black transition-colors text-lg"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-black/40">Prix (€)</label>
                      <input 
                        required
                        value={formData.price}
                        onChange={e => setFormData({...formData, price: e.target.value})}
                        type="number" 
                        placeholder="0.00"
                        className="w-full border-b border-black/20 bg-transparent py-4 focus:outline-none focus:border-black transition-colors text-lg"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-black/40">Catégorie</label>
                    <select 
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                      className="w-full border-b border-black/20 bg-transparent py-4 focus:outline-none focus:border-black transition-colors"
                    >
                      <option className="bg-white">Nouveautés</option>
                      <option className="bg-white">Vêtements</option>
                      <option className="bg-white">Bijoux</option>
                      <option className="bg-white">Art & Accessoires</option>
                      <option className="bg-white">Livres</option>
                      <option className="bg-white">Fêtes</option>
                      <option className="bg-white">Épicerie Fine</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-black/40">Description</label>
                    <textarea 
                      required
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                      rows={6}
                      placeholder="Décrivez votre produit, son histoire, ses matériaux..."
                      className="w-full border border-black/10 bg-black/5 p-6 focus:outline-none focus:border-black/30 transition-colors rounded-none text-sm leading-relaxed"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-black/40">URL de l'image</label>
                    <div className="flex gap-6">
                      <input 
                        value={formData.imageUrl}
                        onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                        type="url" 
                        placeholder="https://..."
                        className="flex-1 border-b border-black/20 bg-transparent py-4 focus:outline-none focus:border-black transition-colors"
                      />
                      <div className="w-16 h-16 bg-black/5 rounded-none flex items-center justify-center text-black/20 overflow-hidden border border-black/10">
                        {formData.imageUrl ? <img src={formData.imageUrl} className="w-full h-full object-cover grayscale" /> : <ImageIcon size={24} />}
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="w-full btn-premium py-6 flex items-center justify-center gap-4">
                    <Upload size={20} />
                    Publier l'article
                  </button>
                </form>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ProductCard = ({ product, onClick }: { product: Product, onClick: () => void, key?: any }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ y: -10 }}
    className="group cursor-pointer"
    onClick={onClick}
  >
    <div className="aspect-[3/4] bg-brand-cream rounded-none overflow-hidden mb-6 relative border border-black/5">
      <img 
        src={product.images[0].url} 
        alt={product.title} 
        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0 grayscale opacity-80 group-hover:opacity-100"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-6 left-6">
        <span className="bg-white/90 backdrop-blur-md text-black px-4 py-1.5 rounded-none text-[9px] font-bold uppercase tracking-[0.3em] border border-black/10">
          {product.vendor.name}
        </span>
      </div>
    </div>
    <h3 className="font-gothic text-lg mb-2 tracking-widest transition-all group-hover:text-black/60">{product.title}</h3>
    <p className="text-black/40 text-sm tracking-widest">{product.price} €</p>
  </motion.div>
);

const CartDrawer = ({ isOpen, onClose, items, onUpdateQty, onRemove }: { 
  isOpen: boolean, 
  onClose: () => void, 
  items: CartItem[],
  onUpdateQty: (id: string, delta: number) => void,
  onRemove: (id: string) => void
}) => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-white/80 z-[60] backdrop-blur-md"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#FAFAFA] z-[70] shadow-2xl flex flex-col border-l border-black/10 text-black"
          >
            <div className="p-8 border-b border-black/10 flex items-center justify-between">
              <h2 className="text-2xl font-gothic tracking-widest">Panier</h2>
              <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-none transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-6">
                  <ShoppingBag size={48} className="text-black/10" />
                  <p className="text-black/40 text-sm tracking-widest uppercase">Le vide absolu</p>
                  <button onClick={onClose} className="btn-outline py-4 px-8">Retourner à la lumière</button>
                </div>
              ) : (
                <div className="space-y-10">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-6">
                      <div className="w-24 h-24 bg-black/5 rounded-none overflow-hidden shrink-0 border border-black/10">
                        <img src={item.images[0].url} alt={item.title} className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="text-xs font-bold uppercase tracking-widest line-clamp-1">{item.title}</h3>
                            <button onClick={() => onRemove(item.id)} className="text-black/30 hover:text-black">
                              <X size={14} />
                            </button>
                          </div>
                          <p className="text-xs text-black/60 mt-2 tracking-widest">{item.price} €</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-black/20 rounded-none">
                            <button 
                              onClick={() => onUpdateQty(item.id, -1)}
                              className="p-2 px-3 hover:bg-black hover:text-white transition-colors"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="text-[10px] w-8 text-center font-bold">{item.quantity}</span>
                            <button 
                              onClick={() => onUpdateQty(item.id, 1)}
                              className="p-2 px-3 hover:bg-black hover:text-white transition-colors"
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-8 border-t border-black/10 bg-black/5">
                <div className="flex justify-between mb-6">
                  <span className="text-black/40 uppercase text-[10px] tracking-[0.3em]">Total</span>
                  <span className="font-bold tracking-widest">{subtotal} €</span>
                </div>
                <button className="w-full btn-premium">Finaliser l'offrande</button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSellerPortalOpen, setIsSellerPortalOpen] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isVendorAuthenticated, setIsVendorAuthenticated] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateCartQty = (id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const addNewProduct = (p: Product) => {
    setProducts(prev => [p, ...prev]);
  };

  const filteredProducts = selectedCategory 
    ? products.filter(p => p.category === selectedCategory)
    : products;

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)} 
        onOpenSeller={() => setIsSellerPortalOpen(true)}
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-12 w-full">
        {/* Hero Section */}
        {!selectedCategory && (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 jewish-motif relative overflow-hidden mb-24">
           <Marquee images={[
  "/logo-kippots.png",
  "/logo-azamra.png",
  "/logo-kameart.png",
  "/logo-yddish.png"
]} />
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="max-w-2xl relative z-10"
            >
              <span className="hebrew text-4xl md:text-6xl text-black/10 mb-8 block">זה אלי ואנוהו</span>
              <h1 className="text-6xl md:text-8xl font-gothic mb-10 leading-tight tracking-[0.2em]">Hiddur <span className="italic opacity-30">Mitzvah</span></h1>
              <p className="text-black/40 text-sm md:text-base mb-16 leading-relaxed tracking-[0.15em] uppercase max-w-lg mx-auto">
                L'artisanat sacré au service de la tradition. YDDISH MARKET attend vos reliques et objets de culte.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button 
                  onClick={() => setIsSellerPortalOpen(true)}
                  className="btn-premium flex items-center justify-center gap-4"
                >
                  <Store size={18} />
                  Ouvrir le Sanctuaire
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {filteredProducts.length === 0 ? (
          <div className="min-h-[40vh] flex flex-col items-center justify-center text-center px-6">
            <p className="text-black/40 text-sm uppercase tracking-[0.2em]">Aucune relique trouvée dans cette catégorie.</p>
            <button onClick={() => setSelectedCategory(null)} className="btn-outline mt-8">Voir tout</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-24">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={() => setSelectedProduct(product)} 
              />
            ))}
          </div>
        )}

        {/* Product Detail Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[80] bg-[#FAFAFA] overflow-y-auto text-black"
            >
              <div className="max-w-7xl mx-auto px-4 md:px-8 py-20">
                <button onClick={() => setSelectedProduct(null)} className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] mb-20 hover:opacity-50 transition-opacity">
                  <ArrowLeft size={16} />
                  Retour à la lumière
                </button>

                <div className="grid lg:grid-cols-2 gap-20 xl:gap-32">
                  <div className="aspect-[3/4] bg-black/5 rounded-none overflow-hidden border border-black/10">
                    <img src={selectedProduct.images[0].url} alt={selectedProduct.title} className="w-full h-full object-cover grayscale" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-8">
                      <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/40 underline decoration-black/20 underline-offset-8">{selectedProduct.vendor.name}</span>
                      <CheckCircle2 size={14} className="text-black/20" />
                      <span className="hebrew text-xs text-black/20 ml-auto">בס"ד</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-gothic mb-8 tracking-widest leading-tight">{selectedProduct.title}</h2>
                    <p className="text-3xl font-light tracking-widest mb-12 text-black/60">{selectedProduct.price} €</p>
                    <p className="text-black/50 leading-loose mb-16 text-sm tracking-wide max-w-md">{selectedProduct.description}</p>
                    <button 
                      onClick={() => addToCart(selectedProduct)}
                      className="w-full btn-premium flex items-center justify-center gap-4 py-6"
                    >
                      <ShoppingBag size={20} />
                      Acquérir cet objet
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="border-t border-black/10 py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-3xl font-gothic mb-4 tracking-[0.3em]">YDDISH MARKET</h2>
              <span className="hebrew text-xl text-black/20 block mb-8">שוק יידיש המסורתי</span>
              <p className="text-black/50 text-sm max-w-sm leading-loose tracking-widest uppercase text-[10px]">
                L'essence de la tradition juive, sculptée dans la lumière du design contemporain. Une alliance éternelle entre le Kodesh et le minimalisme radical.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-8 text-black/40">Navigation</h4>
              <ul className="space-y-4 text-[10px] uppercase tracking-[0.2em] text-black/60">
                <li><button onClick={() => setIsHowItWorksOpen(true)} className="hover:text-black transition-colors">Comment ça marche</button></li>
                <li><button onClick={() => setIsSellerPortalOpen(true)} className="hover:text-black transition-colors">Le Sanctuaire</button></li>
                <li><a href="#" className="hover:text-black transition-colors">Reliques</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Artisans</a></li>
                <li><a href="#" className="hover:text-black transition-colors">L'Histoire</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-8 text-black/40">Contact</h4>
              <ul className="space-y-4 text-[10px] uppercase tracking-[0.2em] text-black/60">
                <li><a href="#" className="hover:text-black transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Journal</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] uppercase tracking-[0.4em] text-black/40">
            <p>© 2026 YDDISH MARKET. TOUS DROITS RÉSERVÉS.</p>
            <div className="flex gap-12">
              <a href="#" className="hover:text-black transition-colors">Confidentialité</a>
              <a href="#" className="hover:text-black transition-colors">Mentions</a>
            </div>
          </div>
        </div>
      </footer>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onUpdateQty={updateCartQty}
        onRemove={removeFromCart}
      />

      <SellerPortal 
        isOpen={isSellerPortalOpen} 
        onClose={() => setIsSellerPortalOpen(false)}
        onAddProduct={addNewProduct}
        isAuthenticated={isVendorAuthenticated}
        onAuthenticate={() => setIsVendorAuthenticated(true)}
      />

      <AnimatePresence>
        {isHowItWorksOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#FAFAFA] overflow-y-auto text-black"
          >
            <div className="max-w-4xl mx-auto px-4 md:px-8 py-20">
              <div className="flex justify-between items-center mb-20">
                <button 
                  onClick={() => setIsHowItWorksOpen(false)} 
                  className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] hover:opacity-50 transition-opacity"
                >
                  <ArrowLeft size={16} />
                  Retour
                </button>
                <span className="hebrew text-xl text-black/20">בס"ד</span>
              </div>

              <div className="text-center mb-24">
                <h2 className="text-5xl md:text-7xl font-gothic mb-8 tracking-widest leading-tight uppercase">Comment ça marche</h2>
                <p className="text-black/40 text-sm md:text-base tracking-[0.2em] uppercase">Achetez et vendez en toute simplicité</p>
                <span className="hebrew text-2xl text-black/10 block mt-4">דרך הפעולה</span>
              </div>

              <div className="grid md:grid-cols-2 gap-24 mb-32">
                {/* Buyers Section */}
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] mb-12 text-black/40 border-b border-black/10 pb-4">POUR LES ACHETEURS</h3>
                  <div className="space-y-16">
                    {[
                      {
                        num: "1",
                        title: "Parcourez le catalogue",
                        desc: "Explorez notre sélection d'objets rituels, bijoux, mezouzot et créations artisanales. Filtrez par catégorie, prix ou artisan.",
                        icon: <Search size={20} />
                      },
                      {
                        num: "2",
                        title: "Ajoutez au panier",
                        desc: "Sélectionnez les articles qui vous plaisent et ajoutez-les à votre panier. Vous pouvez commander auprès de plusieurs artisans en une seule commande.",
                        icon: <ShoppingBag size={20} />
                      },
                      {
                        num: "3",
                        title: "Payez en toute sécurité",
                        desc: "Réglez par carte bancaire via notre système de paiement sécurisé Stripe. Vos données bancaires ne sont jamais stockées sur nos serveurs.",
                        icon: <ShieldCheck size={20} />
                      },
                      {
                        num: "4",
                        title: "Suivez votre commande",
                        desc: "Recevez un email de confirmation avec un numéro de suivi. Suivez l'acheminement de votre colis en temps réel.",
                        icon: <Truck size={20} />
                      }
                    ].map((step, i) => (
                      <div key={i} className="flex gap-8">
                        <div className="flex-shrink-0 w-12 h-12 border border-black/10 flex items-center justify-center text-[10px] font-bold">
                          {step.num}
                        </div>
                        <div>
                          <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] mb-3 flex items-center gap-3">
                            {step.icon}
                            {step.title}
                          </h4>
                          <p className="text-[11px] text-black/50 leading-relaxed tracking-wide uppercase">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sellers Section */}
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] mb-12 text-black/40 border-b border-black/10 pb-4">POUR LES VENDEURS</h3>
                  <div className="space-y-16">
                    {[
                      {
                        num: "1",
                        title: "Créez votre boutique",
                        desc: "Inscrivez-vous gratuitement et créez votre profil vendeur en quelques minutes. Choisissez le nom de votre boutique et ajoutez une description.",
                        icon: <Store size={20} />
                      },
                      {
                        num: "2",
                        title: "Connectez Stripe",
                        desc: "Configurez votre compte Stripe Connect pour recevoir vos paiements directement sur votre compte bancaire. La vérification prend quelques minutes.",
                        icon: <Link size={20} />
                      },
                      {
                        num: "3",
                        title: "Ajoutez vos produits",
                        desc: "Créez vos fiches produits avec photos, description, prix et variantes. Publiez-les quand vous êtes prêt.",
                        icon: <Plus size={20} />
                      },
                      {
                        num: "4",
                        title: "Vendez et expédiez",
                        desc: "Recevez des commandes, préparez vos colis et ajoutez le numéro de suivi. Vous êtes payé automatiquement après livraison.",
                        icon: <CheckCircle2 size={20} />
                      }
                    ].map((step, i) => (
                      <div key={i} className="flex gap-8">
                        <div className="flex-shrink-0 w-12 h-12 border border-black/10 flex items-center justify-center text-[10px] font-bold">
                          {step.num}
                        </div>
                        <div>
                          <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] mb-3 flex items-center gap-3">
                            {step.icon}
                            {step.title}
                          </h4>
                          <p className="text-[11px] text-black/50 leading-relaxed tracking-wide uppercase">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-black/10 pt-24 text-center">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] mb-8 text-black/40">Commission transparente</h3>
                <p className="text-sm md:text-base text-black/60 leading-loose tracking-widest uppercase mb-12 max-w-2xl mx-auto">
                  YDDISH MARKET prélève une commission de 20% sur chaque vente. Cette commission couvre l'hébergement de la plateforme, le support technique, la gestion des paiements et la promotion de votre boutique. Aucun frais caché, aucun abonnement mensuel.
                </p>
                <button 
                  onClick={() => {
                    setIsHowItWorksOpen(false);
                    setIsSellerPortalOpen(true);
                  }}
                  className="btn-premium"
                >
                  Prêt à rejoindre notre communauté d'artisans ?
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
