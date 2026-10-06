export type UserRole = 'customer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  createdAt: string;
  savedAddresses: Address[];
}

export interface Address {
  id: string;
  title: string; // e.g. "Home", "Office"
  recipientName: string;
  phone: string;
  province: string;
  city: string;
  area: string;
  addressLine: string;
  postalCode?: string;
  isDefault?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
  featured?: boolean;
}

export interface ProductVariant {
  id: string;
  name: string; // e.g. "Size 9 / Camel Tan" or "Large / Indigo"
  size?: string;
  color?: string;
  priceDelta?: number; // adjustment from base price
  stock: number;
  sku: string;
}

export interface ProductReview {
  id: string;
  productId: string;
  userName: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  subcategory?: string;
  price: number; // in PKR
  originalPrice?: number; // for discount strike-through
  stock: number;
  lowStockThreshold: number;
  description: string;
  shortDescription: string;
  images: string[];
  variants?: ProductVariant[];
  tags: string[];
  specs: Record<string, string>;
  features: string[];
  originCity: string; // e.g. "Lahore", "Peshawar", "Sialkot", "Multan", "Karachi"
  shippingDays: string; // e.g. "2-3 Business Days"
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isFlashSale?: boolean;
  status: 'active' | 'draft' | 'archived';
  returnPolicy: string;
  warranty: string;
}

export interface CartItem {
  productId: string;
  product: Product;
  variantId?: string;
  variantName?: string;
  price: number;
  quantity: number;
}

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Processing'
  | 'Packed'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled'
  | 'Returned';

export type PaymentMethod =
  | 'COD' // Cash on Delivery
  | 'JazzCash'
  | 'Easypaisa'
  | 'BankTransfer'
  | 'Card';

export interface OrderTimelineEvent {
  status: OrderStatus;
  timestamp: string;
  location: string;
  note: string;
}

export interface Order {
  id: string; // e.g. PK-2026-004123
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    province: string;
    city: string;
    area: string;
    addressLine: string;
    postalCode?: string;
    deliveryInstructions?: string;
  };
  items: {
    productId: string;
    productName: string;
    variantName?: string;
    image: string;
    price: number;
    quantity: number;
    subtotal: number;
  }[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Pending' | 'Paid' | 'Refunded';
  orderStatus: OrderStatus;
  createdAt: string;
  courierName?: string; // TCS, Trax, Leopards, M&P
  trackingNumber?: string;
  estimatedDelivery: string;
  timeline: OrderTimelineEvent[];
}

export interface Coupon {
  code: string;
  type: 'percent' | 'fixed';
  value: number; // percentage (e.g. 15) or PKR (e.g. 500)
  minOrderAmount: number;
  maxDiscount?: number;
  expiryDate: string;
  usageCount: number;
  isActive: boolean;
  description: string;
}

export interface ShippingCityRate {
  city: string;
  province: string;
  rate: number;
  estimatedDays: string;
}

export interface ReturnRequest {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  customerName: string;
  customerPhone: string;
  reason: string;
  details: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Refunded';
  createdAt: string;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  address: string;
  freeShippingThreshold: number;
  defaultShippingRate: number;
  taxRatePercent: number;
  ntnNumber: string;
  allowCOD: boolean;
  allowJazzCash: boolean;
  allowEasypaisa: boolean;
  allowBankTransfer: boolean;
  bankDetails: {
    bankName: string;
    accountTitle: string;
    accountNumber: string;
    iban: string;
    branch: string;
  };
}
