import { Request, Response } from 'express';
import { ReportService } from '../services/ReportService';
import { MESSAGES } from '../utils/messages';

export const ReportController = {
  async getReports(req: Request, res: Response): Promise<void> {
    try {
      const reports = await ReportService.getReports();
      res.status(200).json(reports);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: MESSAGES.REPORT_SQL_FAILURE });
    }
  }
};
