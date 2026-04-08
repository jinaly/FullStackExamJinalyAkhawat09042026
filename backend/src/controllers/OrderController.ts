import { Request, Response } from 'express';
import { Order } from '../models/sql/Order';
import { MESSAGES } from '../utils/messages';

export const getOrders = async (req: Request, res: Response) => {
    res.json({ message: MESSAGES.ORDER_FETCH_SUCCESS });
};

export const checkout = async (req: Request, res: Response) => {
    res.json({ message: MESSAGES.ORDER_CHECKOUT_SUCCESS });
};
