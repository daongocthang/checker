import { Request, Response } from 'express';
import fs from 'fs';
import moment from 'moment';
import path from 'path';
import orderDal, { toOrderAttrs } from '../../db2/order.dal';
import { AuthenticationError, BadRequestError } from '../../middlewares/error.middleware';
import { isNumeric } from '../../utils';
import { currentDate, currentTimeMillis } from '../../utils/time.uitl';
import { UPLOADS_DIR } from '../config';
import transService, { exportXlsxFile, readAndFitler, updateAllSuggestions, updateExpiredAll } from '../services/trans.service';
import { API } from '../types';
import { handleSingleUpload } from './handlers';

class TransController {
    upload = async (req: Request, res: Response) => {
        const userId = req.user?.id;
        if (!userId) {
            throw new AuthenticationError('User is not available');
        }

        const startIimeMillis = currentTimeMillis();

        const cb: API.FileCallback = async (file: Express.Multer.File) => {
            const rows = await readAndFitler(file.filename);
            if (rows.length == 0) {
                throw new Error();
            }

            // TODAO: make suggestion
            const updated = await updateAllSuggestions(await updateExpiredAll(rows));
            await transService.bulkCreate(updated);

            res.status(200).send({
                message: 'Upload the file complete',
                count: await transService.count({
                    createdAt: { $gte: currentDate() },
                }),
            });
        };

        await handleSingleUpload(req, res, cb);
        console.log('SPENT_TIME_MILLS: ' + (currentTimeMillis() - startIimeMillis).toLocaleString());
    };

    findAndUpdate = async (req: Request, res: Response) => {
        const { serial } = req.body;
        if (!serial) {
            throw new BadRequestError('Not found');
        }
        const userId = req.user?.id;
        if (!userId) {
            throw new AuthenticationError('User is not available');
        }

        const data = await transService.findOne({
            serial,
        });
        if (!data) throw new Error('Not found');

        data.userId = userId;
        data.visitedAt = new Date();
        await transService.update(data.id, data);

        const checked = await transService.count({
            visitedAt: {
                $gte: currentDate(),
            },
            userId: userId,
        });

        res.status(200).send({ data, checked });
    };

    deleteIfNonUser = async (req: Request, res: Response) => {
        const resultOK = await transService.remove({
            userId: { $eq: null },
        });
        if (!resultOK) {
            throw new Error('Failed to delete');
        }
        res.status(200).send({ message: 'Deleted successfully' });
    };

    migrate = async (req: Request, res: Response) => {
        const userId = req.user?.id;
        if (!userId) {
            throw new AuthenticationError('User is not available');
        }

        const data = await transService.findAll({
            visitedAt: {
                $gte: currentDate(),
            },
            userId,
        });
        if (data.length == 0) {
            throw new Error('Data not found');
        }

        const orders = data.map((row) => toOrderAttrs(row));
        const results = await orderDal.bulkCreate(orders);
        if (results.length == 0) {
            throw new Error('Data Migration failed');
        }

        res.status(200).send({ message: 'Data migration successed' });
    };

    download = async (req: Request, res: Response) => {
        const rows = await transService.findAll({
            updatedAt: {
                $gte: moment().subtract(3, 'days').toDate(),
            },
        });

        if (rows.length == 0) {
            throw new Error('No Data Found');
        }

        if (!fs.existsSync(UPLOADS_DIR)) {
            fs.mkdirSync(UPLOADS_DIR);
        }
        const filePath = path.join(UPLOADS_DIR, `${Date.now()}-DeXuat.xlsx`);
        await exportXlsxFile(rows, filePath);

        res.download(filePath, (er) => {
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        });
    };

    suggest = async (req: Request, res: Response) => {
        const inverse = JSON.parse(req.body.inverse);
        let count = req.body.count;

        const rows = await transService.findAll({
            createdAt: {
                $gte: moment().subtract(3, 'days').toDate(),
            },
        });

        if (rows.length == 0) {
            throw new Error('No data found');
        }

        count = isNumeric(count) ? parseInt(count) : undefined;
        const payload = await updateAllSuggestions(rows, count, inverse);
        await Promise.all(payload.map((x) => transService.update(x.id, x)));

        res.status(200).send({ message: 'Updated all suggestions successfully.' });
    };
}

export default new TransController();
