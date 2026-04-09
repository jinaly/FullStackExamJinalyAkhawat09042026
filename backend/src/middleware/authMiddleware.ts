import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { MESSAGES } from '../utils/messages';

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ error: MESSAGES.ACCESS_DENIED });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecret123') as any;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: MESSAGES.INVALID_TOKEN });
  }
};
