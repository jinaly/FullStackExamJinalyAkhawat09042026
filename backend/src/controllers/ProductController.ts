import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';
import { MESSAGES } from '../utils/messages';

export const ProductController = {
  async listProducts(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const searchParam = req.query.search;
      const search = typeof searchParam === 'string' ? searchParam : undefined;

      const result = await ProductService.listProducts(page, limit, search);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: MESSAGES.PRODUCT_FETCH_FAILURE });
    }
  },

  async getProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id || Array.isArray(id)) {
  res.status(400).json({ error: 'Invalid product ID' });
  return;
}
      const product = await ProductService.getProduct(id);
      if (!product) {
        res.status(404).json({ error: MESSAGES.PRODUCT_NOT_FOUND });
        return;
      }
      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: MESSAGES.PRODUCT_FETCH_FAILURE });
    }
  },

  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const product = await ProductService.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: MESSAGES.PRODUCT_CREATE_FAILURE });
    }
  }
};
