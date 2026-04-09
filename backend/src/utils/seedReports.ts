import { pool } from '../config/db.sql';
import bcrypt from 'bcrypt';

async function seed() {
  console.log('Seeding report data...');
  
  const users = [
    ['jane@example.com', await bcrypt.hash('password123', 10)],
    ['bob@example.com', await bcrypt.hash('password123', 10)],
    ['alice@example.com', await bcrypt.hash('password123', 10)],
  ];

  for (const [email, hash] of users) {
    await pool.query('INSERT INTO users (email, password_hash) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING', [email, hash]);
  }

  const userRes = await pool.query('SELECT id FROM users');
  const userIds = userRes.rows.map(r => r.id);

  const now = new Date();
  const orders = [];

  for (let i = 0; i < 15; i++) {
    const userId = userIds[Math.floor(Math.random() * userIds.length)];
    const amount = Math.floor(Math.random() * 200) + 20;
    const date = new Date(now);
    date.setDate(date.getDate() - Math.floor(Math.random() * 10)); 
    
    orders.push([userId, amount, date]);
  }

  for (const [userId, amount, date] of orders) {
    await pool.query('INSERT INTO orders (user_id, total_amount, created_at) VALUES ($1, $2, $3)', [userId, amount, date]);
  }

  console.log('Successfully seeded more orders/users for reports.');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
