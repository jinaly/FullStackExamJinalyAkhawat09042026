import { Router } from 'express';
import { ReportController } from '../controllers/ReportController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticate, ReportController.getReports);

export default router;
