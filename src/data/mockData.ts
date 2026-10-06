import { Category, Product, Coupon, ShippingCityRate, StoreSettings, Order } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-ladies-lawn',
    name: "Women's Festive Pret & Lawn",
    slug: 'ladies-festive-lawn',
    description: 'Designer 3-piece luxury embroidered lawn, organza dupattas and festive party wear',
    image: '/src/assets/images/ladies_luxury_lawn_suit_1791271551579.jpg',
    itemCount: 14,
    featured: true
  },
  {
    id: 'cat-ladies-khussa',
    name: 'Handcrafted Bridal Khussas',
    slug: 'bridal-khussas',
    description: 'Genuine leather and royal velvet khussas with gold tilla, dabka and pearl work',
    image: '/src/assets/images/ladies_tilla_khussa_1791271563738.jpg',
    itemCount: 10,
    featured: true
  },
  {
    id: 'cat-ladies-jewelry',
    name: 'Artisan Kundan & Jhumkas',
    slug: 'kundan-jhumkas',
    description: '22K gold-plated handcrafted Kundan, Meenakari chandbalis and bridal jewelry',
    image: '/src/assets/images/ladies_kundan_jhumkas_1791271575827.jpg',
    itemCount: 8,
    featured: true
  },
  {
    id: 'cat-chappals',
    name: 'Footwear & Peshawari Chappals',
    slug: 'footwear-chappals',
    description: 'Master artisan crafted pure leather Peshawari, Kaptaan & Norozi chappals',
    image: '/src/assets/images/peshawari_chappal_1791270548402.jpg',
    itemCount: 8,
    featured: true
  },
  {
    id: 'cat-shawls',
    name: 'Handloom Shawls & Ajrak',
    slug: 'shawls-ajrak',
    description: 'Heritage Sindhi Ajrak, Pashmina wool and woven Kashmiri craft',
    image: '/src/assets/images/ajrak_shawl_1791270563789.jpg',
    itemCount: 6,
    featured: true
  },
  {
    id: 'cat-sports',
    name: 'Sialkot Sports & Willow',
    slug: 'sialkot-sports',
    description: 'Handcrafted Grade-1 English willow bats, leather balls and cricket gear',
    image: '/src/assets/images/sialkot_cricket_bat_1791270577720.jpg',
    itemCount: 5,
    featured: true
  },
  {
    id: 'cat-apparel',
    name: 'Eastern Apparel & Kurtas',
    slug: 'apparel-kurtas',
    description: 'Pure Egyptian cotton, Boski and raw silk designer stitched kurtas',
    image: '/src/assets/images/hero_banner_crafts_1791270531944.jpg',
    itemCount: 12,
    featured: true
  },
  {
    id: 'cat-dryfruits',
    name: 'Quetta Dry Fruits & Saffron',
    slug: 'quetta-dry-fruits',
    description: 'Fresh paper-shell almonds, walnuts, Chilgoza and pure organic saffron',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
    itemCount: 9,
    featured: false
  },
  {
    id: 'cat-fragrance',
    name: 'Royal Attar & Concentrated Oud',
    slug: 'royal-attar-oud',
    description: 'Non-alcoholic traditional attar oils, Dehn al Oud, and Shamama tul Amber',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80',
    itemCount: 7,
    featured: false
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-w01',
    sku: 'KB-LWN-01',
    name: 'Gul-e-Noor 3-Piece Luxury Embroidered Festive Lawn Suit',
    slug: 'gul-e-noor-luxury-embroidered-lawn-suit',
    brand: 'Sana Festive Pret',
    category: "Women's Festive Pret & Lawn",
    subcategory: '3-Piece Festive Suits',
    price: 9499,
    originalPrice: 12500,
    stock: 28,
    lowStockThreshold: 5,
    description: 'Bespoke 3-piece luxury embroidered lawn suit featuring intricate pastel floral resham threadwork across the neckline, sleeves, and daman. Paired with a delicate embroidered organza dupatta with scalloped borders and tailored cambric trousers with organza insert detailing.',
    shortDescription: '3-piece embroidered designer pastel lawn suit with scalloped organza dupatta.',
    images: [
      '/src/assets/images/ladies_luxury_lawn_suit_1791271551579.jpg',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80'
    ],
    variants: [
      { id: 'vw1-s', name: 'Stitched Small (Chest 36") / Mint Peach', size: 'Small (36" Chest)', color: 'Mint Pastel', stock: 8, sku: 'KB-LWN-01-S' },
      { id: 'vw1-m', name: 'Stitched Medium (Chest 40") / Mint Peach', size: 'Medium (40" Chest)', color: 'Mint Pastel', stock: 12, sku: 'KB-LWN-01-M' },
      { id: 'vw1-l', name: 'Stitched Large (Chest 44") / Mint Peach', size: 'Large (44" Chest)', color: 'Mint Pastel', stock: 5, sku: 'KB-LWN-01-L' },
      { id: 'vw1-un', name: 'Unstitched 3-Piece Fabric Pack', size: 'Unstitched Fabric', color: 'Mint Pastel', priceDelta: -1500, stock: 3, sku: 'KB-LWN-01-UN' }
    ],
    tags: ['lawn', 'ladies', 'embroidered', 'festive', 'eid', 'organza', '3piece'],
    specs: {
      'Shirt Fabric': '100% Premium Combed Cotton Lawn (80/80 weave)',
      'Dupatta Fabric': 'Pure Organza with heavy border embroidery',
      'Trouser': 'Dyed Cambric Cotton with organza lace hem',
      'Embroidery Style': 'Multi-color Resham and sequin floral motifs',
      'Origin': 'Lahore Fashion District ateliers'
    },
    features: [
      'Pre-shrunk, breathable high-density lawn fabric',
      'Intricate scalloped four-side embroidered organza dupatta',
      'Full sleeves with detailed cutwork cuffs',
      'Includes matching dyed trousers'
    ],
    originCity: 'Lahore',
    shippingDays: '1-2 Business Days',
    rating: 4.9,
    reviewCount: 46,
    isFeatured: true,
    isBestSeller: true,
    isFlashSale: true,
    status: 'active',
    returnPolicy: '7-day easy size exchange and return across Pakistan.',
    warranty: 'Guaranteed 100% original designer fabric & colorfastness'
  },
  {
    id: 'prod-w02',
    sku: 'KB-KHUS-02',
    name: 'Emerald & Gold Zardozi Tilla Velvet Bridal Khussa',
    slug: 'emerald-gold-zardozi-tilla-velvet-khussa',
    brand: 'Anarkali Master Khussa',
    category: 'Handcrafted Bridal Khussas',
    subcategory: 'Bridal & Festive Khussas',
    price: 3850,
    originalPrice: 4800,
    stock: 22,
    lowStockThreshold: 4,
    description: 'Masterfully hand-embroidered by artisan cobblers in Anarkali, Lahore. Features deep emerald green royal micro-velvet adorned with authentic golden tilla, dabka, and micro-pearls. Built with a genuine buffalo leather sole and soft memory foam insole for blister-free comfort.',
    shortDescription: 'Hand-embroidered gold tilla & pearl emerald velvet khussa with padded sole.',
    images: [
      '/src/assets/images/ladies_tilla_khussa_1791271563738.jpg',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80'
    ],
    variants: [
      { id: 'vw2-6', name: 'Size 6 (Pak/UK)', size: '6', color: 'Emerald Green', stock: 4, sku: 'KB-KHUS-02-6' },
      { id: 'vw2-7', name: 'Size 7 (Pak/UK)', size: '7', color: 'Emerald Green', stock: 7, sku: 'KB-KHUS-02-7' },
      { id: 'vw2-8', name: 'Size 8 (Pak/UK)', size: '8', color: 'Emerald Green', stock: 6, sku: 'KB-KHUS-02-8' },
      { id: 'vw2-9', name: 'Size 9 (Pak/UK)', size: '9', color: 'Emerald Green', stock: 3, sku: 'KB-KHUS-02-9' },
      { id: 'vw2-10', name: 'Size 10 (Pak/UK)', size: '10', color: 'Emerald Green', stock: 2, sku: 'KB-KHUS-02-10' }
    ],
    tags: ['khussa', 'ladies', 'bridal', 'tilla', 'velvet', 'lahore', 'shoes'],
    specs: {
      'Upper Material': 'Royal Micro-Velvet with Metallic Tilla & Dabka',
      'Sole Material': '100% Genuine Hand-Stitched Cowhide Leather',
      'Insole': 'Cushioned double-layer anti-bite padding',
      'Embroidery': 'Traditional Zardozi, Sitara & Seed Pearl Handwork',
      'Origin': 'Anarkali Bazaar, Lahore'
    },
    features: [
      'Padded anti-shoe-bite back heel support',
      'Tarnish-resistant metallic golden tilla wire',
      'Flexible leather sole that molds to the foot',
      'Perfect match for Mehndi, Barat, Eid & Wedding formals'
    ],
    originCity: 'Lahore',
    shippingDays: '1-2 Business Days',
    rating: 4.9,
    reviewCount: 37,
    isFeatured: true,
    isBestSeller: true,
    isFlashSale: false,
    status: 'active',
    returnPolicy: '7-day size replacement guarantee nationwide.',
    warranty: 'Guaranteed pure leather sole construction'
  },
  {
    id: 'prod-w03',
    sku: 'KB-JWL-03',
    name: 'Royal 22K Gold-Plated Kundan & Pearl Chandbali Jhumkas',
    slug: 'royal-22k-gold-plated-kundan-pearl-jhumkas',
    brand: 'Sughra Heritage Jewels',
    category: 'Artisan Kundan & Jhumkas',
    subcategory: 'Traditional Earrings',
    price: 4600,
    originalPrice: 5800,
    stock: 16,
    lowStockThreshold: 3,
    description: 'Traditional Pakistani handcrafted bridal jhumkas featuring authentic glass Kundan stones bezel-set in 22K micro-gold-plated brass alloy. Hand-strung with clusters of natural seed pearls and finished with detailed green & ruby red Meenakari enamel on the reverse side.',
    shortDescription: '22K gold-plated Kundan chandbali jhumkas with freshwater pearls and Meenakari.',
    images: [
      '/src/assets/images/ladies_kundan_jhumkas_1791271575827.jpg',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80'
    ],
    variants: [
      { id: 'vw3-std', name: 'Pair (Chandbali & Jhumka Drop) / Gold & Pearl', size: 'Standard (3.2 Inches)', color: 'Gold / Pearl', stock: 16, sku: 'KB-JWL-03-STD' }
    ],
    tags: ['kundan', 'jhumka', 'jewelry', 'ladies', 'bridal', 'chandbali', 'gold'],
    specs: {
      'Base Metal': 'Jewelry-Grade Brass Alloy (Hypoallergenic)',
      'Plating': '22K High-Luster Micron Gold Plating',
      'Stones': 'Hand-cut Foil-backed Glass Kundan & Seed Pearls',
      'Reverse Work': 'Traditional Hand-painted Meenakari Enamel',
      'Weight': 'Lightweight hollow bell design (38g total pair)'
    },
    features: [
      'Hypoallergenic ear posts suitable for sensitive ears',
      'Double-sided beauty with reverse Meenakari floral painting',
      'Supplied in velvet-lined heirloom presentation gift box',
      'Timeless Pakistani bridal design worn by generations'
    ],
    originCity: 'Karachi',
    shippingDays: '2-3 Business Days',
    rating: 5.0,
    reviewCount: 33,
    isFeatured: true,
    isBestSeller: true,
    isFlashSale: true,
    status: 'active',
    returnPolicy: '7-day inspection return guarantee in protective seal.',
    warranty: '1 year anti-tarnish micro-plating guarantee'
  },
  {
    id: 'prod-w04',
    sku: 'KB-KRT-04',
    name: 'Multani Handcrafted Shadow-Work Chikankari Pure Lawn Kurti',
    slug: 'multani-shadow-work-chikankari-lawn-kurti',
    brand: 'Multan Artisan Guild',
    category: "Women's Festive Pret & Lawn",
    subcategory: 'Handcrafted Kurtis',
    price: 4200,
    originalPrice: 5200,
    stock: 25,
    lowStockThreshold: 5,
    description: 'Pure organic white breathable lawn kurti hand-embroidered by female artisan cooperatives in rural Multan. Detailed with classic Bakhia (shadow-work), Phanda, and delicate Jaali needlework along the front placket, finished with hand-carved freshwater shell buttons.',
    shortDescription: 'Handmade Multani Chikankari shadow-work white cotton kurti with pearl buttons.',
    images: [
      '/src/assets/images/ladies_chikankari_kurti_1791271587575.jpg',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80'
    ],
    variants: [
      { id: 'vw4-s', name: 'Small (36" Chest / 38" Length)', size: 'Small (36")', color: 'Pure White', stock: 6, sku: 'KB-KRT-04-S' },
      { id: 'vw4-m', name: 'Medium (39" Chest / 39" Length)', size: 'Medium (39")', color: 'Pure White', stock: 10, sku: 'KB-KRT-04-M' },
      { id: 'vw4-l', name: 'Large (42" Chest / 40" Length)', size: 'Large (42")', color: 'Pure White', stock: 7, sku: 'KB-KRT-04-L' },
      { id: 'vw4-xl', name: 'X-Large (45" Chest / 41" Length)', size: 'X-Large (45")', color: 'Pure White', stock: 2, sku: 'KB-KRT-04-XL' }
    ],
    tags: ['chikankari', 'multan', 'kurti', 'ladies', 'pret', 'white', 'handloom'],
    specs: {
      'Fabric': '100% Pure Fine Pakistani Cotton Lawn',
      'Embroidery Technique': 'Hand-done Multani Shadow-Work (Bakhia) & Jaali',
      'Buttons': 'Natural Iridescent Shell Buttons',
      'Fit': 'Straight A-Line Pakistani Pret Silhouette',
      'Origin': 'Multan District, Punjab'
    },
    features: [
      'Each kurti takes 14 days of dedicated hand-stitching',
      'Soft, ultra-breathable fabric ideal for summer and spring',
      'Pairs elegantly with jeans, culottes, or traditional shalwar',
      'Fair-trade certified directly supporting female village artisans'
    ],
    originCity: 'Multan',
    shippingDays: '2-3 Business Days',
    rating: 4.9,
    reviewCount: 41,
    isFeatured: true,
    isBestSeller: true,
    isFlashSale: false,
    status: 'active',
    returnPolicy: '7-day easy exchange across Pakistan.',
    warranty: 'Guaranteed 100% authentic Multani hand-needlework'
  },
  {
    id: 'prod-001',
    sku: 'KB-CHPL-01',
    name: 'Royal Charsadda Double-Sole Leather Peshawari Chappal',
    slug: 'charsadda-double-sole-peshawari-chappal',
    brand: 'Charsadda Heritage',
    category: 'Footwear & Peshawari Chappals',
    subcategory: 'Traditional Chappals',
    price: 4499,
    originalPrice: 5999,
    stock: 24,
    lowStockThreshold: 5,
    description: 'Handcrafted in Charsadda by 3rd-generation cobblers using hand-tanned full-grain cowhide leather with authentic vulcanized tire rubber double sole for lifetime resilience. Complete with moisture-wicking sheepskin insole lining and adjustable brass buckle.',
    shortDescription: 'Original double-sole hand-stitched tan leather Peshawari chappal with brass buckle.',
    images: [
      '/src/assets/images/peshawari_chappal_1791270548402.jpg',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80'
    ],
    variants: [
      { id: 'v1-sz8', name: 'Size 8 / Tan Camel', size: '8', color: 'Camel Tan', stock: 6, sku: 'KB-CHPL-01-8' },
      { id: 'v1-sz9', name: 'Size 9 / Tan Camel', size: '9', color: 'Camel Tan', stock: 8, sku: 'KB-CHPL-01-9' },
      { id: 'v1-sz10', name: 'Size 10 / Tan Camel', size: '10', color: 'Camel Tan', stock: 7, sku: 'KB-CHPL-01-10' },
      { id: 'v1-sz11', name: 'Size 11 / Tan Camel', size: '11', color: 'Camel Tan', stock: 3, sku: 'KB-CHPL-01-11' }
    ],
    tags: ['peshawari', 'chappal', 'leather', 'charsadda', 'eid', 'traditional'],
    specs: {
      'Upper Material': '100% Full-grain cowhide leather',
      'Sole Type': 'Hand-stitched vulcanized double tire sole',
      'Lining': 'Breathable sheepskin leather',
      'Closure': 'Adjustable antique brass buckle',
      'Origin': 'Charsadda, Khyber Pakhtunkhwa'
    },
    features: [
      'Genuine full-grain leather that softens with wear',
      'Master artisan double-stitch edge detailing',
      'Slip-resistant heavy duty tire rubber sole',
      'Ideal for Shalwar Kameez, Eid & Weddings'
    ],
    originCity: 'Peshawar',
    shippingDays: '2-3 Business Days',
    rating: 4.9,
    reviewCount: 38,
    isFeatured: true,
    isBestSeller: true,
    isFlashSale: true,
    status: 'active',
    returnPolicy: '7-day hassle-free size exchange & return across Pakistan.',
    warranty: '6 months sole stitching guarantee'
  },
  {
    id: 'prod-002',
    sku: 'KB-AJRK-02',
    name: 'Artisan Hand-Block Indigo & Madder Ajrak Silk Shawl',
    slug: 'artisan-hand-block-ajrak-shawl',
    brand: 'Sindh Craft Council',
    category: 'Handloom Shawls & Ajrak',
    subcategory: 'Traditional Block Prints',
    price: 3850,
    originalPrice: 4800,
    stock: 18,
    lowStockThreshold: 4,
    description: 'Authentic 16-step natural dye Ajrak shawl from Bhit Shah, Sindh. Crafted using carved teak wood blocks with natural indigo extracts, madder roots, and pomegranate rinds on organic cotton-silk blend fabric.',
    shortDescription: '100% authentic natural-dyed geometric Ajrak shawl with hand-finished tassels.',
    images: [
      '/src/assets/images/ajrak_shawl_1791270563789.jpg',
      'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=600&q=80'
    ],
    variants: [
      { id: 'v2-std', name: 'Standard (2.5m x 1.1m) / Indigo & Maroon', size: '2.5 Meters', color: 'Indigo/Crimson', stock: 18, sku: 'KB-AJRK-02-STD' }
    ],
    tags: ['ajrak', 'sindh', 'bhit shah', 'handloom', 'shawl', 'cultural'],
    specs: {
      'Fabric Composition': '70% Fine Organic Cotton, 30% Mulberry Silk',
      'Dyeing Technique': '16-Stage Natural Mineral & Vegetable Dyeing',
      'Dimensions': '2.5 Meters Length x 1.1 Meters Width',
      'Border Finish': 'Hand-twisted fringe tassels',
      'Origin': 'Bhit Shah / Matiari, Sindh'
    },
    features: [
      'Chemical-free natural dyes gentle on sensitive skin',
      'Dual-side printed pattern with vivid pigment penetration',
      'Lightweight, breathable weave suitable for all seasons',
      'Symbolic Pakistani national heritage textile'
    ],
    originCity: 'Hyderabad',
    shippingDays: '2-4 Business Days',
    rating: 4.8,
    reviewCount: 29,
    isFeatured: true,
    isBestSeller: true,
    isFlashSale: false,
    status: 'active',
    returnPolicy: '7-day check and return upon delivery.',
    warranty: 'Colorfast natural dye guarantee'
  },
  {
    id: 'prod-003',
    sku: 'KB-CRKT-03',
    name: 'Sialkot Master Edition English Willow Cricket Bat (Grade 1)',
    slug: 'sialkot-master-edition-cricket-bat',
    brand: 'Sialkot Sports Forge',
    category: 'Sialkot Sports & Willow',
    subcategory: 'Cricket Bats',
    price: 18500,
    originalPrice: 22000,
    stock: 12,
    lowStockThreshold: 3,
    description: 'Handcrafted in Sialkot from unbleached Grade 1 air-seasoned English Willow. Boasting 8-10 straight equidistant grains, massive 40mm contoured edges, and a pronounced mid-to-low sweet spot engineered for Asian subcontinental pitches.',
    shortDescription: 'Professional grade Sialkot English willow bat with chevron grip and padded cover.',
    images: [
      '/src/assets/images/sialkot_cricket_bat_1791270577720.jpg',
      'https://images.unsplash.com/photo-1531415074868-036b107e775a?auto=format&fit=crop&w=600&q=80'
    ],
    variants: [
      { id: 'v3-w1', name: 'Short Handle / 2.7 lbs', size: 'Short Handle (2.7 lbs)', color: 'Gold/Black Grip', stock: 5, sku: 'KB-CRKT-03-27' },
      { id: 'v3-w2', name: 'Short Handle / 2.8 lbs', size: 'Short Handle (2.8 lbs)', color: 'Gold/Black Grip', stock: 7, sku: 'KB-CRKT-03-28' }
    ],
    tags: ['cricket', 'sialkot', 'willow', 'sports', 'bat', 'babar'],
    specs: {
      'Willow Grade': 'Grade 1 Hand-Selected English Willow',
      'Handle Construction': '12-piece cane handle with 3 rubber inserts',
      'Edge Profile': '39mm - 41mm thick contoured edges',
      'Weight Range': '1160g - 1220g (2.7 - 2.85 lbs)',
      'Origin': 'Sialkot, Punjab'
    },
    features: [
      'Pre-knocked in with hand-hammer compression',
      'Exceptional pick-up and feather-light balance',
      'Includes premium thermal padded bat cover with shoulder strap',
      'Used by First-Class Pakistani domestic players'
    ],
    originCity: 'Sialkot',
    shippingDays: '2-3 Business Days',
    rating: 5.0,
    reviewCount: 44,
    isFeatured: true,
    isBestSeller: true,
    isFlashSale: true,
    status: 'active',
    returnPolicy: '7-day replacement for manufacturing defects.',
    warranty: '1 year handle warranty against breakage'
  },
  {
    id: 'prod-004',
    sku: 'KB-KRTA-04',
    name: 'Rawalpindi Premium Boski Stitched Men Kurta & Shalwar',
    slug: 'rawalpindi-boski-stitched-kurta-shalwar',
    brand: 'Khaas Rivaaj',
    category: 'Eastern Apparel & Kurtas',
    subcategory: 'Men Shalwar Kameez',
    price: 6999,
    originalPrice: 8500,
    stock: 20,
    lowStockThreshold: 4,
    description: 'Impeccably tailored from premium high-twist micro-fiber Boski fabric known for its ultra-soft drape, subtle natural sheen, and zero-wrinkle durability. Detailed with discreet single-needle hand-done collar embroidery and mother-of-pearl buttons.',
    shortDescription: 'Luxury Boski off-white stitched suit with crisp band collar and pearl buttons.',
    images: [
      '/src/assets/images/hero_banner_crafts_1791270531944.jpg',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80'
    ],
    variants: [
      { id: 'v4-sm', name: 'Small (38" Chest) / Off-White', size: 'Small (38")', color: 'Cream White', stock: 4, sku: 'KB-KRTA-04-S' },
      { id: 'v4-med', name: 'Medium (41" Chest) / Off-White', size: 'Medium (41")', color: 'Cream White', stock: 8, sku: 'KB-KRTA-04-M' },
      { id: 'v4-lrg', name: 'Large (44" Chest) / Off-White', size: 'Large (44")', color: 'Cream White', stock: 6, sku: 'KB-KRTA-04-L' },
      { id: 'v4-xl', name: 'X-Large (47" Chest) / Off-White', size: 'X-Large (47")', color: 'Cream White', stock: 2, sku: 'KB-KRTA-04-XL' }
    ],
    tags: ['boski', 'kurta', 'shalwarkameez', 'eid', 'jummah', 'pakistani'],
    specs: {
      'Fabric': 'Premium imported 6-pound grade Boski silk weave',
      'Cut': 'Relaxed Pakistani bespoke fit with side pockets',
      'Collar Style': 'Classic 1.25" stiff band collar',
      'Buttons': 'Genuine natural Mother-of-Pearl buttons',
      'Origin': 'Lahore / Rawalpindi ateliers'
    },
    features: [
      'Silky smooth hand-feel that stays fresh all day',
      'Non-shrink, easy-care color retention',
      'Deep side pockets + front chest pocket',
      'Includes matching pleated shalwar'
    ],
    originCity: 'Lahore',
    shippingDays: '1-2 Business Days',
    rating: 4.9,
    reviewCount: 52,
    isFeatured: true,
    isBestSeller: true,
    isFlashSale: false,
    status: 'active',
    returnPolicy: '7-day easy size exchange nationwide.',
    warranty: 'Guaranteed genuine Boski weave'
  },
  {
    id: 'prod-005',
    sku: 'KB-DRYF-05',
    name: 'Quetta Premium Paper-Shell Walnuts & Chilgoza Gift Box (1kg)',
    slug: 'quetta-paper-shell-walnuts-chilgoza',
    brand: 'Balochistan Orchards',
    category: 'Quetta Dry Fruits & Saffron',
    subcategory: 'Gourmet Nuts',
    price: 3600,
    originalPrice: 4200,
    stock: 35,
    lowStockThreshold: 8,
    description: 'Fresh season handpicked Ziarat mountain paper-shell walnuts (kaghzi akhrot) accompanied by roasted Waziristan pine nuts (Chilgoza). Packed in an airtight moisture-locked wooden presentation gift box.',
    shortDescription: '1kg pack of freshly harvested thin-shell Quetta walnuts & roasted Chilgoza.',
    images: [
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1543208543-605288591ad2?auto=format&fit=crop&w=600&q=80'
    ],
    variants: [
      { id: 'v5-1kg', name: '1 Kilogram Box', size: '1 KG', color: 'Natural', stock: 25, sku: 'KB-DRYF-05-1K' },
      { id: 'v5-2kg', name: '2 Kilogram Family Pack', size: '2 KG', color: 'Natural', priceDelta: 3200, stock: 10, sku: 'KB-DRYF-05-2K' }
    ],
    tags: ['dryfruits', 'quetta', 'walnut', 'chilgoza', 'healthy', 'organic'],
    specs: {
      'Shell Thickness': 'Thin paper-shell (easily cracked by fingers)',
      'Harvest Date': 'Current Season Harvest',
      'Nutritional Value': 'Rich in Omega-3 fatty acids and heart-healthy antioxidants',
      'Packaging': 'Food-grade vacuum sealed pouch inside craft box',
      'Origin': 'Ziarat & Quetta, Balochistan'
    },
    features: [
      '100% natural, unbleached, and unpolished kernels',
      'Crisp, sweet taste without bitterness',
      'Direct farm-to-table sourcing from Balochistan farmers',
      'Guaranteed zero chemical treatment'
    ],
    originCity: 'Quetta',
    shippingDays: '3-4 Business Days',
    rating: 4.8,
    reviewCount: 31,
    isFeatured: false,
    isBestSeller: true,
    isFlashSale: false,
    status: 'active',
    returnPolicy: 'Quality guarantee: 100% replacement if damaged.',
    warranty: 'Freshness sealed guarantee'
  },
  {
    id: 'prod-006',
    sku: 'KB-ATTR-06',
    name: 'Shamamatul Amber & Royal Cambodian Dehn al Oud (12ml)',
    slug: 'shamamatul-amber-royal-cambodian-oud',
    brand: 'Dar-ul-Attar',
    category: 'Royal Attar & Concentrated Oud',
    subcategory: 'Concentrated Perfume Oil',
    price: 4950,
    originalPrice: 6500,
    stock: 15,
    lowStockThreshold: 3,
    description: 'Hydro-distilled pure concentrated perfume oil aged for 7 years in leather flasks. Features rich smoky agarwood notes interwoven with spicy saffron, Mysore sandalwood base, and ambergris crystals. Zero alcohol.',
    shortDescription: '12ml crystal bottle of aged pure Cambodian Oud and Shamama with crystal dip-stick.',
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80'
    ],
    variants: [
      { id: 'v6-6ml', name: '6ml Crystal Toori', size: '6ml', color: 'Deep Amber', priceDelta: -2100, stock: 7, sku: 'KB-ATTR-06-6M' },
      { id: 'v6-12ml', name: '12ml Crystal Toori (1 Tola)', size: '12ml (1 Tola)', color: 'Deep Amber', stock: 8, sku: 'KB-ATTR-06-12M' }
    ],
    tags: ['attar', 'oud', 'amber', 'perfume', 'islamic', 'jummah'],
    specs: {
      'Alcohol Content': '0.0% Alcohol (Halal certified)',
      'Projection / Longevity': '24+ hours on fabrics and skin',
      'Bottle': 'Hand-cut crystal toori with glass applicator wand',
      'Notes': 'Top: Wild Saffron; Heart: Cambodian Agarwood; Base: Ambergris & Sandal',
      'Origin': 'Karachi Perfumery Ateliers'
    },
    features: [
      'Traditional bhati copper-still distillation',
      'Long-lasting projection that evolves throughout the day',
      'Velvet presentation box ideal for gifts and Jummah prayer',
      'Safe for prayer and daily wear'
    ],
    originCity: 'Karachi',
    shippingDays: '2-3 Business Days',
    rating: 4.9,
    reviewCount: 22,
    isFeatured: true,
    isBestSeller: false,
    isFlashSale: true,
    status: 'active',
    returnPolicy: '7-day return if seal unbroken.',
    warranty: 'Pure oil purity certification'
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 'rev-01',
    productId: 'prod-001',
    userName: 'Muhammad Hamza',
    city: 'Lahore (DHA Phase 5)',
    rating: 5,
    date: '2026-09-18',
    comment: 'Zabardast chappal hai! Charsadda ki original double-sole tire wali finish hai. Size 9 fitting bilkul perfect aayi aur COD delivery Lahore mein 2 din mein TCS ke zariye mil gayi. Highly recommended for Shalwar Kameez.',
    verifiedPurchase: true
  },
  {
    id: 'rev-02',
    productId: 'prod-001',
    userName: 'Usman Ali Khan',
    city: 'Peshawar (Hayatabad)',
    rating: 5,
    date: '2026-09-24',
    comment: 'Peshawar ka local hon, chappal ki quality aur leather smell se pehchan leta hoon. KhaasBazaar ne 100% genuine craftsmanship bheji hai. Leather bohot soft hai.',
    verifiedPurchase: true
  },
  {
    id: 'rev-03',
    productId: 'prod-002',
    userName: 'Fatima Zahra',
    city: 'Karachi (Clifton)',
    rating: 5,
    date: '2026-09-20',
    comment: 'Original Sindhi Ajrak! The hand block geometric print is so crisp and pure natural indigo smell. Wore it to a cultural dinner and received compliments non-stop.',
    verifiedPurchase: true
  },
  {
    id: 'rev-04',
    productId: 'prod-003',
    userName: 'Bilal Farooq',
    city: 'Islamabad (F-10)',
    rating: 5,
    date: '2026-10-01',
    comment: 'Sialkot willow quality is unbelievable. Ping and sound on leather ball is pure music. Balanced pickup, edges are massive 40mm. Worth every rupee.',
    verifiedPurchase: true
  },
  {
    id: 'rev-05',
    productId: 'prod-004',
    userName: 'Dr. Shahzad Mir',
    city: 'Rawalpindi (Saddar)',
    rating: 5,
    date: '2026-09-28',
    comment: 'Boski ka fall aur kapray ki softness kamaal hai. Tailoring clean hai aur button patti standard designer level ki hai.',
    verifiedPurchase: true
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'WELCOME10',
    type: 'percent',
    value: 10,
    minOrderAmount: 2000,
    maxDiscount: 1500,
    expiryDate: '2026-12-31',
    usageCount: 142,
    isActive: true,
    description: '10% discount on orders above Rs. 2,000 for all customers'
  },
  {
    code: 'AZADI20',
    type: 'percent',
    value: 20,
    minOrderAmount: 5000,
    maxDiscount: 2500,
    expiryDate: '2026-11-30',
    usageCount: 88,
    isActive: true,
    description: '20% Mega Celebration discount on orders above Rs. 5,000'
  },
  {
    code: 'KHAAS500',
    type: 'fixed',
    value: 500,
    minOrderAmount: 3500,
    expiryDate: '2026-12-31',
    usageCount: 65,
    isActive: true,
    description: 'Flat Rs. 500 OFF on orders above Rs. 3,500'
  }
];

export const PAKISTANI_CITIES: ShippingCityRate[] = [
  { city: 'Lahore', province: 'Punjab', rate: 150, estimatedDays: '1-2 Days' },
  { city: 'Karachi', province: 'Sindh', rate: 220, estimatedDays: '2-3 Days' },
  { city: 'Islamabad', province: 'Islamabad Capital Territory', rate: 180, estimatedDays: '1-2 Days' },
  { city: 'Rawalpindi', province: 'Punjab', rate: 180, estimatedDays: '1-2 Days' },
  { city: 'Faisalabad', province: 'Punjab', rate: 180, estimatedDays: '1-3 Days' },
  { city: 'Multan', province: 'Punjab', rate: 190, estimatedDays: '2-3 Days' },
  { city: 'Peshawar', province: 'Khyber Pakhtunkhwa', rate: 200, estimatedDays: '2-3 Days' },
  { city: 'Quetta', province: 'Balochistan', rate: 260, estimatedDays: '3-4 Days' },
  { city: 'Sialkot', province: 'Punjab', rate: 160, estimatedDays: '1-2 Days' },
  { city: 'Gujranwala', province: 'Punjab', rate: 170, estimatedDays: '1-2 Days' },
  { city: 'Hyderabad', province: 'Sindh', rate: 230, estimatedDays: '2-3 Days' },
  { city: 'Bahawalpur', province: 'Punjab', rate: 210, estimatedDays: '2-3 Days' },
  { city: 'Sargodha', province: 'Punjab', rate: 190, estimatedDays: '2-3 Days' },
  { city: 'Abbottabad', province: 'Khyber Pakhtunkhwa', rate: 220, estimatedDays: '2-3 Days' },
  { city: 'Gilgit', province: 'Gilgit-Baltistan', rate: 300, estimatedDays: '4-5 Days' },
  { city: 'Muzaffarabad', province: 'Azad Jammu & Kashmir', rate: 250, estimatedDays: '3-4 Days' }
];

export const INITIAL_STORE_SETTINGS: StoreSettings = {
  storeName: 'KhaasBazaar Pakistan',
  tagline: 'Authentic Pakistani Craftsmanship & Everyday Luxury',
  contactEmail: 'support@khaasbazaar.pk',
  contactPhone: '+92 42 3578 9200',
  whatsappNumber: '+92 300 8492021',
  address: 'Shop 42, Level 2, Al-Hafeez Shopping Mall, Main Boulevard, Gulberg III, Lahore, Pakistan',
  freeShippingThreshold: 3500,
  defaultShippingRate: 200,
  taxRatePercent: 0, // In Pakistan, retail prices generally include sales tax or simplified e-commerce tier
  ntnNumber: 'PK-NTN-7348912-4',
  allowCOD: true,
  allowJazzCash: true,
  allowEasypaisa: true,
  allowBankTransfer: true,
  bankDetails: {
    bankName: 'Meezan Bank Limited (Islamic Banking)',
    accountTitle: 'Khaas Bazaar Retail Pvt Ltd',
    accountNumber: '02010108920192',
    iban: 'PK42MEZN0002010108920192',
    branch: 'Gulberg Main Branch, Lahore (Code: 0201)'
  }
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'PK-2026-004812',
    customerName: 'Muhammad Hamza',
    customerEmail: 'hamza.lahore@example.com',
    customerPhone: '03008459123',
    shippingAddress: {
      province: 'Punjab',
      city: 'Lahore',
      area: 'DHA Phase 5, Sector C',
      addressLine: 'House 142-B, Street 7',
      postalCode: '54792',
      deliveryInstructions: 'Call rider before arriving, leave at security gate if busy'
    },
    items: [
      {
        productId: 'prod-001',
        productName: 'Royal Charsadda Double-Sole Leather Peshawari Chappal',
        variantName: 'Size 9 / Tan Camel',
        image: '/src/assets/images/peshawari_chappal_1791270548402.jpg',
        price: 4499,
        quantity: 1,
        subtotal: 4499
      }
    ],
    subtotal: 4499,
    discount: 449,
    shippingFee: 0, // Above free shipping threshold
    total: 4050,
    paymentMethod: 'COD',
    paymentStatus: 'Pending',
    orderStatus: 'Shipped',
    createdAt: '2026-10-04T11:20:00Z',
    courierName: 'TCS Pakistan',
    trackingNumber: 'TCS-9281740192',
    estimatedDelivery: 'Oct 07, 2026',
    timeline: [
      { status: 'Confirmed', timestamp: '2026-10-04 11:25 AM', location: 'Lahore Hub', note: 'Order verified via SMS and customer confirmation' },
      { status: 'Processing', timestamp: '2026-10-04 02:40 PM', location: 'Gulberg Warehouse', note: 'Item picked and quality verified' },
      { status: 'Packed', timestamp: '2026-10-04 05:10 PM', location: 'Dispatch Station', note: 'Sealed in tamper-evident security courier bag' },
      { status: 'Shipped', timestamp: '2026-10-05 09:30 AM', location: 'TCS Cargo Hub', note: 'Handed over to TCS rider for local hub dispatch' }
    ]
  },
  {
    id: 'PK-2026-004809',
    customerName: 'Fatima Zahra',
    customerEmail: 'fatima.zahra@example.com',
    customerPhone: '03219482011',
    shippingAddress: {
      province: 'Sindh',
      city: 'Karachi',
      area: 'Clifton Block 4',
      addressLine: 'Flat 402, Ocean Pearl Towers',
      postalCode: '75600',
      deliveryInstructions: 'Do not ring bell after 9 PM'
    },
    items: [
      {
        productId: 'prod-002',
        productName: 'Artisan Hand-Block Indigo & Madder Ajrak Silk Shawl',
        variantName: 'Standard (2.5m x 1.1m) / Indigo & Maroon',
        image: '/src/assets/images/ajrak_shawl_1791270563789.jpg',
        price: 3850,
        quantity: 1,
        subtotal: 3850
      }
    ],
    subtotal: 3850,
    discount: 0,
    shippingFee: 0,
    total: 3850,
    paymentMethod: 'Easypaisa',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    createdAt: '2026-09-30T14:15:00Z',
    courierName: 'Trax Logistics',
    trackingNumber: 'TRX-83719401',
    estimatedDelivery: 'Oct 03, 2026',
    timeline: [
      { status: 'Confirmed', timestamp: '2026-09-30 02:20 PM', location: 'Karachi Central', note: 'Payment verified via Easypaisa transaction ID' },
      { status: 'Processing', timestamp: '2026-09-30 04:00 PM', location: 'Hyderabad Artisan Depot', note: 'Product inspected' },
      { status: 'Packed', timestamp: '2026-10-01 10:15 AM', location: 'Trax Hub', note: 'Dispatched to Karachi airport transit' },
      { status: 'Shipped', timestamp: '2026-10-02 08:00 AM', location: 'Karachi Hub', note: 'Arrived at South sorting center' },
      { status: 'Out for Delivery', timestamp: '2026-10-03 10:30 AM', location: 'Clifton Route', note: 'Rider Kashif out for delivery' },
      { status: 'Delivered', timestamp: '2026-10-03 01:45 PM', location: 'Clifton Block 4', note: 'Received by customer with signature' }
    ]
  }
];
