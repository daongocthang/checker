import readXlsxFile from 'read-excel-file/node';
import { WhereOptions } from 'sequelize';
import * as productDAL from '../../db/dal/product.dal';
import { ProductAttrs } from '../../db/models/porduct.model';
import { chunks, fromFile } from '../../utils/stream.util';
import { ProductMapObject } from '../config';
import { MapOptions, Product } from '../types';
import * as mapper from './mapper';

export const bulkCreate = async (filename: string) => {
    const { rows } = await readXlsxFile<ProductAttrs>(fromFile(filename), new MapOptions(ProductMapObject));
    await Promise.all(chunks(rows, 500).map((c) => productDAL.bulkCreate(c)));
};

export const create = async (payload: ProductAttrs) => {
    return mapper.toProduct(await productDAL.create(payload));
};

export const update = async (id: number, payload: ProductAttrs) => {
    return mapper.toProduct(await productDAL.update(id, payload));
};

export const removeAll = async (constraints?: WhereOptions) => {
    return await productDAL.removeAll(constraints);
};

export const remove = async (id: number) => {
    return await productDAL.remove(id);
};

export const getById = async (id: number) => {
    const result = await productDAL.getById(id);
    if (result) {
        return mapper.toProduct(result);
    }
    return null;
};

export const getAll = async (constraints?: WhereOptions): Promise<Product[]> => {
    const results = await productDAL.getAll(constraints);
    return results.map((r) => mapper.toProduct(r));
};
