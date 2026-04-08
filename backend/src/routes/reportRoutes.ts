import { Router } from 'express';
import { getSqlReports, getMongoReports } from '../controllers/ReportController';

const router = Router();

router.get('/sql', getSqlReports);
router.get('/mongo', getMongoReports);

export default router;
