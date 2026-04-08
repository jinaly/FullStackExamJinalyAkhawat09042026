import { Request, Response } from 'express';
import Product from '../models/mongo/Product';
import { MESSAGES } from '../utils/messages';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find().limit(10);
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: MESSAGES.PRODUCT_FETCH_FAILURE });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: MESSAGES.PRODUCT_NOT_FOUND });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: MESSAGES.SERVER_ERROR });
    }
};
