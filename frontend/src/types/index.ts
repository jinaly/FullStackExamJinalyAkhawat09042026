export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  productId: Product;
  quantity: number;
}

export interface Cart {
  _id: string;
  userId: number;
  items: CartItem[];
  createdAt?: string;
  updatedAt?: string;
}

export interface DailyRevenue {
  date: string;
  revenue: number;
}

export interface TopSpender {
  user_id: number;
  total_spent: number;
}

export interface CategorySummary {
  _id: string;
  count: number;
  avgPrice: number;
}

export interface ReportsData {
  dailyRevenue: DailyRevenue[];
  topSpenders: TopSpender[];
  productsByCategory: CategorySummary[];
}
