import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { HttpStatus } from '../../constants';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const sessionData = req.session as CookieSessionInterfaces.CookieSessionObject;
    const token = sessionData.token;
    if (!token) {
        res.status(HttpStatus.FORBIDDEN).send({ message: 'No token provided' });
    }

    jwt.verify(token, 'secret-key', (decode: Object) => {});
};
