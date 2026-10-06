import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Category,
  CartItem,
  Order,
  OrderStatus,
  Coupon,
  ShippingCityRate,
  StoreSettings,
  User,
  ReturnRequest,
  ProductReview,
  Address
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_ORDERS,
  INITIAL_COUPONS,
  PAKISTANI_CITIES,
  INITIAL_STORE_SETTINGS,
  INITIAL_REVIEWS
} from '../data/mockData';

interface NotificationItem {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface StoreContextType {
  // Navigation & UI States
  activeView: 'home' | 'catalog' | 'account' | 'admin';
  setActiveView: (view: 'home' | 'catalog' | 'account' | 'admin') => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  trackingOrderId: string | null;
  setTrackingOrderId: (id: string | null) => void;
  printableOrder: Order | null;
  setPrintableOrder: (order: Order | null) => void;
  staticPageKey: string | null;
  setStaticPageKey: (key: string | null) => void;
  notifications: NotificationItem[];
  addNotification: (type: 'success' | 'error' | 'info', message: string) => void;
  removeNotification: (id: string) => void;

  // Search & Catalog Filter State
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (cat: string) => void;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  duplicateProduct: (id: string) => void;
  adjustStock: (productId: string, delta: number, variantId?: string) => void;

  // Categories
  categories: Category[];
  addCategory: (cat: Category) => void;
  updateCategory: (id: string, cat: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, variantId?: string, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number, variantId?: string) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  clearCart: () => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  grandTotal: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  moveToCartFromWishlist: (productId: string) => void;

  // Auth & User
  currentUser: User | null;
  login: (emailOrPhone: string, password?: string) => boolean;
  loginAsAdmin: () => void;
  register: (name: string, email: string, phone: string, password?: string) => boolean;
  logout: () => void;
  updateUserProfile: (data: Partial<User>) => void;
  addSavedAddress: (address: Omit<Address, 'id'>) => void;
  deleteSavedAddress: (addressId: string) => void;

  // Orders
  orders: Order[];
  placeOrder: (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    address: {
      province: string;
      city: string;
      area: string;
      addressLine: string;
      postalCode?: string;
      deliveryInstructions?: string;
    };
    paymentMethod: Order['paymentMethod'];
  }) => Promise<Order>;
  updateOrderStatus: (
    orderId: string,
    newStatus: OrderStatus,
    courierName?: string,
    trackingNumber?: string,
    note?: string
  ) => void;
  cancelOrder: (orderId: string, reason?: string) => void;

  // Returns
  returnRequests: ReturnRequest[];
  submitReturnRequest: (orderId: string, productId: string, productName: string, reason: string, details: string) => void;
  updateReturnStatus: (id: string, status: ReturnRequest['status']) => void;

  // Reviews
  reviews: ProductReview[];
  addReview: (productId: string, rating: number, comment: string, userName?: string, city?: string) => void;

  // Coupons
  coupons: Coupon[];
  addCoupon: (coupon: Coupon) => void;
  deleteCoupon: (code: string) => void;
  toggleCoupon: (code: string) => void;

  // Shipping & Cities
  shippingRates: ShippingCityRate[];
  updateShippingRate: (city: string, rate: number, estimatedDays: string) => void;

  // Store Settings
  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & Views
  const [activeView, setActiveView] = useState<'home' | 'catalog' | 'account' | 'admin'>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState<string | null>(null);
  const [printableOrder, setPrintableOrder] = useState<Order | null>(null);
  const [staticPageKey, setStaticPageKey] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // Search & Catalog Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('');

  // Persistent States with LocalStorage
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('kb_products');
    if (saved) {
      try {
        const parsed: Product[] = JSON.parse(saved);
        // Ensure new ladies collection products are included if not present
        const hasLadies = parsed.some(p => p.id === 'prod-w01');
        if (!hasLadies) {
          const merged = [...INITIAL_PRODUCTS.filter(ip => ip.id.startsWith('prod-w')), ...parsed];
          return merged;
        }
        return parsed;
      } catch {
        return INITIAL_PRODUCTS;
      }
    }
    return INITIAL_PRODUCTS;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('kb_categories');
    if (saved) {
      try {
        const parsed: Category[] = JSON.parse(saved);
        const hasLadiesCat = parsed.some(c => c.id === 'cat-ladies-lawn');
        if (!hasLadiesCat) {
          return INITIAL_CATEGORIES;
        }
        return parsed;
      } catch {
        return INITIAL_CATEGORIES;
      }
    }
    return INITIAL_CATEGORIES;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('kb_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    const saved = localStorage.getItem('kb_applied_coupon');
    return saved ? JSON.parse(saved) : null;
  });

  const [selectedCity, setSelectedCity] = useState<string>('Lahore');

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('kb_wishlist');
    return saved ? JSON.parse(saved) : ['prod-001'];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('kb_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [reviews, setReviews] = useState<ProductReview[]>(() => {
    const saved = localStorage.getItem('kb_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('kb_coupons');
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  const [shippingRates, setShippingRates] = useState<ShippingCityRate[]>(() => {
    const saved = localStorage.getItem('kb_shipping_rates');
    return saved ? JSON.parse(saved) : PAKISTANI_CITIES;
  });

  const [settings, setSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem('kb_settings');
    return saved ? JSON.parse(saved) : INITIAL_STORE_SETTINGS;
  });

  const [returnRequests, setReturnRequests] = useState<ReturnRequest[]>(() => {
    const saved = localStorage.getItem('kb_returns');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('kb_current_user');
    if (saved) return JSON.parse(saved);
    // Pre-populate with a demo Pakistani customer account
    return {
      id: 'usr-customer-01',
      name: 'Muhammad Hamza',
      email: 'hamza.lahore@example.com',
      phone: '03008459123',
      role: 'customer',
      createdAt: '2026-08-15',
      savedAddresses: [
        {
          id: 'addr-01',
          title: 'Home (DHA)',
          recipientName: 'Muhammad Hamza',
          phone: '03008459123',
          province: 'Punjab',
          city: 'Lahore',
          area: 'DHA Phase 5, Sector C',
          addressLine: 'House 142-B, Street 7',
          postalCode: '54792',
          isDefault: true
        }
      ]
    };
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('kb_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('kb_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('kb_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('kb_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('kb_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('kb_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('kb_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('kb_shipping_rates', JSON.stringify(shippingRates));
  }, [shippingRates]);

  useEffect(() => {
    localStorage.setItem('kb_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('kb_returns', JSON.stringify(returnRequests));
  }, [returnRequests]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('kb_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('kb_current_user');
    }
  }, [currentUser]);

  // Notifications
  const addNotification = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 4);
    setNotifications(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4500);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Cart Computations
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  let discountAmount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrderAmount) {
    if (appliedCoupon.type === 'percent') {
      discountAmount = Math.round((subtotal * appliedCoupon.value) / 100);
      if (appliedCoupon.maxDiscount && discountAmount > appliedCoupon.maxDiscount) {
        discountAmount = appliedCoupon.maxDiscount;
      }
    } else {
      discountAmount = appliedCoupon.value;
    }
  }

  // Pakistani city shipping fee calculation
  const matchedCity = shippingRates.find(c => c.city.toLowerCase() === selectedCity.toLowerCase());
  const cityBaseRate = matchedCity ? matchedCity.rate : settings.defaultShippingRate;
  const shippingFee = subtotal >= settings.freeShippingThreshold || subtotal === 0 ? 0 : cityBaseRate;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  // Cart Operations
  const addToCart = (product: Product, variantId?: string, quantity = 1) => {
    if (product.stock <= 0) {
      addNotification('error', `Sorry, ${product.name} is currently out of stock.`);
      return;
    }

    let itemPrice = product.price;
    let variantName: string | undefined;

    if (variantId && product.variants) {
      const v = product.variants.find(va => va.id === variantId);
      if (v) {
        variantName = v.name;
        if (v.priceDelta) {
          itemPrice += v.priceDelta;
        }
        if (v.stock < quantity) {
          addNotification('error', `Only ${v.stock} units available for ${v.name}`);
          return;
        }
      }
    }

    setCart(prev => {
      const existingIndex = prev.findIndex(
        i => i.productId === product.id && i.variantId === variantId
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex].quantity = newQty;
        return updated;
      } else {
        return [
          ...prev,
          {
            productId: product.id,
            product,
            variantId,
            variantName,
            price: itemPrice,
            quantity
          }
        ];
      }
    });

    addNotification('success', `Added "${product.name}" to cart.`);
    setIsCartOpen(true);
  };

  const updateCartQuantity = (productId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    setCart(prev =>
      prev.map(item => {
        if (item.productId === productId && item.variantId === variantId) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId: string, variantId?: string) => {
    setCart(prev =>
      prev.filter(item => !(item.productId === productId && item.variantId === variantId))
    );
    addNotification('info', 'Item removed from your cart.');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    localStorage.removeItem('kb_applied_coupon');
  };

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    const found = coupons.find(c => c.code.toUpperCase() === clean);

    if (!found) {
      return { success: false, message: 'Invalid coupon code.' };
    }
    if (!found.isActive) {
      return { success: false, message: 'This coupon is no longer active.' };
    }
    if (subtotal < found.minOrderAmount) {
      return {
        success: false,
        message: `Minimum order value for ${found.code} is Rs. ${found.minOrderAmount.toLocaleString()}`
      };
    }

    setAppliedCoupon(found);
    localStorage.setItem('kb_applied_coupon', JSON.stringify(found));
    addNotification('success', `Coupon "${found.code}" applied! You saved.`);
    return { success: true, message: `Coupon ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    localStorage.removeItem('kb_applied_coupon');
    addNotification('info', 'Coupon removed.');
  };

  // Wishlist Operations
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        addNotification('info', 'Removed from your wishlist.');
        return prev.filter(id => id !== productId);
      } else {
        addNotification('success', 'Saved to your wishlist.');
        return [...prev, productId];
      }
    });
  };

  const moveToCartFromWishlist = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    addToCart(product, undefined, 1);
    setWishlist(prev => prev.filter(id => id !== productId));
  };

  // Authentication
  const login = (emailOrPhone: string, _password?: string) => {
    const emailClean = emailOrPhone.trim().toLowerCase();
    if (emailClean.includes('admin')) {
      loginAsAdmin();
      return true;
    }

    const newUser: User = {
      id: 'usr-' + Date.now().toString().slice(-6),
      name: emailOrPhone.includes('@') ? emailOrPhone.split('@')[0] : 'Customer ' + emailOrPhone.slice(-4),
      email: emailOrPhone.includes('@') ? emailClean : `${emailClean}@customer.pk`,
      phone: emailOrPhone.includes('@') ? '03001234567' : emailOrPhone,
      role: 'customer',
      createdAt: new Date().toISOString().split('T')[0],
      savedAddresses: [
        {
          id: 'addr-' + Date.now(),
          title: 'Primary Address',
          recipientName: 'Valued Customer',
          phone: emailOrPhone,
          province: 'Punjab',
          city: 'Lahore',
          area: 'Gulberg III',
          addressLine: 'Main Boulevard, House 24',
          postalCode: '54000',
          isDefault: true
        }
      ]
    };
    setCurrentUser(newUser);
    addNotification('success', `Welcome back, ${newUser.name}!`);
    return true;
  };

  const loginAsAdmin = () => {
    const adminUser: User = {
      id: 'usr-admin-01',
      name: 'Store Administrator',
      email: 'admin@khaasbazaar.pk',
      phone: '03008492021',
      role: 'admin',
      createdAt: '2026-01-01',
      savedAddresses: []
    };
    setCurrentUser(adminUser);
    setActiveView('admin');
    addNotification('success', 'Logged in as Administrator with full store access.');
  };

  const register = (name: string, email: string, phone: string, _password?: string) => {
    const newUser: User = {
      id: 'usr-' + Date.now().toString().slice(-6),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      role: 'customer',
      createdAt: new Date().toISOString().split('T')[0],
      savedAddresses: []
    };
    setCurrentUser(newUser);
    addNotification('success', `Welcome to KhaasBazaar, ${name}! Your account is active.`);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setActiveView('home');
    addNotification('info', 'You have been logged out.');
  };

  const updateUserProfile = (data: Partial<User>) => {
    if (!currentUser) return;
    setCurrentUser({ ...currentUser, ...data });
    addNotification('success', 'Profile updated successfully.');
  };

  const addSavedAddress = (address: Omit<Address, 'id'>) => {
    if (!currentUser) return;
    const newAddr: Address = {
      ...address,
      id: 'addr-' + Date.now()
    };
    const updated = [...currentUser.savedAddresses, newAddr];
    setCurrentUser({ ...currentUser, savedAddresses: updated });
    addNotification('success', 'New delivery address saved.');
  };

  const deleteSavedAddress = (addressId: string) => {
    if (!currentUser) return;
    const updated = currentUser.savedAddresses.filter(a => a.id !== addressId);
    setCurrentUser({ ...currentUser, savedAddresses: updated });
    addNotification('info', 'Address removed.');
  };

  // Orders
  const placeOrder = async (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    address: {
      province: string;
      city: string;
      area: string;
      addressLine: string;
      postalCode?: string;
      deliveryInstructions?: string;
    };
    paymentMethod: Order['paymentMethod'];
  }): Promise<Order> => {
    // Generate realistic Pakistani Order ID (e.g. PK-2026-004815)
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const orderId = `PK-2026-${randomSuffix}`;

    const orderItems = cart.map(item => ({
      productId: item.productId,
      productName: item.product.name,
      variantName: item.variantName,
      image: item.product.images[0] || '',
      price: item.price,
      quantity: item.quantity,
      subtotal: item.price * item.quantity
    }));

    const matchedCityRate = shippingRates.find(
      c => c.city.toLowerCase() === orderData.address.city.toLowerCase()
    );
    const courier = matchedCityRate && matchedCityRate.province === 'Punjab' ? 'TCS Pakistan' : 'Trax Logistics';
    const trackingNum = `${courier.slice(0, 3).toUpperCase()}-${Math.floor(1000000000 + Math.random() * 9000000000)}`;

    const deliveryDays = matchedCityRate ? matchedCityRate.estimatedDays : '2-3 Days';

    const newOrder: Order = {
      id: orderId,
      userId: currentUser?.id,
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone,
      shippingAddress: orderData.address,
      items: orderItems,
      subtotal,
      discount: discountAmount,
      shippingFee,
      total: grandTotal,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: orderData.paymentMethod === 'COD' ? 'Pending' : 'Paid',
      orderStatus: 'Confirmed',
      createdAt: new Date().toISOString(),
      courierName: courier,
      trackingNumber: trackingNum,
      estimatedDelivery: deliveryDays,
      timeline: [
        {
          status: 'Confirmed',
          timestamp: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
          location: `${orderData.address.city} Distribution Hub`,
          note: `Order received and confirmed via ${orderData.paymentMethod}.`
        }
      ]
    };

    // Decrease Inventory Automatically!
    setProducts(prevProducts =>
      prevProducts.map(prod => {
        const orderedItem = cart.find(ci => ci.productId === prod.id);
        if (!orderedItem) return prod;

        let updatedStock = Math.max(0, prod.stock - orderedItem.quantity);
        let updatedVariants = prod.variants;

        if (orderedItem.variantId && prod.variants) {
          updatedVariants = prod.variants.map(v => {
            if (v.id === orderedItem.variantId) {
              return { ...v, stock: Math.max(0, v.stock - orderedItem.quantity) };
            }
            return v;
          });
        }

        return {
          ...prod,
          stock: updatedStock,
          variants: updatedVariants
        };
      })
    );

    // Increment coupon usage count if used
    if (appliedCoupon) {
      setCoupons(prev =>
        prev.map(c => (c.code === appliedCoupon.code ? { ...c, usageCount: c.usageCount + 1 } : c))
      );
    }

    // Save order
    setOrders(prev => [newOrder, ...prev]);

    // Clear cart
    clearCart();

    addNotification(
      'success',
      `Order ${orderId} placed successfully! Tracking number generated.`
    );

    return newOrder;
  };

  const updateOrderStatus = (
    orderId: string,
    newStatus: OrderStatus,
    courierName?: string,
    trackingNumber?: string,
    note?: string
  ) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== orderId) return ord;

        const updatedTimeline = [
          ...ord.timeline,
          {
            status: newStatus,
            timestamp: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
            location: `${ord.shippingAddress.city} Depot`,
            note: note || `Order updated to ${newStatus}.`
          }
        ];

        // Restore stock if cancelled or returned
        if ((newStatus === 'Cancelled' || newStatus === 'Returned') && ord.orderStatus !== 'Cancelled' && ord.orderStatus !== 'Returned') {
          ord.items.forEach(item => {
            adjustStock(item.productId, item.quantity);
          });
        }

        return {
          ...ord,
          orderStatus: newStatus,
          courierName: courierName || ord.courierName,
          trackingNumber: trackingNumber || ord.trackingNumber,
          paymentStatus: newStatus === 'Delivered' && ord.paymentMethod === 'COD' ? 'Paid' : ord.paymentStatus,
          timeline: updatedTimeline
        };
      })
    );

    addNotification('success', `Order ${orderId} updated to ${newStatus}.`);
  };

  const cancelOrder = (orderId: string, reason = 'Cancelled by customer') => {
    updateOrderStatus(orderId, 'Cancelled', undefined, undefined, reason);
  };

  // Stock Adjustment
  const adjustStock = (productId: string, delta: number, variantId?: string) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id !== productId) return p;
        const newStock = Math.max(0, p.stock + delta);
        let updatedVariants = p.variants;
        if (variantId && p.variants) {
          updatedVariants = p.variants.map(v =>
            v.id === variantId ? { ...v, stock: Math.max(0, v.stock + delta) } : v
          );
        }
        return { ...p, stock: newStock, variants: updatedVariants };
      })
    );
  };

  // Product CRUD
  const addProduct = (prodData: Omit<Product, 'id'>) => {
    const newId = 'prod-' + Date.now().toString().slice(-6);
    const newProduct: Product = {
      ...prodData,
      id: newId
    };
    setProducts(prev => [newProduct, ...prev]);
    addNotification('success', `Product "${newProduct.name}" created successfully.`);
  };

  const updateProduct = (id: string, partial: Partial<Product>) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...partial } : p)));
    addNotification('success', 'Product updated successfully.');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    addNotification('info', 'Product removed from store catalogue.');
  };

  const duplicateProduct = (id: string) => {
    const source = products.find(p => p.id === id);
    if (!source) return;
    const duplicated: Product = {
      ...source,
      id: 'prod-' + Date.now().toString().slice(-6),
      name: `${source.name} (Copy)`,
      sku: `${source.sku}-CPY`,
      stock: 10
    };
    setProducts(prev => [duplicated, ...prev]);
    addNotification('success', `Duplicated "${source.name}".`);
  };

  // Category CRUD
  const addCategory = (cat: Category) => {
    setCategories(prev => [...prev, cat]);
    addNotification('success', `Category "${cat.name}" added.`);
  };

  const updateCategory = (id: string, partial: Partial<Category>) => {
    setCategories(prev => prev.map(c => (c.id === id ? { ...c, ...partial } : c)));
    addNotification('success', 'Category updated.');
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    addNotification('info', 'Category deleted.');
  };

  // Return Requests
  const submitReturnRequest = (
    orderId: string,
    productId: string,
    productName: string,
    reason: string,
    details: string
  ) => {
    const req: ReturnRequest = {
      id: 'ret-' + Date.now().toString().slice(-6),
      orderId,
      productId,
      productName,
      customerName: currentUser?.name || 'Customer',
      customerPhone: currentUser?.phone || '03001234567',
      reason,
      details,
      status: 'Pending',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setReturnRequests(prev => [req, ...prev]);
    addNotification(
      'success',
      'Return request submitted. Our Pakistani support team will contact you within 24 hours.'
    );
  };

  const updateReturnStatus = (id: string, status: ReturnRequest['status']) => {
    setReturnRequests(prev => prev.map(r => (r.id === id ? { ...r, status } : r)));
    addNotification('success', `Return request updated to ${status}.`);
  };

  // Product Reviews
  const addReview = (
    productId: string,
    rating: number,
    comment: string,
    userName = currentUser?.name || 'Verified Buyer',
    city = 'Lahore'
  ) => {
    const newRev: ProductReview = {
      id: 'rev-' + Date.now().toString().slice(-6),
      productId,
      userName,
      city,
      rating,
      date: new Date().toISOString().split('T')[0],
      comment,
      verifiedPurchase: true
    };
    setReviews(prev => [newRev, ...prev]);

    // Recalculate average rating on product
    setProducts(prev =>
      prev.map(p => {
        if (p.id !== productId) return p;
        const allProds = [...reviews.filter(r => r.productId === productId), newRev];
        const avg = allProds.reduce((sum, r) => sum + r.rating, 0) / allProds.length;
        return {
          ...p,
          rating: Number(avg.toFixed(1)),
          reviewCount: allProds.length
        };
      })
    );

    addNotification('success', 'Thank you! Your verified review has been published.');
  };

  // Coupons
  const addCoupon = (coupon: Coupon) => {
    setCoupons(prev => [...prev, coupon]);
    addNotification('success', `Coupon ${coupon.code} created.`);
  };

  const deleteCoupon = (code: string) => {
    setCoupons(prev => prev.filter(c => c.code !== code));
    addNotification('info', `Coupon ${code} removed.`);
  };

  const toggleCoupon = (code: string) => {
    setCoupons(prev =>
      prev.map(c => (c.code === code ? { ...c, isActive: !c.isActive } : c))
    );
  };

  // Shipping
  const updateShippingRate = (city: string, rate: number, estimatedDays: string) => {
    setShippingRates(prev =>
      prev.map(s => (s.city === city ? { ...s, rate, estimatedDays } : s))
    );
    addNotification('success', `Shipping updated for ${city}: Rs. ${rate}.`);
  };

  // Settings
  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    addNotification('success', 'Store configuration updated.');
  };

  return (
    <StoreContext.Provider
      value={{
        activeView,
        setActiveView,
        selectedProductId,
        setSelectedProductId,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        trackingOrderId,
        setTrackingOrderId,
        printableOrder,
        setPrintableOrder,
        staticPageKey,
        setStaticPageKey,
        notifications,
        addNotification,
        removeNotification,

        searchQuery,
        setSearchQuery,
        selectedCategoryFilter,
        setSelectedCategoryFilter,

        products,
        addProduct,
        updateProduct,
        deleteProduct,
        duplicateProduct,
        adjustStock,

        categories,
        addCategory,
        updateCategory,
        deleteCategory,

        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        selectedCity,
        setSelectedCity,
        subtotal,
        discountAmount,
        shippingFee,
        grandTotal,

        wishlist,
        toggleWishlist,
        moveToCartFromWishlist,

        currentUser,
        login,
        loginAsAdmin,
        register,
        logout,
        updateUserProfile,
        addSavedAddress,
        deleteSavedAddress,

        orders,
        placeOrder,
        updateOrderStatus,
        cancelOrder,

        returnRequests,
        submitReturnRequest,
        updateReturnStatus,

        reviews,
        addReview,

        coupons,
        addCoupon,
        deleteCoupon,
        toggleCoupon,

        shippingRates,
        updateShippingRate,

        settings,
        updateSettings
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
