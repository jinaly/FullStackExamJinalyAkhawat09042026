import { pool } from '../../config/db.sql';

export class OrderItem {
  static async create(orderId: number, productId: string, quantity: number, price: number) {
    const result = await pool.query(
      'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING id',
      [orderId, productId, quantity, price]
    );
    return result.rows[0];
  }

  static async findByOrderId(orderId: number) {
    const result = await pool.query('SELECT * FROM order_items WHERE order_id = $1', [orderId]);
    return result.rows;
  }
}
