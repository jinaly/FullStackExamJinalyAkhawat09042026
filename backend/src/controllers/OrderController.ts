import { Response } from 'express';
import { OrderService } from '../services/OrderService';
import { AuthRequest } from '../middleware/authMiddleware';
import { MESSAGES } from '../utils/messages';

export const OrderController = {
  async checkout(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: MESSAGES.UNAUTHORIZED });
        return;
      }

      const order = await OrderService.checkout(userId);
      res.status(201).json({ message: MESSAGES.ORDER_CHECKOUT_SUCCESS, order });
    } catch (error: any) {
      if (error.message === 'CART_EMPTY') {
        res.status(400).json({ error: MESSAGES.CART_EMPTY });
      } else if (error.message === 'ORDER_INVALID_PRODUCTS') {
        res.status(400).json({ error: MESSAGES.ORDER_INVALID_PRODUCTS });
      } else {
        console.error(error);
        res.status(500).json({ error: MESSAGES.ORDER_CHECKOUT_FAILURE });
      }
    }
  },

  async getOrderHistory(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: MESSAGES.UNAUTHORIZED });
        return;
      }

      const orders = await OrderService.getOrderHistory(userId);
      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: MESSAGES.ORDER_HISTORY_FAILURE });
    }
  }
};
