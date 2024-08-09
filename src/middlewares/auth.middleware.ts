import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { userService } from '../api/services';
import { AuthenticationError } from './error.middleware';

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            throw new AuthenticationError('Token not found');
        }

        const jwtSecret = process.env.JWT_SECRET || '';
        const decode = jwt.verify(token, jwtSecret) as JwtPayload;

        if (!decode || !decode.id) {
            throw new AuthenticationError('UserId not found');
        }

        const user = await userService.findById(decode.id);
        if (!user) {
            throw new AuthenticationError('User not found');
        }
        req.user = user;
        next();
    } catch (e) {
        if (req.xhr) res.status(401).send({ message: 'JWT Expired' });
        else res.redirect('/signin');
    }
};

export default authenticate;
