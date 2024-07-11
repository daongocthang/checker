import { Request, Response } from 'express';
import { findAll } from '../../controllers/category.controller';

export const getAll = async (_: Request, res: Response) => {
    const rows = await findAll();
    res.json(rows);
};
