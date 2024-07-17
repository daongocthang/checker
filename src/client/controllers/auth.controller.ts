import { Request, Response } from 'express';
import * as userController from '../../api/controllers/user.controller';
import { AuthenticationError } from '../../middlewares/error.middleware';
import * as authUtil from '../../utils/auth.util';

export const getSignIn = async (req: Request, res: Response) => {
    res.render('pages/signin');
};

export const postSignIn = async (req: Request, res: Response) => {
    const { username } = req.body;

    const user = await userController.findOne({ name: username });
    if (!user) {
        throw new AuthenticationError('User not found');
    }

    authUtil.generateToken(res, { id: user.id });
    res.status(201).json({
        id: user.id,
        name: user.name,
    });
};

export const postSignOut = (req: Request, res: Response) => {
    authUtil.clearToken(res);
    res.redirect('/auth/signin');
};
