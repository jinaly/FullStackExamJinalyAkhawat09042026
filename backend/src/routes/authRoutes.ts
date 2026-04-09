import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { validate } from '../middleware/validate';
import { authSchema } from '../validations/AuthValidation';

const router = Router();

router.post('/register', validate(authSchema), AuthController.register);
router.post('/login', validate(authSchema), AuthController.login);

export default router;
