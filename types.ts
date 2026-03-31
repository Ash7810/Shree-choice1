export interface Product {
  id: number;
  name: string;
  price: number;
  original_price?: number;
  image_url: string;
  images: string[];
  description: string;
  category: string;
  age_group: string;
  brand: string;
  tags: string[];
  rating: number;
  reviews: number;
  in_stock: boolean;
  stock_quantity: number;
}

// Represents the raw data from Supabase, which might have a legacy 'image' field
export interface SupabaseProduct extends Omit<Product, 'image_url'> {
    image_url?: string;
    image?: string; // Legacy field
}


export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  name:string;
  image_url: string;
}

export interface Brand {
  id: number;
  name: string;
  logo_url: string;
  is_featured?: boolean;
}

export interface Address {
    id: string;
    full_name: string;
    street: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
    phone: string;
    is_default: boolean;
}

export interface Order {
    id: string;
    created_at: string;
    items: CartItem[];
    total: number;
    status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    shipping_address: Address;
}

export interface UserProfile {
    id: string;
    email: string;
    role: 'user' | 'admin';
}
