import { Request, Response, Router } from 'express';
import { Err, HttpStatus } from '../../constants';
import '../../types';
import readXlsxFile, { Row } from 'read-excel-file/node';
import fs from 'fs';
import { xlUpload } from '../midlewares/upload';
import path from 'path';
import { Warranty } from '../../types/warranty.types';
const productRouter = Router();

const map = {
    MODEL: 'model',
    SERIAL: 'serial',
};

productRouter.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Hello' });
});

productRouter.post('/', xlUpload.single('file'), async (req: Request, res: Response) => {});

export default productRouter;
