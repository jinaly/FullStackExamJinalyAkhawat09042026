import mongoose, { Schema } from 'mongoose';
import { IProduct } from '../../types';

const ProductSchema: Schema = new Schema({
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  category: { type: String},
  stock: { type: Number, default: 0 },
}, { timestamps: true });

ProductSchema.index({ name: 'text', category: 'text' });

export default mongoose.model<IProduct>('Product', ProductSchema);
