import readXlsxFile from 'read-excel-file/node';
import { WhereOptions } from 'sequelize';
import * as categoryDAL from '../../db/dal/category.dal';
import * as productDAL from '../../db/dal/product.dal';
import * as receivedTransDAL from '../../db/dal/receivedtrans.dal';
import { ProductResult } from '../../db/models';
import { ReceivedTransAttrs } from '../../db/models/receivedtrans.model';
import { chunks, fromFile } from '../../utils/stream.util';
import { PATTERNS, ReceivedTransMapObject } from '../config';
import * as mapper from '../services/mapper';
import { MapOptions, ReceivedTrans } from '../types';

export const bulkCreate = async (filename: string) => {
    const { rows } = await readXlsxFile<ReceivedTransAttrs>(
        fromFile(filename),
        new MapOptions(ReceivedTransMapObject, 10),
    );

    const filteredRows = rows.filter((row) => PATTERNS.indexOf(row.status as string) !== -1);
    await Promise.all(chunks(filteredRows, 500).map((chunk) => receivedTransDAL.bulkCreate(chunk)));
};

export const update = async (ticket: string, payload: ReceivedTransAttrs): Promise<ReceivedTrans> => {
    return mapper.toReceivedTrans(await receivedTransDAL.update(ticket, payload));
};

export const isExpired = async (serial: string, model: string): Promise<boolean> => {
    const categories = await categoryDAL.findAll();
    const cat = categories.find((cat) => model.includes(cat.model));
    if (cat === undefined) {
        return true;
    }

    if (!cat.withSerial) return false;

    let result = await productDAL.findOne({ model: cat.model });
    if (result === null) {
        throw new Error('Not found any product');
    }

    const pattern = result as unknown as ProductResult;

    const len = pattern.serial.length;
    const available = await productDAL.findOne({
        model: cat.model,
        serial: serial.substring(0, len),
    });
    return available === null;
};

export const findOne = async (constraints?: WhereOptions): Promise<ReceivedTrans | null> => {
    const result = await receivedTransDAL.findOne(constraints);
    if (result) {
        return mapper.toReceivedTrans(result);
    }

    return null;
};

export const findAll = async (constraints?: WhereOptions): Promise<ReceivedTrans[]> => {
    const results = await receivedTransDAL.findAll(constraints);
    return results.map((r) => mapper.toReceivedTrans(r));
};

export const removeAll = async (constraints?: WhereOptions) => {
    return await receivedTransDAL.removeAll(constraints);
};
