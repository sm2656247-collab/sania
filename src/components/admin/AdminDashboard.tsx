import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product, OrderStatus, Coupon, Category } from '../../types';
import {
  TrendingUp,
  Package,
  ShoppingBag,
  Users,
  AlertTriangle,
  Plus,
  Search,
  Edit,
  Trash2,
  Copy,
  CheckCircle,
  Truck,
  FileText,
  Sliders,
  Percent,
  MapPin,
  Settings,
  Eye,
  X,
  RotateCcw
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    duplicateProduct,
    adjustStock,
    categories,
    addCategory,
    deleteCategory,
    orders,
    updateOrderStatus,
    coupons,
    addCoupon,
    deleteCoupon,
    toggleCoupon,
    shippingRates,
    updateShippingRate,
    settings,
    updateSettings,
    returnRequests,
    updateReturnStatus,
    setPrintableOrder,
    setTrackingOrderId
  } = useStore();

  const [adminTab, setAdminTab] = useState<
    'overview' | 'products' | 'inventory' | 'orders' | 'returns' | 'coupons' | 'shipping' | 'settings'
  >('overview');

  // Search & Filter in Admin
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');

  // Modals
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddCouponModal, setShowAddCouponModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

  // Status update modal for Order
  const [selectedOrderForStatus, setSelectedOrderForStatus] = useState<string | null>(null);
  const [newStatusValue, setNewStatusValue] = useState<OrderStatus>('Confirmed');
  const [newCourierName, setNewCourierName] = useState('TCS Pakistan');
  const [newTrackingNum, setNewTrackingNum] = useState('');
  const [statusNote, setStatusNote] = useState('');

  // New Product Form State
  const [newProdName, setNewProdName] = useState('');
  const [newProdBrand, setNewProdBrand] = useState('Charsadda Heritage');
  const [newProdCategory, setNewProdCategory] = useState(categories[0]?.name || 'Footwear & Peshawari Chappals');
  const [newProdPrice, setNewProdPrice] = useState(4999);
  const [newProdOrigPrice, setNewProdOrigPrice] = useState(5999);
  const [newProdStock, setNewProdStock] = useState(20);
  const [newProdCity, setNewProdCity] = useState('Peshawar');
  const [newProdShortDesc, setNewProdShortDesc] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdImage, setNewProdImage] = useState('/src/assets/images/peshawari_chappal_1791270548402.jpg');

  // New Coupon Form State
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponType, setNewCouponType] = useState<'percent' | 'fixed'>('percent');
  const [newCouponValue, setNewCouponValue] = useState(15);
  const [newCouponMin, setNewCouponMin] = useState(2500);
  const [newCouponDesc, setNewCouponDesc] = useState('');

  // New Category Form State
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [newCatImg, setNewCatImg] = useState('/src/assets/images/hero_banner_crafts_1791270531944.jpg');

  // Overview Metrics Calculations
  const totalSales = orders.reduce((sum, o) => (o.orderStatus !== 'Cancelled' ? sum + o.total : sum), 0);
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter(o => o.orderStatus === 'Pending' || o.orderStatus === 'Confirmed').length;
  const deliveredOrdersCount = orders.filter(o => o.orderStatus === 'Delivered').length;
  const cancelledOrdersCount = orders.filter(o => o.orderStatus === 'Cancelled').length;
  const lowStockCount = products.filter(p => p.stock <= p.lowStockThreshold).length;
  const outOfStockCount = products.filter(p => p.stock <= 0).length;

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    const slug = newProdName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const sku = `KB-${slug.slice(0, 4).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: newProdName,
        brand: newProdBrand,
        category: newProdCategory,
        price: Number(newProdPrice),
        originalPrice: Number(newProdOrigPrice),
        stock: Number(newProdStock),
        originCity: newProdCity,
        shortDescription: newProdShortDesc,
        description: newProdDesc,
        images: [newProdImage]
      });
      setEditingProduct(null);
    } else {
      addProduct({
        name: newProdName,
        slug,
        sku,
        brand: newProdBrand,
        category: newProdCategory,
        price: Number(newProdPrice),
        originalPrice: Number(newProdOrigPrice),
        stock: Number(newProdStock),
        lowStockThreshold: 5,
        originCity: newProdCity,
        shortDescription: newProdShortDesc,
        description: newProdDesc,
        images: [newProdImage],
        tags: [newProdBrand.toLowerCase(), newProdCategory.toLowerCase()],
        specs: {
          'Origin': `${newProdCity}, Pakistan`,
          'Craftsmanship': 'Master Artisan Handcrafted'
        },
        features: [
          'Authentic regional sourcing',
          'Premium finish with inspected durability',
          'Cash on delivery available'
        ],
        shippingDays: '2-3 Business Days',
        rating: 5.0,
        reviewCount: 1,
        status: 'active',
        returnPolicy: '7-day easy size exchange & return across Pakistan.',
        warranty: 'Authenticity guarantee'
      });
    }

    setShowAddProductModal(false);
    resetProductForm();
  };

  const resetProductForm = () => {
    setNewProdName('');
    setNewProdBrand('Charsadda Heritage');
    setNewProdPrice(4999);
    setNewProdOrigPrice(5999);
    setNewProdStock(20);
    setNewProdCity('Peshawar');
    setNewProdShortDesc('');
    setNewProdDesc('');
  };

  const handleEditClick = (prod: Product) => {
    setEditingProduct(prod);
    setNewProdName(prod.name);
    setNewProdBrand(prod.brand);
    setNewProdCategory(prod.category);
    setNewProdPrice(prod.price);
    setNewProdOrigPrice(prod.originalPrice || prod.price);
    setNewProdStock(prod.stock);
    setNewProdCity(prod.originCity);
    setNewProdShortDesc(prod.shortDescription);
    setNewProdDesc(prod.description);
    setNewProdImage(prod.images[0] || '');
    setShowAddProductModal(true);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    addCoupon({
      code: newCouponCode.trim().toUpperCase(),
      type: newCouponType,
      value: Number(newCouponValue),
      minOrderAmount: Number(newCouponMin),
      expiryDate: '2026-12-31',
      usageCount: 0,
      isActive: true,
      description: newCouponDesc || `${newCouponValue}${newCouponType === 'percent' ? '%' : ' PKR'} Discount Voucher`
    });
    setNewCouponCode('');
    setShowAddCouponModal(false);
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    addCategory({
      id: 'cat-' + Date.now(),
      name: newCatName.trim(),
      slug: newCatName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: newCatDesc || 'Heritage craft category',
      image: newCatImg,
      itemCount: 0,
      featured: true
    });
    setNewCatName('');
    setNewCatDesc('');
    setShowAddCategoryModal(false);
  };

  const handleOrderStatusSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderForStatus) return;
    updateOrderStatus(
      selectedOrderForStatus,
      newStatusValue,
      newCourierName,
      newTrackingNum,
      statusNote
    );
    setSelectedOrderForStatus(null);
  };

  // Filter products
  const filteredProducts = products.filter(
    p =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.sku.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.brand.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.originCity.toLowerCase().includes(productSearch.toLowerCase())
  );

  // Filter orders
  const filteredOrders = orders.filter(o => {
    const matchesSearch =
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerPhone.includes(orderSearch);
    const matchesStatus = orderStatusFilter === 'all' || o.orderStatus === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="py-8 bg-stone-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Admin Header */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
              <h1 className="font-display text-xl sm:text-2xl font-bold text-stone-900">
                KhaasBazaar Admin Command Center
              </h1>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Store Management · Real-Time Inventory · Pakistani COD & Courier Logistics
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-mono bg-stone-100 px-3 py-1.5 rounded text-stone-700 font-bold border border-stone-200">
              Orders: {orders.length}
            </span>
            <span className="font-mono bg-emerald-100 text-emerald-950 px-3 py-1.5 rounded font-bold border border-emerald-200">
              Sales: Rs. {totalSales.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Tab Navigation Navigation Bar */}
        <div className="bg-white rounded-xl border border-stone-200 p-1 flex flex-wrap gap-1 text-xs font-semibold overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview Analytics', icon: TrendingUp },
            { id: 'products', label: `Products (${products.length})`, icon: Package },
            { id: 'inventory', label: `Inventory & Stock`, icon: AlertTriangle },
            { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'returns', label: `Returns (${returnRequests.length})`, icon: RotateCcw },
            { id: 'coupons', label: `Coupons (${coupons.length})`, icon: Percent },
            { id: 'shipping', label: 'Shipping & Cities', icon: MapPin },
            { id: 'settings', label: 'Store Settings', icon: Settings }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setAdminTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  adminTab === tab.id
                    ? 'bg-emerald-950 text-white shadow-xs'
                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 1. Overview Analytics Tab */}
        {adminTab === 'overview' && (
          <div className="space-y-6">
            {/* Metric Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
                <span className="text-[11px] uppercase tracking-wider text-stone-500 font-bold">Total Sales (PKR)</span>
                <p className="text-2xl font-bold font-mono text-emerald-950 mt-1">
                  Rs. {totalSales.toLocaleString()}
                </p>
                <span className="text-[10px] text-emerald-700 font-medium">Excluding cancelled orders</span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
                <span className="text-[11px] uppercase tracking-wider text-stone-500 font-bold">Total Orders</span>
                <p className="text-2xl font-bold font-mono text-stone-900 mt-1">
                  {totalOrdersCount}
                </p>
                <span className="text-[10px] text-amber-700 font-medium">{pendingOrdersCount} in fulfillment queue</span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
                <span className="text-[11px] uppercase tracking-wider text-stone-500 font-bold">Delivered Orders</span>
                <p className="text-2xl font-bold font-mono text-emerald-800 mt-1">
                  {deliveredOrdersCount}
                </p>
                <span className="text-[10px] text-stone-500">{cancelledOrdersCount} cancelled</span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
                <span className="text-[11px] uppercase tracking-wider text-stone-500 font-bold">Low Stock Alerts</span>
                <p className={`text-2xl font-bold font-mono mt-1 ${lowStockCount > 0 ? 'text-rose-600' : 'text-stone-900'}`}>
                  {lowStockCount} Items
                </p>
                <span className="text-[10px] text-rose-500 font-medium">{outOfStockCount} completely out of stock</span>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <h3 className="font-display text-sm font-bold text-stone-900">
                  Latest Pakistani Consignments
                </h3>
                <button
                  onClick={() => setAdminTab('orders')}
                  className="text-xs text-emerald-800 font-bold hover:underline cursor-pointer"
                >
                  View All Orders →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-stone-50 text-stone-600 uppercase text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3">Order Number</th>
                      <th className="py-2.5 px-3">Customer</th>
                      <th className="py-2.5 px-3">City</th>
                      <th className="py-2.5 px-3">Payment</th>
                      <th className="py-2.5 px-3">Amount</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-mono">
                    {orders.slice(0, 5).map(o => (
                      <tr key={o.id} className="hover:bg-stone-50/50">
                        <td className="py-2.5 px-3 font-bold text-stone-900">{o.id}</td>
                        <td className="py-2.5 px-3 font-sans text-stone-800">{o.customerName}</td>
                        <td className="py-2.5 px-3 font-sans text-stone-600">{o.shippingAddress.city}</td>
                        <td className="py-2.5 px-3 font-sans text-stone-700">{o.paymentMethod}</td>
                        <td className="py-2.5 px-3 font-bold text-stone-900">Rs. {o.total.toLocaleString()}</td>
                        <td className="py-2.5 px-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-900">
                            {o.orderStatus}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right font-sans">
                          <button
                            onClick={() => {
                              setSelectedOrderForStatus(o.id);
                              setNewStatusValue(o.orderStatus);
                              setNewCourierName(o.courierName || 'TCS Pakistan');
                              setNewTrackingNum(o.trackingNumber || '');
                            }}
                            className="text-emerald-800 hover:underline font-bold text-xs cursor-pointer mr-2"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => setPrintableOrder(o)}
                            className="text-stone-500 hover:text-stone-900 text-xs cursor-pointer"
                          >
                            Invoice
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. Products Tab */}
        {adminTab === 'products' && (
          <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={e => setProductSearch(e.target.value)}
                  placeholder="Search products by SKU, name, or city..."
                  className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAddCategoryModal(true)}
                  className="px-3 py-2 border border-stone-300 rounded-lg text-xs font-semibold text-stone-700 hover:bg-stone-50 cursor-pointer"
                >
                  Manage Categories ({categories.length})
                </button>
                <button
                  onClick={() => {
                    resetProductForm();
                    setEditingProduct(null);
                    setShowAddProductModal(true);
                  }}
                  className="px-4 py-2 bg-emerald-950 text-white rounded-lg text-xs font-bold hover:bg-emerald-900 flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-stone-50 text-stone-600 uppercase text-[10px]">
                  <tr>
                    <th className="py-3 px-3">Product</th>
                    <th className="py-3 px-3">SKU</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Origin</th>
                    <th className="py-3 px-3">Price</th>
                    <th className="py-3 px-3">Stock</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredProducts.map(prod => (
                    <tr key={prod.id} className="hover:bg-stone-50/50">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            referrerPolicy="no-referrer"
                            className="w-9 h-9 object-cover rounded bg-stone-200 shrink-0"
                          />
                          <div>
                            <span className="font-bold text-stone-900 block truncate max-w-xs">{prod.name}</span>
                            <span className="text-[10px] text-stone-500">{prod.brand}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-stone-700">{prod.sku}</td>
                      <td className="py-3 px-3 text-stone-600">{prod.category}</td>
                      <td className="py-3 px-3 text-stone-600">{prod.originCity}</td>
                      <td className="py-3 px-3 font-mono font-bold text-stone-900">
                        Rs. {prod.price.toLocaleString()}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`font-mono font-bold ${
                            prod.stock <= prod.lowStockThreshold ? 'text-rose-600' : 'text-stone-900'
                          }`}
                        >
                          {prod.stock} units
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-900 border border-emerald-200">
                          {prod.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleEditClick(prod)}
                            className="p-1.5 text-stone-500 hover:text-emerald-900 rounded hover:bg-stone-100 cursor-pointer"
                            title="Edit"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => duplicateProduct(prod.id)}
                            className="p-1.5 text-stone-500 hover:text-amber-800 rounded hover:bg-stone-100 cursor-pointer"
                            title="Duplicate"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteProduct(prod.id)}
                            className="p-1.5 text-stone-500 hover:text-rose-600 rounded hover:bg-stone-100 cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. Inventory Management Tab */}
        {adminTab === 'inventory' && (
          <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <h3 className="font-display text-sm font-bold text-stone-900">
                  Real-Time Warehouse Stock & Reorder Levels
                </h3>
                <p className="text-xs text-stone-500">
                  Stock decreases automatically on customer checkout and restores on cancellation.
                </p>
              </div>
            </div>

            <div className="divide-y divide-stone-100">
              {products.map(p => (
                <div key={p.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 object-cover rounded bg-stone-200"
                    />
                    <div>
                      <h4 className="font-bold text-stone-900">{p.name}</h4>
                      <p className="text-stone-500 font-mono">SKU: {p.sku} · Crafted in {p.originCity}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="font-mono font-bold text-sm text-stone-900">{p.stock} units</span>
                      {p.stock <= p.lowStockThreshold && (
                        <span className="block text-[10px] text-rose-600 font-bold">
                          LOW STOCK ALERT
                        </span>
                      )}
                    </div>

                    {/* Quick Stock adjust buttons */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => adjustStock(p.id, -1)}
                        className="px-2 py-1 bg-stone-100 hover:bg-stone-200 rounded text-stone-800 font-bold font-mono cursor-pointer"
                        title="Reduce 1"
                      >
                        -1
                      </button>
                      <button
                        onClick={() => adjustStock(p.id, 5)}
                        className="px-2 py-1 bg-emerald-950 text-white hover:bg-emerald-800 rounded font-bold font-mono cursor-pointer"
                        title="Add 5"
                      >
                        +5
                      </button>
                      <button
                        onClick={() => adjustStock(p.id, 20)}
                        className="px-2 py-1 bg-amber-600 text-white hover:bg-amber-700 rounded font-bold font-mono cursor-pointer"
                        title="Restock 20"
                      >
                        +20
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Order Management Tab */}
        {adminTab === 'orders' && (
          <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={orderSearch}
                  onChange={e => setOrderSearch(e.target.value)}
                  placeholder="Search by PK- order # or customer phone..."
                  className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-stone-500 font-semibold">Filter Status:</span>
                <select
                  value={orderStatusFilter}
                  onChange={e => setOrderStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs cursor-pointer"
                >
                  <option value="all">All Orders ({orders.length})</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Processing">Processing</option>
                  <option value="Packed">Packed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-stone-50 text-stone-600 uppercase text-[10px]">
                  <tr>
                    <th className="py-3 px-3">Order #</th>
                    <th className="py-3 px-3">Customer & Phone</th>
                    <th className="py-3 px-3">Destination City</th>
                    <th className="py-3 px-3">Courier Consignment</th>
                    <th className="py-3 px-3">Payment</th>
                    <th className="py-3 px-3">Amount (PKR)</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredOrders.map(ord => (
                    <tr key={ord.id} className="hover:bg-stone-50/50">
                      <td className="py-3 px-3 font-mono font-bold text-stone-900">{ord.id}</td>
                      <td className="py-3 px-3">
                        <span className="font-semibold text-stone-900 block">{ord.customerName}</span>
                        <span className="text-stone-500 font-mono text-[11px]">{ord.customerPhone}</span>
                      </td>
                      <td className="py-3 px-3 text-stone-700 font-medium">{ord.shippingAddress.city}</td>
                      <td className="py-3 px-3">
                        <span className="font-bold text-emerald-950 block">{ord.courierName || 'TCS'}</span>
                        <span className="font-mono text-[10px] text-stone-400">{ord.trackingNumber}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-semibold">{ord.paymentMethod}</span>
                        <span className="block text-[10px] text-stone-400 font-mono">{ord.paymentStatus}</span>
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-stone-900">
                        Rs. {ord.total.toLocaleString()}
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-900">
                          {ord.orderStatus}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setSelectedOrderForStatus(ord.id);
                              setNewStatusValue(ord.orderStatus);
                              setNewCourierName(ord.courierName || 'TCS Pakistan');
                              setNewTrackingNum(ord.trackingNumber || '');
                            }}
                            className="px-2.5 py-1 bg-emerald-950 text-white rounded text-[11px] font-semibold hover:bg-emerald-900 cursor-pointer"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => setPrintableOrder(ord)}
                            className="p-1 text-stone-500 hover:text-stone-900 cursor-pointer"
                            title="Invoice"
                          >
                            <FileText className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. Returns Tab */}
        {adminTab === 'returns' && (
          <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-4 shadow-xs">
            <h3 className="font-display text-sm font-bold text-stone-900 pb-2 border-b border-stone-100">
              Customer 7-Day Returns & Exchanges ({returnRequests.length})
            </h3>

            {returnRequests.length === 0 ? (
              <p className="text-xs text-stone-500 py-6 text-center">No active return claims.</p>
            ) : (
              <div className="divide-y divide-stone-100 text-xs">
                {returnRequests.map(ret => (
                  <div key={ret.id} className="py-3 flex items-center justify-between">
                    <div>
                      <span className="font-mono font-bold text-stone-900">#{ret.id}</span>
                      <p className="font-semibold text-stone-800">{ret.productName}</p>
                      <p className="text-stone-500">Order: {ret.orderId} · {ret.customerName} ({ret.customerPhone})</p>
                      <p className="text-stone-600 mt-1">Reason: <strong className="text-rose-700">{ret.reason}</strong> — "{ret.details}"</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                        {ret.status}
                      </span>
                      <button
                        onClick={() => updateReturnStatus(ret.id, 'Approved')}
                        className="px-2.5 py-1 bg-emerald-800 text-white rounded text-[11px] cursor-pointer"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateReturnStatus(ret.id, 'Rejected')}
                        className="px-2.5 py-1 bg-stone-200 text-stone-800 rounded text-[11px] cursor-pointer"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 6. Coupons Tab */}
        {adminTab === 'coupons' && (
          <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-display text-sm font-bold text-stone-900">
                Discount Coupons & Promo Vouchers
              </h3>
              <button
                onClick={() => setShowAddCouponModal(true)}
                className="px-3.5 py-1.5 bg-emerald-950 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-emerald-900 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Coupon</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {coupons.map(cpn => (
                <div key={cpn.code} className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-sm text-stone-900 bg-white px-2 py-0.5 rounded border border-stone-300">
                      {cpn.code}
                    </span>
                    <button
                      onClick={() => toggleCoupon(cpn.code)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                        cpn.isActive ? 'bg-emerald-100 text-emerald-900' : 'bg-stone-200 text-stone-600'
                      }`}
                    >
                      {cpn.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </div>
                  <p className="font-semibold text-stone-800">
                    {cpn.value}{cpn.type === 'percent' ? '% OFF' : ' PKR Flat Discount'}
                  </p>
                  <p className="text-stone-500 text-[11px]">{cpn.description}</p>
                  <p className="text-stone-400 font-mono text-[10px]">
                    Min Order: Rs. {cpn.minOrderAmount.toLocaleString()} · Used: {cpn.usageCount} times
                  </p>
                  <div className="pt-2 border-t border-stone-200/60 flex justify-end">
                    <button
                      onClick={() => deleteCoupon(cpn.code)}
                      className="text-stone-400 hover:text-rose-600 p-1 cursor-pointer"
                      title="Delete coupon"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. Shipping Rates Tab */}
        {adminTab === 'shipping' && (
          <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-4 shadow-xs">
            <div className="pb-3 border-b border-stone-100">
              <h3 className="font-display text-sm font-bold text-stone-900">
                City Delivery Rates & Courier Dispatch (Pakistan)
              </h3>
              <p className="text-xs text-stone-500">
                Rates automatically calculate for customer cart checkout based on selected city. Free shipping threshold: Rs. {settings.freeShippingThreshold.toLocaleString()}.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              {shippingRates.map(s => (
                <div key={s.city} className="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-stone-900">{s.city}</span>
                    <span className="text-[11px] text-stone-500 block">{s.province} · {s.estimatedDays}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-mono font-bold text-stone-800">Rs. {s.rate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. Store Settings Tab */}
        {adminTab === 'settings' && (
          <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-6 shadow-xs max-w-2xl text-xs">
            <h3 className="font-display text-base font-bold text-stone-900 pb-2 border-b border-stone-100">
              General Store & Financial Settings
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Store Name</label>
                <input
                  type="text"
                  value={settings.storeName}
                  onChange={e => updateSettings({ storeName: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">WhatsApp Helpline</label>
                  <input
                    type="text"
                    value={settings.whatsappNumber}
                    onChange={e => updateSettings({ whatsappNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">FBR NTN Number</label>
                  <input
                    type="text"
                    value={settings.ntnNumber}
                    onChange={e => updateSettings({ ntnNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Free Shipping Threshold (PKR)</label>
                <input
                  type="number"
                  value={settings.freeShippingThreshold}
                  onChange={e => updateSettings({ freeShippingThreshold: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded font-mono"
                />
              </div>

              <div className="pt-3 border-t border-stone-200 space-y-2">
                <span className="font-bold block text-stone-800">Enabled Pakistani Payment Methods</span>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.allowCOD}
                    onChange={e => updateSettings({ allowCOD: e.target.checked })}
                  />
                  <span>Cash on Delivery (COD)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.allowEasypaisa}
                    onChange={e => updateSettings({ allowEasypaisa: e.target.checked })}
                  />
                  <span>Easypaisa Mobile Wallet</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.allowJazzCash}
                    onChange={e => updateSettings({ allowJazzCash: e.target.checked })}
                  />
                  <span>JazzCash Mobile Account</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.allowBankTransfer}
                    onChange={e => updateSettings({ allowBankTransfer: e.target.checked })}
                  />
                  <span>Direct Bank IBFT (Meezan Bank)</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 border border-stone-200 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-stone-200">
              <h3 className="font-display font-bold text-stone-900">
                {editingProduct ? 'Edit Product' : 'Add New Artisan Product'}
              </h3>
              <button
                onClick={() => setShowAddProductModal(false)}
                className="text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Product Title *</label>
                <input
                  type="text"
                  value={newProdName}
                  onChange={e => setNewProdName(e.target.value)}
                  placeholder="e.g. Peshawari Norozi Double Sole Chappal"
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Brand / Atelier</label>
                  <input
                    type="text"
                    value={newProdBrand}
                    onChange={e => setNewProdBrand(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Category</label>
                  <select
                    value={newProdCategory}
                    onChange={e => setNewProdCategory(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Price (PKR)</label>
                  <input
                    type="number"
                    value={newProdPrice}
                    onChange={e => setNewProdPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Original Price</label>
                  <input
                    type="number"
                    value={newProdOrigPrice}
                    onChange={e => setNewProdOrigPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Stock</label>
                  <input
                    type="number"
                    value={newProdStock}
                    onChange={e => setNewProdStock(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Craft Origin City</label>
                  <input
                    type="text"
                    value={newProdCity}
                    onChange={e => setNewProdCity(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Product Image Path / URL</label>
                  <input
                    type="text"
                    value={newProdImage}
                    onChange={e => setNewProdImage(e.target.value)}
                    className="w-full px-3 py-2 border rounded font-mono text-[11px]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Short Summary</label>
                <input
                  type="text"
                  value={newProdShortDesc}
                  onChange={e => setNewProdShortDesc(e.target.value)}
                  placeholder="One sentence description for product cards"
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Detailed Description</label>
                <textarea
                  rows={3}
                  value={newProdDesc}
                  onChange={e => setNewProdDesc(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2 border rounded text-stone-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-950 text-white font-bold rounded hover:bg-emerald-900"
                >
                  {editingProduct ? 'Save Updates' : 'Publish Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Status Update Modal */}
      {selectedOrderForStatus && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 border border-stone-200 space-y-4 text-xs">
            <div className="flex justify-between items-center pb-2 border-b">
              <h3 className="font-bold text-stone-900">
                Update Order: {selectedOrderForStatus}
              </h3>
              <button
                onClick={() => setSelectedOrderForStatus(null)}
                className="text-stone-400 hover:text-stone-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleOrderStatusSave} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Order Status</label>
                <select
                  value={newStatusValue}
                  onChange={e => setNewStatusValue(e.target.value as OrderStatus)}
                  className="w-full px-3 py-2 border rounded font-semibold"
                >
                  <option value="Confirmed">Confirmed</option>
                  <option value="Processing">Processing</option>
                  <option value="Packed">Packed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Courier Partner</label>
                <select
                  value={newCourierName}
                  onChange={e => setNewCourierName(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="TCS Pakistan">TCS Pakistan</option>
                  <option value="Trax Logistics">Trax Logistics</option>
                  <option value="Leopards Courier">Leopards Courier</option>
                  <option value="Call Courier">Call Courier</option>
                  <option value="M&P Express">M&P Express</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Courier Tracking Consignment #</label>
                <input
                  type="text"
                  value={newTrackingNum}
                  onChange={e => setNewTrackingNum(e.target.value)}
                  placeholder="e.g. TCS-9821740192"
                  className="w-full px-3 py-2 border rounded font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Status Note for Customer Timeline</label>
                <input
                  type="text"
                  value={statusNote}
                  onChange={e => setStatusNote(e.target.value)}
                  placeholder="e.g. Handed to TCS rider for Faisalabad express route"
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedOrderForStatus(null)}
                  className="px-3 py-1.5 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-950 text-white font-bold rounded"
                >
                  Save Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Coupon Modal */}
      {showAddCouponModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 border space-y-3 text-xs">
            <h3 className="font-bold text-stone-900">Create Discount Voucher</h3>
            <form onSubmit={handleCreateCoupon} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Code</label>
                <input
                  type="text"
                  value={newCouponCode}
                  onChange={e => setNewCouponCode(e.target.value)}
                  placeholder="e.g. EID20"
                  className="w-full px-3 py-2 border rounded font-mono uppercase"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Type</label>
                  <select
                    value={newCouponType}
                    onChange={e => setNewCouponType(e.target.value as any)}
                    className="w-full px-2 py-2 border rounded"
                  >
                    <option value="percent">% Percent</option>
                    <option value="fixed">Fixed PKR</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Value</label>
                  <input
                    type="number"
                    value={newCouponValue}
                    onChange={e => setNewCouponValue(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded font-mono"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Min Order Amount (PKR)</label>
                <input
                  type="number"
                  value={newCouponMin}
                  onChange={e => setNewCouponMin(Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded font-mono"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddCouponModal(false)}
                  className="px-3 py-1.5 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-950 text-white font-bold rounded"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 border space-y-3 text-xs">
            <h3 className="font-bold text-stone-900">Add Category</h3>
            <form onSubmit={handleCreateCategory} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Category Name</label>
                <input
                  type="text"
                  value={newCatName}
                  onChange={e => setNewCatName(e.target.value)}
                  placeholder="e.g. Multani Blue Pottery"
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Description</label>
                <input
                  type="text"
                  value={newCatDesc}
                  onChange={e => setNewCatDesc(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddCategoryModal(false)}
                  className="px-3 py-1.5 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-950 text-white font-bold rounded"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
