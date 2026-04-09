import mongoose from 'mongoose';
import { connectMongo } from '../config/db.mongo';
import { Product } from '../models/mongo/Product';

const seedProducts = [
  {
    name: 'Wireless Noise-Canceling Headphones',
    description: 'Experience premium sound quality with incredible noise-canceling technology.',
    price: 199.99,
    category: 'Electronics',
    stock: 50
  },
  {
    name: 'Ergonomic Office Chair',
    description: 'A comfortable mesh back office chair with lumbar support and adjustable arms.',
    price: 145.00,
    category: 'Furniture',
    stock: 120
  },
  {
    name: '4K Ultra HD Smart TV',
    description: 'Immersive colors and high definition perfectly suited for your living room.',
    price: 399.50,
    category: 'Electronics',
    stock: 15
  },
  {
    name: 'Organic Cotton T-Shirt',
    description: 'Soft, reliable, everyday t-shirt made responsibly.',
    price: 25.00,
    category: 'Apparel',
    stock: 200
  },
  {
    name: 'Bluetooth Portable Speaker',
    description: 'Compact speaker with deep bass and long-lasting battery life.',
    price: 59.99,
    category: 'Electronics',
    stock: 80
  },
  {
    name: 'Gaming Mechanical Keyboard',
    description: 'RGB backlit keyboard with tactile switches for fast typing and gaming.',
    price: 89.99,
    category: 'Electronics',
    stock: 40
  },
  {
    name: 'Stainless Steel Water Bottle',
    description: 'Keeps beverages cold for 24 hours and hot for 12 hours.',
    price: 19.99,
    category: 'Home & Kitchen',
    stock: 150
  },
  {
    name: 'Men’s Running Shoes',
    description: 'Lightweight running shoes designed for comfort and durability.',
    price: 75.50,
    category: 'Footwear',
    stock: 60
  },
  {
    name: 'Women’s Handbag',
    description: 'Stylish handbag with multiple compartments and premium finish.',
    price: 55.00,
    category: 'Apparel',
    stock: 70
  },
  {
    name: 'LED Desk Lamp',
    description: 'Energy-efficient desk lamp with adjustable brightness levels.',
    price: 29.99,
    category: 'Furniture',
    stock: 90
  },
  {
    name: 'Smart Fitness Band',
    description: 'Track your steps, heart rate, and sleep with this smart band.',
    price: 49.99,
    category: 'Electronics',
    stock: 110
  },
  {
    name: 'Microwave Oven',
    description: 'Quick and efficient cooking with multiple preset modes.',
    price: 120.00,
    category: 'Home Appliances',
    stock: 25
  },
  {
    name: 'Wooden Coffee Table',
    description: 'Modern coffee table made with high-quality engineered wood.',
    price: 150.00,
    category: 'Furniture',
    stock: 30
  },
  {
    name: 'Backpack Laptop Bag',
    description: 'Durable and spacious backpack with laptop compartment.',
    price: 35.00,
    category: 'Accessories',
    stock: 100
  },
  {
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision tracking.',
    price: 15.99,
    category: 'Electronics',
    stock: 200
  },
  {
    name: 'Air Fryer',
    description: 'Healthy cooking with little to no oil using rapid air technology.',
    price: 99.00,
    category: 'Home Appliances',
    stock: 35
  }
];

const seedData = async () => {
  await connectMongo();
  await Product.deleteMany({}); 
  await Product.insertMany(seedProducts);
  console.log('Database successfully seeded with Initial Products!');
  mongoose.connection.close();
};

seedData();
