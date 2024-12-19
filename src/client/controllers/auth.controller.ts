import { Request, Response } from 'express';
import { userService } from '../../api/services';
import { AuthenticationError } from '../../middlewares/error.middleware';
import * as authUtil from '../../utils/auth.util';

export const signIn = async (req: Request, res: Response) => {
    res.render('pages/signin');
};

export const sign = async (req: Request, res: Response) => {
    const { username } = req.body;
    if (!username) {
        throw new AuthenticationError('Must not be empty');
    }

    const user = await userService.findOne({ name: username });
    if (!user) {
        throw new AuthenticationError('Not available');
    }

    authUtil.generateToken(res, { id: user.id });
    res.status(201).json({
        id: user.id,
        name: user.name,
    });
};

export const signOut = (req: Request, res: Response) => {
    authUtil.clearToken(res);
    res.redirect('/signin');
};
