import mongoose, { Schema, Document } from 'mongoose';

export interface ICartItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
}

export interface ICart extends Document {
  userId: number; 
  items: ICartItem[];
}

const CartItemSchema = new Schema<ICartItem>({
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number }
}, { _id: false });

const CartSchema: Schema = new Schema({
  userId: { type: Number },
  items: [CartItemSchema]
}, { timestamps: true });

export const Cart = mongoose.model<ICart>('Cart', CartSchema);
