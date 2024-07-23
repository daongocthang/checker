import { Request, Response } from 'express';
import categoryService from '../../api/services/category.service';
import suggestionService from '../../api/services/suggestion.service';
import transService from '../../api/services/trans.service';
import { AuthenticationError } from '../../middlewares/error.middleware';

export const home = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const strptime: Date = new Date(new Date().setUTCHours(0, 0, 0, 0));
    if (!userId) {
        throw new AuthenticationError('User is not available');
    }

    if (!global.adapter) global.adapter = await suggestionService.findAll();

    const checked = await transService.count({
        updatedAt: {
            $gte: strptime,
        },
        userId: userId,
    });
    const total = await transService.count({
        updatedAt: {
            $gte: strptime,
        },
    });

    res.render('pages/index', { user: req.user, total, checked });
};

export const settings = async (req: Request, res: Response) => {
    const categoryCount = await categoryService.count();
    const suggestionCount = await suggestionService.count();
    const counter = { categories: categoryCount, products: 'Infinity', suggestions: suggestionCount };
    res.render('pages/settings', { user: req.user, counter });
};
