export interface ProductSpecs {
  dimensions: string;
  material: string;
  minOrder: string;
  printOptions: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  images: string[];
  category: string;
  features: string[];
  laminationOptions: string[];
  specs?: ProductSpecs;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  content: string;
  avatar?: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: string;
}

export interface InquiryFormData {
  contactMethod: 'whatsapp' | 'email' | null;
  name: string;
  whatsappNumber: string;
  countryCode: string;
  email: string;
  companyName: string;
  requirements: string;
  productInterest?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  company?: string;
  created_at: string;
}
