import { Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser {
  id: number;
  email: string;
  password_hash: string;
  created_at: Date;
}

export interface IOrder {
  id: number;
  user_id: number;
  total_amount: number;
  created_at: Date;
}

export interface IOrderItem {
  id: number;
  order_id: number;
  product_id: string; 
  quantity: number;
  price: number;
}
