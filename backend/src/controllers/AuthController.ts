import { Request, Response } from 'express';
import { User } from '../models/sql/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { MESSAGES } from '../utils/messages';

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        res.json({ message: MESSAGES.REGISTER_SUCCESS });
    } catch (err) {
        res.status(500).json({ error: MESSAGES.REGISTER_FAILURE });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        res.json({ message: MESSAGES.LOGIN_SUCCESS, token: 'fake-jwt-token' });
    } catch (err) {
        res.status(500).json({ error: MESSAGES.LOGIN_FAILURE });
    }
};
