import { Order } from '../models/sql/Order';
import { Product } from '../models/mongo/Product';
import { pool } from '../config/db.sql';

export const ReportService = {
  async getReports() {
    const dailyRevenue = await Order.getDailyRevenue();
    const topSpenders = await Order.getTopSpenders();
    
    const orderItemsRes = await pool.query('SELECT product_id, quantity, price FROM order_items');
    const orderItems = orderItemsRes.rows;

    const products = await Product.find({}, 'category');
    const productMap: Record<string, string> = {};
    products.forEach(p => {
      productMap[p._id.toString()] = p.category;
    });

    const categorySales: Record<string, { count: number; revenue: number }> = {};
    
    orderItems.forEach(item => {
      const category = productMap[item.product_id] || 'Unknown';
      if (!categorySales[category]) {
        categorySales[category] = { count: 0, revenue: 0 };
      }
      categorySales[category].count += Number(item.quantity);
      categorySales[category].revenue += Number(item.price) * Number(item.quantity);
    });

    const productsByCategory = Object.entries(categorySales).map(([category, data]) => ({
      _id: category,
      count: data.count,
      avgPrice: data.revenue / data.count 
    })).sort((a, b) => b.count - a.count);

    return {
      dailyRevenue,
      topSpenders,
      productsByCategory: productsByCategory || []
    };
  }
};
