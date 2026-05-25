import type { Product, Service, Testimonial } from '@/types';

export const products: Product[] = [
  // Indian Sweet Boxes
  {
    id: 'sw-1',
    name: 'Premium Mithai Box - 500g',
    description: 'Elegant gold-foil embossed box perfect for festive sweets. Food-grade laminated interior.',
    image: '/products/mithai-box-500.jpg',
    images: ['/products/mithai-box-500.jpg'],
    category: 'Indian Sweet Boxes',
    laminationOptions: ['Reg', '1P', '2P'],
    features: ['Food-grade certified', 'Gold foil finish', 'Leak-proof', 'Festive designs'],
    specs: {
      dimensions: '8" x 6" x 2.5"',
      material: 'Premium Paperboard 350 GSM',
      minOrder: '500 pieces',
      printOptions: 'Full color offset, Foil stamping',
    },
  },
  {
    id: 'sw-2',
    name: 'Ladoo Box - 12 Cavity',
    description: 'Specially designed compartments to keep ladoos intact. Perfect for weddings and celebrations.',
    image: '/products/ladoo-box.jpg',
    images: ['/products/ladoo-box.jpg'],
    category: 'Indian Sweet Boxes',
    laminationOptions: [],
    features: ['12 individual cavities', 'Window display', 'Stackable', 'Custom branding'],
    specs: {
      dimensions: '10" x 8" x 2"',
      material: 'Food-safe Corrugated E-Flute',
      minOrder: '300 pieces',
      printOptions: 'Flexo, Digital, Litho-lamination',
    },
  },
  {
    id: 'sw-3',
    name: 'Barfi Tray Box - 1kg',
    description: 'Traditional tray-style box with secure lid. Grease-resistant coating for oily sweets.',
    image: '/products/barfi-box.jpg',
    images: ['/products/barfi-box.jpg'],
    category: 'Indian Sweet Boxes',
    laminationOptions: [],
    features: ['Grease-resistant', 'Secure lock lid', 'Ventilation slots', 'Eco-friendly'],
    specs: {
      dimensions: '12" x 8" x 3"',
      material: 'Kraft Paperboard 300 GSM',
      minOrder: '250 pieces',
      printOptions: 'Full color, Matte/Gloss lamination',
    },
  },
  {
    id: 'sw-4',
    name: 'Dry Fruit Gift Box',
    description: 'Luxurious multi-compartment box for dry fruits and premium sweets. Perfect for Diwali gifting.',
    image: '/products/dryfruit-box.jpg',
    images: ['/products/dryfruit-box.jpg'],
    category: 'Indian Sweet Boxes',
    laminationOptions: [],
    features: ['6 compartments', 'Magnetic closure', 'Ribbon handle', 'Premium finish'],
    specs: {
      dimensions: '14" x 10" x 3"',
      material: 'Rigid Box with Art Paper',
      minOrder: '200 pieces',
      printOptions: 'Hot foil, Embossing, Spot UV',
    },
  },

  // Cake & Bakery
  {
    id: 'ck-1',
    name: 'Cake Box - 1kg Round',
    description: 'Sturdy box for round cakes with window display. Easy assembly with secure base.',
    image: '/products/cake-box-1kg.jpg',
    images: ['/products/cake-box-1kg.jpg'],
    category: 'Cake & Bakery',
    laminationOptions: [],
    features: ['Clear window', 'Sturdy base', 'Easy fold', 'Ventilated'],
    specs: {
      dimensions: '10" x 10" x 5"',
      material: 'Duplex Board 350 GSM',
      minOrder: '500 pieces',
      printOptions: 'Full color, Window options',
    },
  },
  {
    id: 'ck-2',
    name: 'Pastry Box - 6 Cavity',
    description: 'Individual compartments for pastries and cupcakes. Food-safe with elegant design.',
    image: '/products/pastry-box.jpg',
    images: ['/products/pastry-box.jpg'],
    category: 'Cake & Bakery',
    laminationOptions: [],
    features: ['6 cavities', 'Insert included', 'Carry handle', 'Grease-proof'],
    specs: {
      dimensions: '12" x 8" x 4"',
      material: 'Coated Paperboard 300 GSM',
      minOrder: '400 pieces',
      printOptions: 'Digital, Offset printing',
    },
  },
  {
    id: 'ck-3',
    name: 'Brownie Box - Window',
    description: 'Compact box with clear window for brownies and cookies. Eco-friendly material.',
    image: '/products/brownie-box.jpg',
    images: ['/products/brownie-box.jpg'],
    category: 'Cake & Bakery',
    laminationOptions: [],
    features: ['Clear window', 'Recyclable', 'Compact design', 'Food-safe'],
    specs: {
      dimensions: '6" x 6" x 2"',
      material: 'Kraft Paper 280 GSM',
      minOrder: '1000 pieces',
      printOptions: 'Single color, Kraft natural',
    },
  },
  {
    id: 'ck-4',
    name: 'Wedding Cake Box - 3 Tier',
    description: 'Premium tiered box for elaborate wedding and celebration cakes. Maximum protection.',
    image: '/products/wedding-cake-box.jpg',
    images: ['/products/wedding-cake-box.jpg'],
    category: 'Cake & Bakery',
    laminationOptions: [],
    features: ['3-tier support', 'Extra sturdy', 'Elegant finish', 'Custom sizes'],
    specs: {
      dimensions: '16" x 16" x 18"',
      material: 'Heavy Duty Corrugated',
      minOrder: '100 pieces',
      printOptions: 'Full branding, Premium finish',
    },
  },

  // Sandwich & Fast Food
  {
    id: 'ff-1',
    name: 'Sandwich Box - Hinged',
    description: 'Classic hinged design for sandwiches and wraps. Keeps food fresh and visible.',
    image: '/products/sandwich-box.jpg',
    images: ['/products/sandwich-box.jpg'],
    category: 'Sandwich & Fast Food',
    laminationOptions: [],
    features: ['Hinged lid', 'Clear window', 'Microwave safe', 'Stackable'],
    specs: {
      dimensions: '7" x 5" x 3"',
      material: 'Food-grade Kraft 300 GSM',
      minOrder: '1000 pieces',
      printOptions: 'Flexo printing',
    },
  },
  {
    id: 'ff-2',
    name: 'Burger Box - Premium',
    description: 'Clamshell design keeps burgers warm and intact. Grease-resistant interior.',
    image: '/products/burger-box.jpg',
    images: ['/products/burger-box.jpg'],
    category: 'Sandwich & Fast Food',
    laminationOptions: [],
    features: ['Clamshell design', 'Grease barrier', 'Ventilation holes', 'Branded'],
    specs: {
      dimensions: '5" x 5" x 3.5"',
      material: 'Coated Kraft 350 GSM',
      minOrder: '2000 pieces',
      printOptions: 'Full color, Inside-out printing',
    },
  },
  {
    id: 'ff-3',
    name: 'French Fries Scoop Box',
    description: 'Iconic scoop design for fries and snacks. Easy to hold and serve.',
    image: '/products/fries-box.jpg',
    images: ['/products/fries-box.jpg'],
    category: 'Sandwich & Fast Food',
    laminationOptions: [],
    features: ['Scoop design', 'Easy grip', 'Oil resistant', 'Fun prints'],
    specs: {
      dimensions: '4" x 3" x 5"',
      material: 'Grease-proof Paperboard',
      minOrder: '5000 pieces',
      printOptions: 'High-impact graphics',
    },
  },
  {
    id: 'ff-4',
    name: 'Meal Box - Compartment',
    description: 'Multi-compartment box for combo meals. Keeps items separate and organized.',
    image: '/products/meal-box.jpg',
    images: ['/products/meal-box.jpg'],
    category: 'Sandwich & Fast Food',
    laminationOptions: [],
    features: ['3 compartments', 'Leak-proof', 'Microwave safe', 'Eco-friendly'],
    specs: {
      dimensions: '9" x 7" x 2.5"',
      material: 'Bagasse/Sugarcane Fiber',
      minOrder: '1000 pieces',
      printOptions: 'Embossed branding',
    },
  },
];

export const categories = [
  { id: 'indian-sweets', name: 'Indian Sweet Boxes', icon: 'Gift' },
  { id: 'cake-bakery', name: 'Cake & Bakery', icon: 'Cake' },
  { id: 'fast-food', name: 'Sandwich & Fast Food', icon: 'Sandwich' },
];

export const timelineEvents = [
  {
    year: '1983',
    title: 'The Beginning',
    description: 'Paper Crafts was founded in Nagpur with a vision to provide quality packaging solutions for local sweet shops and bakeries.',
    icon: 'Sparkles',
  },
  {
    year: '1995',
    title: 'Expanded Operations',
    description: 'Moved to a larger facility at New Cotton Market Layout. Introduced modern printing and die-cutting machines.',
    icon: 'Factory',
  },
  {
    year: '2005',
    title: 'Food-Grade Certification',
    description: 'Committed to food-grade packaging standards. Became the trusted choice for bakeries and sweet manufacturers across Vidarbha.',
    icon: 'Shield',
  },
  {
    year: '2015',
    title: 'Eco-Friendly Initiative',
    description: 'Transitioned to recyclable materials and introduced biodegradable coating alternatives for environmentally conscious clients.',
    icon: 'Leaf',
  },
  {
    year: '2020',
    title: 'Digital Transformation',
    description: 'Launched digital ordering system. Introduced rapid prototyping with quick sample delivery across Maharashtra.',
    icon: 'Zap',
  },
  {
    year: '2024',
    title: 'Regional Leader',
    description: 'Now serving 1,000+ clients across India. Trusted by leading sweet chains, bakeries, and cloud kitchens.',
    icon: 'Globe',
  },
];

export const services: Service[] = [
  {
    id: '1',
    title: 'Custom Design',
    description: 'Work with our expert team to create packaging that perfectly represents your brand and protects your products.',
    icon: 'Palette',
  },
  {
    id: '2',
    title: 'Festive Collections',
    description: 'Special packaging designs for Diwali, weddings, and celebrations. Ready-made festive themes to make your sweets shine.',
    icon: 'Sparkles',
  },
  {
    id: '3',
    title: 'Sustainable Solutions',
    description: '100% recyclable and biodegradable options. Reduce your environmental footprint without compromising quality.',
    icon: 'Leaf',
  },
  {
    id: '4',
    title: 'Bulk Orders',
    description: 'Large volume orders with consistent quality and competitive pricing. Reliable supply for your growing business.',
    icon: 'Package',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Rajesh Halwai',
    company: 'Shree Krishna Sweets, Nagpur',
    content: 'Paper Crafts has been our packaging partner for over 15 years. Their sweet boxes are perfect for our premium mithai. The quality and timely delivery is unmatched.',
  },
  {
    id: '2',
    name: 'Priya Bhatia',
    company: 'The Cake Studio, Nagpur',
    content: 'We switched to Paper Crafts for all our cake packaging. The sturdy construction means zero damage during delivery, and our customers love the elegant presentation.',
  },
  {
    id: '3',
    name: 'Mohammed Irfan',
    company: 'Quick Bites Cafe, Wardha',
    content: 'Fast delivery, consistent quality, and eco-friendly materials. Our customers appreciate that we use sustainable packaging. Great partner for our cloud kitchen.',
  },
];

export const stats = [
  { label: 'Boxes Produced', value: '1B+' },
  { label: 'Happy Clients', value: '2,000+' },
  { label: 'Years Experience', value: '40+' },
  { label: 'Recyclable Materials', value: '100%' },
];

export const companyInfo = {
  name: 'Paper Crafts',
  tagline: 'For Sweet & Bakery Boxes',
  description: 'Since 1983, we manufacture high-quality, food-grade packaging for sweet shops, bakeries, and restaurants in India. From traditional mithai boxes to modern bakery packaging, we deliver excellence in every box.',
  email: 'papercrafts83@yahoo.co.in',
  phone: '+91 7276033806',
  landline: '(0712) 2728583',
  whatsapp: '917276033806',
  address: '26, New Cotton Market Layout, Near S T Stand, Nagpur - 440 018',
};
