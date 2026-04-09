import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import { MESSAGES } from '../utils/messages';

export const AuthController = {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await AuthService.register(email, password);
      res.status(201).json({ message: MESSAGES.REGISTER_SUCCESS, user });
    } catch (error: any) {
      if (error.message === 'USER_EXISTS') {
        res.status(400).json({ error: MESSAGES.USER_EXISTS });
      } else {
        console.error(error);
        res.status(500).json({ error: MESSAGES.REGISTER_FAILURE });
      }
    }
  },

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const data = await AuthService.login(email, password);
      res.status(200).json({
        message: MESSAGES.LOGIN_SUCCESS,
        ...data
      });
    } catch (error: any) {
      if (error.message === 'INVALID_CREDENTIALS') {
        res.status(401).json({ error: MESSAGES.INVALID_CREDENTIALS });
      } else {
        console.error(error);
        res.status(500).json({ error: MESSAGES.LOGIN_FAILURE });
      }
    }
  }
};
