import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
}

const ProductSchema: Schema = new Schema({
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  category: { type: String },
  stock: { type: Number },
}, { timestamps: true });

ProductSchema.index({ name: 'text', category: 'text' });

export const Product = mongoose.model<IProduct>('Product', ProductSchema);
