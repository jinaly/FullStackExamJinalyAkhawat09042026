import mongoose from 'mongoose';
import { Product } from '../models/mongo/Product';

export const ProductService = {
  async listProducts(page: number, limit: number, search?: string) {
    const query: any = {};
    if (search) {
      query.$text = { $search: search };
    }

    const skip = (page - 1) * limit;

    const products = await Product.find(query)
      .skip(skip)
      .limit(limit)
      .sort(search ? { score: { $meta: 'textScore' } } : { createdAt: -1 });

    const total = await Product.countDocuments(query);

    return {
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  },

  async getProduct(id: string) {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }

    return Product.findById(id);
  },

  async createProduct(data: any) {
    const product = new Product(data);
    return await product.save();
  }
};
