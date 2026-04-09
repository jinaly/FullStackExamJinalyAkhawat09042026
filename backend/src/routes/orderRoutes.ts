import { Router } from 'express';
import { OrderController } from '../controllers/OrderController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.use(authenticate);

router.post('/checkout', OrderController.checkout);
router.get('/history', OrderController.getOrderHistory);

export default router;
