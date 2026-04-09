import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const connectSQL = async () => {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('PostgreSQL (Neon) connected successfully at:', res.rows[0].now);
    } catch (error) {
        console.error('PostgreSQL connection error:', error);
    }
}