import { Request, Response } from 'express';
import categoryService from '../../api/services/category.service';
import productService from '../../api/services/product.service';

export const home = (req: Request, res: Response) => {
    res.render('pages/index', { user: req.user });
};

export const settings = async (req: Request, res: Response) => {
    const categoryCount = await categoryService.count();
    const productCount = await productService.count();
    const counter = { categories: categoryCount.toLocaleString(), products: productCount.toLocaleString() };
    res.render('pages/settings', { user: req.user, counter });
};
