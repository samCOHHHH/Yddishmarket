export interface Vendor {
  id: string;
  name: string;
  description: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  logo: string;
  location: string;
}

export interface ProductImage {
  url: string;
  alt: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  shortDescription: string;
  category: string;
  sku: string;
  shippingInfo: string;
  images: ProductImage[];
  vendor: Vendor;
  stockStatus: 'in_stock' | 'out_of_stock' | 'low_stock';
  reviews: Review[];
}

export interface CartItem extends Product {
  quantity: number;
}
