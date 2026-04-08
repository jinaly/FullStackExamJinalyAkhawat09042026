import { pool } from '../../config/db.sql';

export class Order {
  static async create(userId: number, totalAmount: number) {
    const result = await pool.query(
      'INSERT INTO orders (user_id, total_amount) VALUES ($1, $2) RETURNING id, user_id, total_amount, created_at',
      [userId, totalAmount]
    );
    return result.rows[0];
  }

  static async findByUserId(userId: number) {
    const result = await pool.query('SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
    return result.rows;
  }
}
