import readXlsxFile from 'read-excel-file/node';
import { WhereOptions } from 'sequelize';
import transDal from '../../db/dal/trans.dal';
import { TransAttrs, TransResult } from '../../db/models/trans.model';
import { chunks } from '../../utils/array.util';
import { fromFile } from '../../utils/stream.util';
import { PATTERNS, TransMapObject } from '../config';
import { CRUD, MapOptions, Warranty as wnty } from '../types';
import categoryService from './category.service';
import mapper from './mapper';
import productService from './product.service';

class TransService implements CRUD<TransAttrs, wnty.Transaction> {
    async bulkCreate(payload: TransAttrs[]): Promise<void> {
        await Promise.all(chunks(payload, 500).map((chunk) => transDal.bulkCreate(chunk)));
    }
    async count(constraints?: WhereOptions): Promise<number> {
        return await transDal.count(constraints);
    }
    async create(payload: TransAttrs): Promise<wnty.Transaction> {
        return mapper.toTransaction(await transDal.create(payload));
    }
    async update(id: string, payload: TransAttrs): Promise<wnty.Transaction> {
        return mapper.toTransaction(await transDal.update(id, payload));
    }
    async findById(id: string): Promise<wnty.Transaction | null> {
        const result = await transDal.findById(id);
        if (!result) return null;

        return mapper.toTransaction(result);
    }
    async findOne(constraints?: WhereOptions): Promise<wnty.Transaction | null> {
        const result = await transDal.findOne(constraints);
        if (!result) return null;

        return mapper.toTransaction(result);
    }
    async findAll(constraints?: WhereOptions): Promise<wnty.Transaction[]> {
        const results = await transDal.findAll(constraints);
        return results.map((r) => mapper.toTransaction(r));
    }
    async remove(constraints?: WhereOptions): Promise<boolean> {
        return await transDal.remove(constraints);
    }
}

const transService = new TransService();

const findCategory = (model: string, categories: wnty.Category[]): wnty.Category | undefined => {
    return categories.find((cat) => model.includes(cat.model));
};

const checkExpired = async (trans: wnty.Transaction, categories: wnty.Category[]): Promise<wnty.Transaction> => {
    trans.expired = await isExpired(trans.serial, trans.model, categories);
    return trans;
};

export const readAndFitler = async (filename: string): Promise<wnty.Transaction[]> => {
    const { rows } = await readXlsxFile<TransAttrs>(fromFile(filename), new MapOptions(TransMapObject, 10));
    const filtered = rows.filter((row) => PATTERNS.indexOf(row.status as string) !== -1);
    return filtered.map((r) => mapper.toTransaction(r as TransResult));
};

export const isExpired = async (serial: string, model: string, categories: wnty.Category[]): Promise<boolean> => {
    const cat = findCategory(model, categories);
    if (cat === undefined) {
        return true;
    }

    if (!cat.withSerial || cat.size === 0) return false; // still under warranty

    const count = await productService.count({
        model: cat.model,
        serial: serial.substring(0, cat.size),
    });

    return count === 0;
};

export const updateExpiredAll = async (payload: wnty.Transaction[]): Promise<wnty.Transaction[]> => {
    const categories = await categoryService.findAll();
    const checkedTransArray = await Promise.all(payload.map((row) => checkExpired(row, categories)));
    return checkedTransArray;
};

export default transService;
