import { Router } from 'express';
import { getOrders, checkout } from '../controllers/OrderController';

const router = Router();

router.get('/', getOrders);
router.post('/checkout', checkout);

export default router;
