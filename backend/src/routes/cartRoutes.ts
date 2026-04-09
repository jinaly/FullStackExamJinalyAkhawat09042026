import { Router } from 'express';
import { CartController } from '../controllers/CartController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.use(authenticate);

router.get('/', CartController.getCart);
router.post('/item', CartController.addOrUpdateItem);
router.delete('/', CartController.clearCart);

export default router;
