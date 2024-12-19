import { NextFunction, Request, Response } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err.stack);

    if (err instanceof AuthenticationError) {
        return res.status(401).json({ message: err.message || 'UNAUTHORIZED' });
    } else if (err instanceof BadRequestError) {
        return res.status(400).json({ message: err.message || 'BAD_REQUEST' });
    } else {
        return res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
    }
};

export class AuthenticationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AuthenticationError';
    }
}

export class BadRequestError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'BadRequestError';
    }
}
