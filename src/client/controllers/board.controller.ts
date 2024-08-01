import { Request, Response } from 'express';
import categoryService from '../../api/services/category.service';
import suggestionService from '../../api/services/suggestion.service';
import transService from '../../api/services/trans.service';
import { AuthenticationError } from '../../middlewares/error.middleware';
import { currentDate } from '../../utils/time.uitl';

export const home = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new AuthenticationError('User is not available');
    }

    const checked = await transService.count({
        updatedAt: {
            $gte: currentDate(),
        },
        userId: userId,
    });
    const total = await transService.count({
        createdAt: {
            $gte: currentDate(),
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
