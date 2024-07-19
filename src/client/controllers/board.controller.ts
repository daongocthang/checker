import { Request, Response } from 'express';

export const getBoard = (req: Request, res: Response) => {
    res.render('pages/index', { user: req.user });
};
