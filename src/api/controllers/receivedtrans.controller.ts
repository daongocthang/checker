import readXlsxFile from 'read-excel-file/node';
import * as receivedTransDAL from '../../db/dal/receivedtrans.dal';
import { ReceivedTransAttrs } from '../../db/models/receivedtrans.model';
import { fromFile } from '../../utils';
import { PATTERNS, ReceivedTransMapObject } from '../config';
import { MapOptions } from '../types';

export const bulkCreate = async (filename: string) => {
    const { rows } = await readXlsxFile<ReceivedTransAttrs>(
        fromFile(filename),
        new MapOptions(ReceivedTransMapObject, 10),
    );
    const filteredRows = rows.filter((row) => {
        PATTERNS.includes(row.status as string);
    });

    return await receivedTransDAL.bulkCreate(filteredRows);
};

export const getBySerial = async () => {
    return await receivedTransDAL.findAll();
};
export const getByUser = async () => {};

export const removeAll = async (constraints?: object) => {
    return await receivedTransDAL.removeAll(constraints);
};
