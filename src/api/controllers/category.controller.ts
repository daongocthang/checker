import readXlsxFile from 'read-excel-file/node';
import * as categoryDAL from '../../db/dal/category.dal';
import { CategoryAttrs } from '../../db/models/category.model';
import { fromFile } from '../../utils';
import { CategoryMapObject } from '../config';
import { MapOptions } from '../types';

export const bulkCreate = async (filename: string) => {
    const { rows } = await readXlsxFile<CategoryAttrs>(fromFile(filename), new MapOptions(CategoryMapObject));
    console.log(rows);

    categoryDAL.bulkCreate(rows);
};

export const findAll = async () => {
    return await categoryDAL.findAll();
};
