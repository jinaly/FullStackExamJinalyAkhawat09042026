import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.get('/', ProductController.listProducts);
router.get('/:id', ProductController.getProduct);
router.post('/', authenticate, ProductController.createProduct);

export default router;
