import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  User as UserIcon,
  Package,
  Heart,
  MapPin,
  RotateCcw,
  LogOut,
  Plus,
  Trash2,
  FileText,
  Truck,
  CheckCircle,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { Address } from '../../types';

export const CustomerDashboard: React.FC = () => {
  const {
    currentUser,
    login,
    register,
    logout,
    orders,
    wishlist,
    products,
    moveToCartFromWishlist,
    toggleWishlist,
    setPrintableOrder,
    setTrackingOrderId,
    addSavedAddress,
    deleteSavedAddress,
    updateUserProfile,
    returnRequests,
    shippingRates
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'wishlist' | 'returns' | 'profile'>('orders');

  // Auth form states (for non logged in)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authEmailOrPhone, setAuthEmailOrPhone] = useState('hamza.lahore@example.com');
  const [authPassword, setAuthPassword] = useState('pakistan123');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('0300');

  // New Address form
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addrTitle, setAddrTitle] = useState('Home');
  const [addrName, setAddrName] = useState(currentUser?.name || '');
  const [addrPhone, setAddrPhone] = useState(currentUser?.phone || '');
  const [addrProvince, setAddrProvince] = useState('Punjab');
  const [addrCity, setAddrCity] = useState('Lahore');
  const [addrArea, setAddrArea] = useState('');
  const [addrLine, setAddrLine] = useState('');

  // Profile Edit
  const [profileName, setProfileName] = useState(currentUser?.name || '');
  const [profilePhone, setProfilePhone] = useState(currentUser?.phone || '');
  const [profileEmail, setProfileEmail] = useState(currentUser?.email || '');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(authEmailOrPhone, authPassword);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim()) return;
    register(regName, regEmail, regPhone, authPassword);
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSavedAddress({
      title: addrTitle,
      recipientName: addrName,
      phone: addrPhone,
      province: addrProvince,
      city: addrCity,
      area: addrArea,
      addressLine: addrLine
    });
    setShowAddressForm(false);
    setAddrArea('');
    setAddrLine('');
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: profileName,
      phone: profilePhone,
      email: profileEmail
    });
  };

  // If not logged in, render clean Auth Tab
  if (!currentUser) {
    return (
      <div className="py-16 bg-[#FBFBFA]">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl border border-stone-200 p-6 sm:p-8 space-y-6">
            <div className="text-center">
              <span className="font-display text-2xl font-bold text-stone-900">
                KhaasBazaar
              </span>
              <p className="text-xs text-stone-500 mt-1">
                Access your orders, track parcels, and manage saved Pakistani addresses
              </p>
            </div>

            {/* Segmented Auth Selector */}
            <div className="flex rounded-lg bg-stone-100 p-1 text-xs font-semibold">
              <button
                onClick={() => setAuthMode('login')}
                className={`flex-1 py-2 rounded-md transition-colors cursor-pointer ${
                  authMode === 'login' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setAuthMode('register')}
                className={`flex-1 py-2 rounded-md transition-colors cursor-pointer ${
                  authMode === 'register' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500'
                }`}
              >
                Register
              </button>
            </div>

            {authMode === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Email or Pakistani Mobile Number
                  </label>
                  <input
                    type="text"
                    value={authEmailOrPhone}
                    onChange={e => setAuthEmailOrPhone(e.target.value)}
                    placeholder="e.g. 03001234567 or email@domain.pk"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:ring-1 focus:ring-emerald-800"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Password</label>
                  <input
                    type="password"
                    value={authPassword}
                    onChange={e => setAuthPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:ring-1 focus:ring-emerald-800"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-950 hover:bg-emerald-900 text-white rounded-lg font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer shadow-xs"
                >
                  Sign In to Account
                </button>

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => login('admin@khaasbazaar.pk')}
                    className="text-[11px] text-emerald-800 font-semibold hover:underline cursor-pointer"
                  >
                    Quick Sign In as Store Admin Demo
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={regName}
                    onChange={e => setRegName(e.target.value)}
                    placeholder="e.g. Usman Malik"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={e => setRegEmail(e.target.value)}
                    placeholder="usman@example.pk"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Pakistani Mobile Number *</label>
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={e => setRegPhone(e.target.value)}
                    placeholder="03001234567"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Create Password</label>
                  <input
                    type="password"
                    value={authPassword}
                    onChange={e => setAuthPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-950 hover:bg-emerald-900 text-white rounded-lg font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer"
                >
                  Create Account
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Customer Dashboard when logged in
  const myOrders = orders.filter(
    o =>
      o.userId === currentUser.id ||
      o.customerEmail.toLowerCase() === currentUser.email?.toLowerCase() ||
      o.customerPhone === currentUser.phone
  );

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="py-12 bg-[#FBFBFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* User Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-emerald-950 text-white flex items-center justify-center font-display font-bold text-xl">
              {currentUser.name[0]?.toUpperCase() || 'U'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-xl font-bold text-stone-900">
                  {currentUser.name}
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {currentUser.role}
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5 font-mono">
                {currentUser.phone} · {currentUser.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={logout}
              className="px-3.5 py-2 border border-stone-300 hover:bg-stone-50 text-stone-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-stone-500" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* 2 Column Layout: Nav Tabs + Content Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Navigation Tabs (3 cols) */}
          <div className="lg:col-span-3 bg-white rounded-xl border border-stone-200 divide-y divide-stone-100 overflow-hidden text-xs">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full p-3.5 text-left flex items-center justify-between cursor-pointer transition-colors ${
                activeTab === 'orders' ? 'bg-emerald-50 text-emerald-950 font-bold' : 'text-stone-700 hover:bg-stone-50'
              }`}
            >
              <span className="flex items-center gap-2">
                <Package className="w-4 h-4 text-emerald-800" />
                My Orders
              </span>
              <span className="font-mono bg-stone-100 px-2 py-0.5 rounded">{myOrders.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={`w-full p-3.5 text-left flex items-center justify-between cursor-pointer transition-colors ${
                activeTab === 'wishlist' ? 'bg-emerald-50 text-emerald-950 font-bold' : 'text-stone-700 hover:bg-stone-50'
              }`}
            >
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-amber-700" />
                My Wishlist
              </span>
              <span className="font-mono bg-stone-100 px-2 py-0.5 rounded">{wishlist.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full p-3.5 text-left flex items-center justify-between cursor-pointer transition-colors ${
                activeTab === 'addresses' ? 'bg-emerald-50 text-emerald-950 font-bold' : 'text-stone-700 hover:bg-stone-50'
              }`}
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-stone-600" />
                Saved Delivery Addresses
              </span>
              <span className="font-mono bg-stone-100 px-2 py-0.5 rounded">{currentUser.savedAddresses.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('returns')}
              className={`w-full p-3.5 text-left flex items-center justify-between cursor-pointer transition-colors ${
                activeTab === 'returns' ? 'bg-emerald-50 text-emerald-950 font-bold' : 'text-stone-700 hover:bg-stone-50'
              }`}
            >
              <span className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-rose-600" />
                Returns & Exchanges
              </span>
              <span className="font-mono bg-stone-100 px-2 py-0.5 rounded">{returnRequests.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full p-3.5 text-left flex items-center justify-between cursor-pointer transition-colors ${
                activeTab === 'profile' ? 'bg-emerald-50 text-emerald-950 font-bold' : 'text-stone-700 hover:bg-stone-50'
              }`}
            >
              <span className="flex items-center gap-2">
                <UserIcon className="w-4 h-4 text-stone-600" />
                Account Profile
              </span>
            </button>
          </div>

          {/* Right Column: Active Tab Content (9 cols) */}
          <div className="lg:col-span-9 bg-white rounded-xl border border-stone-200 p-6 min-h-[400px]">
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <h3 className="font-display text-base font-bold text-stone-900">
                    Order History ({myOrders.length})
                  </h3>
                  <span className="text-xs text-stone-500">Track and view invoices</span>
                </div>

                {myOrders.length === 0 ? (
                  <div className="py-12 text-center text-stone-500 space-y-2">
                    <Package className="w-10 h-10 text-stone-300 mx-auto" />
                    <p className="font-semibold text-stone-800 text-sm">No orders placed yet</p>
                    <p className="text-xs">Browse our Pakistani collection and enjoy nationwide Cash on Delivery.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {myOrders.map(order => (
                      <div
                        key={order.id}
                        className="rounded-xl border border-stone-200 p-4 sm:p-5 bg-stone-50/40 space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-200/80 text-xs">
                          <div>
                            <span className="font-mono font-bold text-stone-900 text-sm">{order.id}</span>
                            <span className="text-stone-400 mx-2">·</span>
                            <span className="text-stone-500">
                              {new Date(order.createdAt).toLocaleDateString('en-PK', { dateStyle: 'medium' })}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-stone-950">
                              Rs. {order.total.toLocaleString()}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-900">
                              {order.orderStatus}
                            </span>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-2">
                          {order.items.map((item, i) => (
                            <div key={i} className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2">
                                <img
                                  src={item.image}
                                  alt={item.productName}
                                  referrerPolicy="no-referrer"
                                  className="w-10 h-10 object-cover rounded bg-stone-200"
                                />
                                <div>
                                  <p className="font-semibold text-stone-900">{item.productName}</p>
                                  {item.variantName && (
                                    <p className="text-[10px] text-amber-800">{item.variantName}</p>
                                  )}
                                  <p className="text-stone-500 text-[10px]">Qty: {item.quantity}</p>
                                </div>
                              </div>
                              <span className="font-mono font-semibold text-stone-900">
                                Rs. {item.subtotal.toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Order Actions */}
                        <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-stone-200/80">
                          <p className="text-[11px] text-stone-500">
                            Courier: <strong className="text-stone-800">{order.courierName || 'TCS'}</strong> ({order.trackingNumber})
                          </p>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setPrintableOrder(order)}
                              className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>Invoice</span>
                            </button>

                            <button
                              onClick={() => setTrackingOrderId(order.id)}
                              className="px-3 py-1.5 bg-emerald-950 hover:bg-emerald-900 text-white rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                            >
                              <Truck className="w-3.5 h-3.5" />
                              <span>Track</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <div className="pb-3 border-b border-stone-100 flex items-center justify-between">
                  <h3 className="font-display text-base font-bold text-stone-900">
                    Saved Wishlist Items ({wishlistProducts.length})
                  </h3>
                </div>

                {wishlistProducts.length === 0 ? (
                  <div className="py-12 text-center text-stone-500 space-y-2">
                    <Heart className="w-10 h-10 text-stone-300 mx-auto" />
                    <p className="font-semibold text-stone-800 text-sm">Your wishlist is empty</p>
                    <p className="text-xs">Click the heart icon on any product to save it for later.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wishlistProducts.map(p => (
                      <div
                        key={p.id}
                        className="p-3 rounded-xl border border-stone-200 bg-white flex gap-3 items-center justify-between"
                      >
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 object-cover rounded-lg bg-stone-100 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-stone-900 truncate">{p.name}</h4>
                          <p className="font-mono text-xs font-bold text-emerald-950 mt-0.5">
                            Rs. {p.price.toLocaleString()}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => moveToCartFromWishlist(p.id)}
                              className="px-3 py-1 bg-emerald-950 text-white text-[11px] font-semibold rounded hover:bg-emerald-900 cursor-pointer"
                            >
                              Move to Cart
                            </button>
                            <button
                              onClick={() => toggleWishlist(p.id)}
                              className="text-stone-400 hover:text-rose-600 text-[11px] cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <h3 className="font-display text-base font-bold text-stone-900">
                    Saved Delivery Addresses ({currentUser.savedAddresses.length})
                  </h3>
                  <button
                    onClick={() => setShowAddressForm(!showAddressForm)}
                    className="px-3 py-1.5 bg-emerald-950 text-white rounded text-xs font-semibold flex items-center gap-1.5 hover:bg-emerald-900 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Address</span>
                  </button>
                </div>

                {showAddressForm && (
                  <form onSubmit={handleAddressSubmit} className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3 text-xs">
                    <h4 className="font-bold text-stone-900">New Address Information</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold mb-1">Address Label</label>
                        <input
                          type="text"
                          value={addrTitle}
                          onChange={e => setAddrTitle(e.target.value)}
                          placeholder="e.g. Home, Office"
                          className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded"
                          required
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">Recipient Name</label>
                        <input
                          type="text"
                          value={addrName}
                          onChange={e => setAddrName(e.target.value)}
                          className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded"
                          required
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">Phone Number</label>
                        <input
                          type="text"
                          value={addrPhone}
                          onChange={e => setAddrPhone(e.target.value)}
                          className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded font-mono"
                          required
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">City</label>
                        <select
                          value={addrCity}
                          onChange={e => {
                            setAddrCity(e.target.value);
                            const matched = shippingRates.find(c => c.city === e.target.value);
                            if (matched) setAddrProvince(matched.province);
                          }}
                          className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded"
                        >
                          {shippingRates.map(c => (
                            <option key={c.city} value={c.city}>{c.city}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-span-2">
                        <label className="block font-semibold mb-1">Area / Sector</label>
                        <input
                          type="text"
                          value={addrArea}
                          onChange={e => setAddrArea(e.target.value)}
                          placeholder="e.g. DHA Phase 5, Sector C"
                          className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded"
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block font-semibold mb-1">Street Address</label>
                        <input
                          type="text"
                          value={addrLine}
                          onChange={e => setAddrLine(e.target.value)}
                          placeholder="House #, Street #"
                          className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddressForm(false)}
                        className="px-3 py-1.5 border rounded text-stone-600 hover:bg-stone-100"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-emerald-950 text-white font-bold rounded hover:bg-emerald-800"
                      >
                        Save Address
                      </button>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentUser.savedAddresses.map(addr => (
                    <div
                      key={addr.id}
                      className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 relative space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-stone-900">{addr.title}</span>
                        <button
                          onClick={() => deleteSavedAddress(addr.id)}
                          className="text-stone-400 hover:text-rose-600 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="font-medium text-stone-800">{addr.recipientName}</p>
                      <p className="text-stone-500 font-mono">{addr.phone}</p>
                      <p className="text-stone-600 pt-1">
                        {addr.addressLine}, {addr.area}
                      </p>
                      <p className="font-semibold text-stone-900">
                        {addr.city}, {addr.province}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Returns Tab */}
            {activeTab === 'returns' && (
              <div className="space-y-6">
                <div className="pb-3 border-b border-stone-100 flex items-center justify-between">
                  <h3 className="font-display text-base font-bold text-stone-900">
                    7-Day Return & Exchange Requests ({returnRequests.length})
                  </h3>
                </div>

                {returnRequests.length === 0 ? (
                  <div className="py-12 text-center text-stone-500 space-y-2">
                    <RotateCcw className="w-10 h-10 text-stone-300 mx-auto" />
                    <p className="font-semibold text-stone-800 text-sm">No return requests active</p>
                    <p className="text-xs">If an item does not fit or has defects, you can submit a return from your delivered order page.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {returnRequests.map(r => (
                      <div key={r.id} className="p-4 rounded-xl border border-stone-200 bg-stone-50 text-xs space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-stone-900 font-mono">Case #{r.id}</span>
                          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-900">
                            {r.status}
                          </span>
                        </div>
                        <p><strong className="text-stone-600">Product:</strong> {r.productName}</p>
                        <p><strong className="text-stone-600">Reason:</strong> {r.reason}</p>
                        <p className="text-stone-500 italic">"{r.details}"</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <form onSubmit={handleProfileSave} className="space-y-4 max-w-md text-xs">
                <div className="pb-3 border-b border-stone-100">
                  <h3 className="font-display text-base font-bold text-stone-900">
                    Personal Profile Details
                  </h3>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={e => setProfileName(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Mobile Phone</label>
                  <input
                    type="text"
                    value={profilePhone}
                    onChange={e => setProfilePhone(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={profileEmail}
                    onChange={e => setProfileEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-950 text-white font-bold rounded-lg text-xs hover:bg-emerald-900 cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
