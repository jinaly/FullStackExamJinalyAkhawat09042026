import { pool } from '../config/db.sql';
import { Cart } from '../models/mongo/Cart';
import { Product } from '../models/mongo/Product';
import { Order } from '../models/sql/Order';

export const OrderService = {
  async checkout(userId: number) {
    const client = await pool.connect();
    try {
      const cart = await Cart.findOne({ userId });
      if (!cart || cart.items.length === 0) {
        throw new Error('CART_EMPTY');
      }

      let totalAmount = 0;
      const orderItemsData = [];
      
      for (const item of cart.items) {
        const product = await Product.findById(item.productId);
        if (!product) continue;
        
        const price = product.price;
        totalAmount += price * item.quantity;
        
        orderItemsData.push({
          productId: product._id.toString(),
          quantity: item.quantity,
          price: price
        });
      }

      if (totalAmount === 0 || orderItemsData.length === 0) {
        throw new Error('ORDER_INVALID_PRODUCTS');
      }

      await client.query('BEGIN');
      
      const orderRes = await client.query(
        'INSERT INTO orders (user_id, total_amount) VALUES ($1, $2) RETURNING *',
        [userId, totalAmount]
      );
      const newOrder = orderRes.rows[0];

      for (const item of orderItemsData) {
         await client.query(
           'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
           [newOrder.id, item.productId, item.quantity, item.price]
         );
      }

      await client.query('COMMIT');

      await Cart.findOneAndUpdate({ userId }, { items: [] });

      return newOrder;
    } catch (error) {
       await client.query('ROLLBACK');
       throw error;
    } finally {
       client.release();
    }
  },

  async getOrderHistory(userId: number) {
    return await Order.findByUserId(userId);
  }
};
