import readXlsxFile from 'read-excel-file/node';
import * as categoryDAL from '../../db/dal/category.dal';
import { CategoryAttrs } from '../../db/models/category.model';
import { fromFile } from '../../utils';
import { CategoryMapObject } from '../config';
import { MapOptions } from '../types';
import * as mapper from './mapper';

export const bulkCreate = async (filename: string) => {
    const { rows } = await readXlsxFile<CategoryAttrs>(fromFile(filename), new MapOptions(CategoryMapObject));
    const results = await categoryDAL.bulkCreate(rows);
    return results.map((r) => mapper.toCategory(r));
};

export const create = async (payload: CategoryAttrs) => {
    return mapper.toCategory(await categoryDAL.create(payload));
};

export const update = async (model: string, payload: CategoryAttrs) => {
    return mapper.toCategory(await categoryDAL.update(model, payload));
};

export const removeAll = async () => {
    return await categoryDAL.removeAll();
};

export const remove = async (model: string) => {
    return await categoryDAL.removeByModel(model);
};

export const findAll = async () => {
    const results = await categoryDAL.findAll();
    return results.map((r) => mapper.toCategory(r));
};
