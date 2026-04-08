import { Request, Response } from 'express';
import { pool } from '../config/db.sql';
import Product from '../models/mongo/Product';
import { MESSAGES } from '../utils/messages';

export const getSqlReports = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT user_id, SUM(total_amount) as total_spent FROM orders GROUP BY user_id ORDER BY total_spent DESC LIMIT 3');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: MESSAGES.REPORT_SQL_FAILURE });
    }
};

export const getMongoReports = async (req: Request, res: Response) => {
    try {
        const categoryStats = await Product.aggregate([
            { $group: { _id: '$category', totalStock: { $sum: '$stock' }, averagePrice: { $avg: '$price' } } }
        ]);
        res.json(categoryStats);
    } catch (err) {
        res.status(500).json({ error: MESSAGES.REPORT_MONGO_FAILURE });
    }
};
