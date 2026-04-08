import { Router } from 'express';
import { getCart, addToCart } from '../controllers/CartController';

const router = Router();

router.get('/', getCart);
router.post('/', addToCart);

export default router;
