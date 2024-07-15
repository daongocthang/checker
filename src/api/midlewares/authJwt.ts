import { NextFunction, Request, Response } from 'express';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.session['token'];
};
