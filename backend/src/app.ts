import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import cartRoutes from './routes/cartRoutes';
import orderRoutes from './routes/orderRoutes';
import reportRoutes from './routes/reportRoutes';

const app: Application = express();

app.use(cors());
app.use(express.json());

import { MESSAGES } from './utils/messages';

app.get('/', (req: Request, res: Response) => {
    res.json({ message: MESSAGES.API_WELCOME });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reports', reportRoutes);

export default app;
