import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  ShoppingBag,
  Heart,
  User as UserIcon,
  Search,
  Truck,
  ShieldCheck,
  ChevronDown,
  X,
  SlidersHorizontal,
  LogOut,
  ExternalLink
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    cart,
    wishlist,
    currentUser,
    loginAsAdmin,
    logout,
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    setTrackingOrderId,
    settings
  } = useStore();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [trackInput, setTrackInput] = useState('');
  const [showQuickTrack, setShowQuickTrack] = useState(false);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveView('catalog');
      setIsSearchOpen(false);
    }
  };

  const handleQuickTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackInput.trim()) {
      setTrackingOrderId(trackInput.trim());
      setShowQuickTrack(false);
      setTrackInput('');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBFBFA]/95 backdrop-blur-md border-b border-stone-200/80">
      {/* Top Announcement Bar */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-medium tracking-wide">
              <Truck className="w-3.5 h-3.5 text-emerald-400" />
              Free Nationwide Shipping on orders over Rs. {settings.freeShippingThreshold.toLocaleString()}
            </span>
            <span className="hidden sm:inline text-emerald-500">·</span>
            <span className="hidden sm:inline text-emerald-300">
              Cash on Delivery (COD) Available in 150+ Cities
            </span>
          </div>
          <div className="flex items-center gap-4 text-emerald-300">
            <button
              onClick={() => setShowQuickTrack(true)}
              className="hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1"
            >
              <span>Track Parcel</span>
            </button>
            <span className="text-emerald-700">|</span>
            <span className="hidden md:inline font-mono">Helpline: {settings.whatsappNumber}</span>
          </div>
        </div>
      </div>

      {/* Main 3-Zone Header Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Mark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setActiveView('home');
              setSelectedCategoryFilter('');
            }}
            className="text-left group cursor-pointer"
          >
            <span className="font-display text-2xl font-bold tracking-tight text-emerald-950 group-hover:text-emerald-800 transition-colors">
              KhaasBazaar
            </span>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-amber-700 block -mt-1 font-sans">
              Pakistan Artisans
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-700">
          <button
            onClick={() => {
              setActiveView('home');
              setSelectedCategoryFilter('');
            }}
            className={`transition-colors cursor-pointer hover:text-emerald-900 ${
              activeView === 'home' ? 'text-emerald-900 font-semibold border-b-2 border-emerald-800 pb-0.5' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => {
              setSelectedCategoryFilter("Women's Festive Pret & Lawn");
              setActiveView('catalog');
            }}
            className="transition-colors cursor-pointer text-amber-800 font-semibold hover:text-amber-900 flex items-center gap-1"
          >
            <span>Ladies Collection</span>
          </button>
          <button
            onClick={() => {
              setSelectedCategoryFilter('Handcrafted Bridal Khussas');
              setActiveView('catalog');
            }}
            className="transition-colors cursor-pointer hover:text-emerald-900"
          >
            Bridal Khussas
          </button>
          <button
            onClick={() => {
              setSelectedCategoryFilter('Footwear & Peshawari Chappals');
              setActiveView('catalog');
            }}
            className="transition-colors cursor-pointer hover:text-emerald-900"
          >
            Peshawari Chappals
          </button>
          <button
            onClick={() => {
              setSelectedCategoryFilter('Handloom Shawls & Ajrak');
              setActiveView('catalog');
            }}
            className="transition-colors cursor-pointer hover:text-emerald-900"
          >
            Ajrak & Shawls
          </button>
          <button
            onClick={() => {
              setActiveView('catalog');
              setSelectedCategoryFilter('');
            }}
            className={`transition-colors cursor-pointer hover:text-emerald-900 ${
              activeView === 'catalog' && selectedCategoryFilter === '' ? 'text-emerald-900 font-semibold border-b-2 border-emerald-800 pb-0.5' : ''
            }`}
          >
            All Crafts
          </button>
        </nav>

        {/* Zone 3: Actions (Search, Wishlist, Cart, Account, Admin Mode) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Toggle */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 text-stone-700 hover:text-emerald-950 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
            title="Search products"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist */}
          <button
            onClick={() => {
              if (currentUser) {
                setActiveView('account');
              } else {
                setActiveView('catalog');
              }
            }}
            className="p-2 text-stone-700 hover:text-emerald-950 hover:bg-stone-100 rounded-lg transition-colors relative cursor-pointer"
            title="Wishlist"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-amber-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Bag */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2 text-stone-700 hover:text-emerald-950 hover:bg-stone-100 rounded-lg transition-colors relative cursor-pointer"
            title="Shopping Cart"
            aria-label="Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-800 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Account Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-1.5 p-1.5 text-stone-700 hover:text-emerald-950 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
              aria-label="User Account"
            >
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center font-semibold text-xs border border-emerald-200">
                {currentUser ? currentUser.name[0].toUpperCase() : <UserIcon className="w-4 h-4" />}
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
            </button>

            {isUserMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-stone-200 py-1.5 text-sm z-50 animate-in fade-in"
                onClick={() => setIsUserMenuOpen(false)}
              >
                {currentUser ? (
                  <>
                    <div className="px-4 py-2 border-b border-stone-100">
                      <p className="font-semibold text-stone-900 truncate">{currentUser.name}</p>
                      <p className="text-xs text-stone-500 truncate">{currentUser.email || currentUser.phone}</p>
                      <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
                        {currentUser.role === 'admin' ? 'Store Administrator' : 'Customer Account'}
                      </span>
                    </div>

                    <button
                      onClick={() => setActiveView('account')}
                      className="w-full text-left px-4 py-2 text-stone-700 hover:bg-stone-50 hover:text-emerald-900 flex items-center gap-2 cursor-pointer"
                    >
                      <UserIcon className="w-4 h-4 text-stone-400" />
                      My Orders & Profile
                    </button>

                    {currentUser.role === 'admin' && (
                      <button
                        onClick={() => setActiveView('admin')}
                        className="w-full text-left px-4 py-2 text-emerald-900 font-medium hover:bg-emerald-50 flex items-center gap-2 cursor-pointer"
                      >
                        <SlidersHorizontal className="w-4 h-4 text-emerald-700" />
                        Admin Dashboard
                      </button>
                    )}

                    <button
                      onClick={() => setShowQuickTrack(true)}
                      className="w-full text-left px-4 py-2 text-stone-700 hover:bg-stone-50 flex items-center gap-2 cursor-pointer"
                    >
                      <Truck className="w-4 h-4 text-stone-400" />
                      Track Parcel
                    </button>

                    <div className="border-t border-stone-100 mt-1">
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-rose-700 hover:bg-rose-50 flex items-center gap-2 cursor-pointer text-xs"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="px-4 py-2 text-xs text-stone-500 border-b border-stone-100">
                      Sign in for faster checkout & tracking
                    </div>
                    <button
                      onClick={() => setActiveView('account')}
                      className="w-full text-left px-4 py-2 font-medium text-emerald-950 hover:bg-emerald-50 cursor-pointer"
                    >
                      Customer Login / Register
                    </button>
                    <button
                      onClick={loginAsAdmin}
                      className="w-full text-left px-4 py-2 text-xs text-stone-600 hover:bg-stone-100 cursor-pointer flex items-center justify-between"
                    >
                      <span>Admin Demo Login</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Quick Admin Switcher Button for convenient testing */}
          <button
            onClick={() => {
              if (currentUser?.role === 'admin') {
                setActiveView(activeView === 'admin' ? 'home' : 'admin');
              } else {
                loginAsAdmin();
              }
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border border-stone-300 text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-colors cursor-pointer whitespace-nowrap"
            title="Switch to Admin Panel"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-800" />
            <span>Admin</span>
          </button>
        </div>
      </div>

      {/* Instant Search Bar Expansion */}
      {isSearchOpen && (
        <div className="border-t border-stone-200 bg-white px-4 py-3 shadow-inner">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="w-5 h-5 absolute left-3.5 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search Peshawari chappals, Boski kurtas, Ajrak, Sialkot willow bats, Quetta dry fruits..."
                className="w-full pl-11 pr-24 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:bg-white"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-10 px-3 py-1 text-xs font-medium text-white bg-emerald-900 rounded hover:bg-emerald-800 cursor-pointer"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-2 p-1.5 text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
            <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-stone-500">
              <span className="font-medium text-stone-700">Popular:</span>
              <button
                onClick={() => {
                  setSearchQuery('Lawn');
                  setActiveView('catalog');
                  setIsSearchOpen(false);
                }}
                className="hover:text-emerald-900 underline cursor-pointer text-amber-800 font-semibold"
              >
                Festive Lawn Suits
              </button>
              <span>·</span>
              <button
                onClick={() => {
                  setSearchQuery('Khussa');
                  setActiveView('catalog');
                  setIsSearchOpen(false);
                }}
                className="hover:text-emerald-900 underline cursor-pointer"
              >
                Bridal Khussas
              </button>
              <span>·</span>
              <button
                onClick={() => {
                  setSearchQuery('Kundan');
                  setActiveView('catalog');
                  setIsSearchOpen(false);
                }}
                className="hover:text-emerald-900 underline cursor-pointer"
              >
                Kundan Jhumkas
              </button>
              <span>·</span>
              <button
                onClick={() => {
                  setSearchQuery('Chikankari');
                  setActiveView('catalog');
                  setIsSearchOpen(false);
                }}
                className="hover:text-emerald-900 underline cursor-pointer"
              >
                Multani Chikankari
              </button>
              <span>·</span>
              <button
                onClick={() => {
                  setSearchQuery('Charsadda');
                  setActiveView('catalog');
                  setIsSearchOpen(false);
                }}
                className="hover:text-emerald-900 underline cursor-pointer"
              >
                Peshawari Chappal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Track Modal */}
      {showQuickTrack && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border border-stone-200 relative">
            <button
              onClick={() => setShowQuickTrack(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-emerald-900 mb-1">
              <Truck className="w-5 h-5" />
              <h3 className="font-bold text-lg">Track Your Order</h3>
            </div>
            <p className="text-xs text-stone-500 mb-4">
              Enter your Pakistani order number (e.g. PK-2026-004812) or TCS/Trax tracking number.
            </p>
            <form onSubmit={handleQuickTrackSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Order Number</label>
                <input
                  type="text"
                  value={trackInput}
                  onChange={e => setTrackInput(e.target.value)}
                  placeholder="e.g. PK-2026-004812"
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg text-sm uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  required
                />
              </div>
              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setTrackingOrderId('PK-2026-004812');
                    setShowQuickTrack(false);
                  }}
                  className="text-xs text-emerald-800 hover:underline cursor-pointer"
                >
                  Demo order: PK-2026-004812
                </button>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowQuickTrack(false)}
                  className="px-4 py-2 text-xs font-medium text-stone-600 hover:bg-stone-100 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-950 hover:bg-emerald-800 rounded-lg cursor-pointer"
                >
                  Track Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
