import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import * as userController from '../api/controllers/user.controller';
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

        const user = await userController.findById(decode.id);
        if (!user) {
            throw new AuthenticationError('User not found');
        }
        req.user = user;
        next();
    } catch (e) {
        res.redirect('/auth/signin');
    }
};

export default authenticate;
