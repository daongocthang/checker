import readXlsxFile from 'read-excel-file/node';
import * as categoryDAL from '../../db/dal/category.dal';
import { CategoryAttrs } from '../../db/models/category.model';
import { fromFile } from '../../utils';
import { CategoryMapObject } from '../config';
import { MapOptions } from '../types';

export const bulkCreate = async (filename: string) => {
    const { rows } = await readXlsxFile<CategoryAttrs>(fromFile(filename), new MapOptions(CategoryMapObject));
    return await categoryDAL.bulkCreate(rows);
};

export const create = async (payload: CategoryAttrs) => {
    return await categoryDAL.create(payload);
};

export const update = async (model: string, payload: CategoryAttrs) => {
    return await categoryDAL.update(model, payload);
};

export const removeAll = async () => {
    return await categoryDAL.removeAll();
};

export const remove = async (model: string) => {
    return await categoryDAL.removeByModel(model);
};

export const findAll = async () => {
    return await categoryDAL.findAll();
};
