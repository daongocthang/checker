import { Request, Response } from 'express';
import orderDal, { toOrderAttrs } from '../../db2/order.dal';
import { AuthenticationError, BadRequestError } from '../../middlewares/error.middleware';
import { chunks } from '../../utils/array.util';
import transService, { readAndFitler, updateExpiredAll } from '../services/trans.service';
import { API } from '../types';
import { handleSingleUpload } from './handlers';

class TransController {
    bulkCreate = async (req: Request, res: Response) => {
        const userId = req.user?.id;
        if (!userId) {
            throw new AuthenticationError('User is not available');
        }

        const cb: API.FileCallback = async (file: Express.Multer.File) => {
            const rows = await readAndFitler(file.filename);
            if (rows.length == 0) {
                throw new Error();
            }

            const updatedRows = await updateExpiredAll(rows);

            await Promise.all(chunks(updatedRows, 500).map((c) => transService.bulkCreate(c)));

            const strptime = new Date(new Date().setUTCHours(0, 0, 0, 0));
            res.status(200).send({
                message: 'Upload the file complete',
                count: await transService.count({
                    updatedAt: { $gte: strptime },
                }),
            });
        };

        await handleSingleUpload(req, res, cb);
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
        const strptime: Date = new Date(new Date().setUTCHours(0, 0, 0, 0));

        const data = await transService.findOne({
            updatedAt: {
                $gte: strptime,
            },
            serial,
        });
        if (!data) throw new Error('Not found');

        data.userId = userId;
        data.suggestion = data.expired ? 'ĐỔI' : 'TEST';
        await transService.update(data.id, data);

        const checked = await transService.count({
            updatedAt: {
                $gte: strptime,
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

        const strptime = new Date(new Date().setUTCHours(0, 0, 0, 0));
        const data = await transService.findAll({
            updatedAt: {
                $gte: strptime,
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
}

export default new TransController();
