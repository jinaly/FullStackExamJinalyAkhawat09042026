import { Cart } from '../models/mongo/Cart';

export const CartService = {
  async getCart(userId: number) {
    let cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
    }
    return cart;
  },

  async addOrUpdateItem(userId: number, productId: string, quantity: number) {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (existingItemIndex > -1) {
      if (quantity <= 0) {
        cart.items.splice(existingItemIndex, 1);
      } else {
        cart.items[existingItemIndex].quantity = quantity;
      }
    } else {
      if (quantity > 0) {
        cart.items.push({ productId, quantity } as any);
      }
    }

    await cart.save();
    return await Cart.findById(cart._id).populate('items.productId');
  },

  async clearCart(userId: number) {
    return await Cart.findOneAndUpdate({ userId }, { items: [] });
  }
};
