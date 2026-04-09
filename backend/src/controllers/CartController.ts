import { Response } from 'express';
import { CartService } from '../services/CartService';
import { AuthRequest } from '../middleware/authMiddleware';
import { MESSAGES } from '../utils/messages';

export const CartController = {
  async getCart(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: MESSAGES.UNAUTHORIZED });
        return;
      }
      const cart = await CartService.getCart(userId);
      res.status(200).json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: MESSAGES.SERVER_ERROR });
    }
  },

  async addOrUpdateItem(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: MESSAGES.UNAUTHORIZED });
        return;
      }
      const { productId, quantity } = req.body;
      const cart = await CartService.addOrUpdateItem(userId, productId, quantity);
      res.status(200).json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: MESSAGES.CART_UPDATE_FAILURE });
    }
  },

  async clearCart(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: MESSAGES.UNAUTHORIZED });
        return;
      }
      await CartService.clearCart(userId);
      res.status(200).json({ message: MESSAGES.CART_CLEARED });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: MESSAGES.CART_CLEAR_FAILURE });
    }
  }
};
