import { Response } from 'express';
import jwt from 'jsonwebtoken';

export const generateToken = (res: Response, payload: string | object) => {
    const jwtSecret = process.env.JWT_SECRET || '';
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '12h' });

    res.cookie('jwt', token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV !== 'development',
        maxAge: 12 * 60 * 60 * 1000,
    });
};

export const clearToken = (res: Response) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
};
