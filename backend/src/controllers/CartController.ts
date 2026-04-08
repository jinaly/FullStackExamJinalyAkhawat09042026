import { Request, Response } from 'express';
import { MESSAGES } from '../utils/messages';

export const getCart = async (req: Request, res: Response) => {
    res.json({ message: MESSAGES.CART_FETCH_SUCCESS });
};

export const addToCart = async (req: Request, res: Response) => {
    res.json({ message: MESSAGES.CART_ADD_SUCCESS });
};
