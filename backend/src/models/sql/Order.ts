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

  static async getDailyRevenue(): Promise<any[]> {
    const res = await pool.query(`
      SELECT DATE(created_at) as date, SUM(total_amount) as revenue
      FROM orders
      GROUP BY DATE(created_at)
      ORDER BY date DESC
      LIMIT 7
    `);
    return res.rows;
  }

  static async getTopSpenders(): Promise<any[]> {
    const res = await pool.query(`
      SELECT user_id, SUM(total_amount) as total_spent
      FROM orders
      GROUP BY user_id
      ORDER BY total_spent DESC
      LIMIT 3
    `);
    return res.rows;
  }
}
