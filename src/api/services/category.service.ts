import readXlsxFile from 'read-excel-file/node';
import { WhereOptions } from 'sequelize';
import categoryDAL from '../../db/dal/category.dal';
import { CategoryAttrs } from '../../db/models/category.model';
import { fromFile } from '../../utils/stream.util';
import { CategoryMapObject } from '../config';
import { Category, CRUD, MapOptions } from '../types';
import mapper from './mapper';

class CategoryService implements CRUD<CategoryAttrs, Category> {
    async bulkCreate(filename: string): Promise<void> {
        const { rows } = await readXlsxFile<CategoryAttrs>(fromFile(filename), new MapOptions(CategoryMapObject));
        await categoryDAL.bulkCreate(rows);
    }
    async create(payload: CategoryAttrs): Promise<Category> {
        return await categoryDAL.create(payload);
    }
    async update(id: number, payload: CategoryAttrs): Promise<Category> {
        return mapper.toCategory(await categoryDAL.update(id, payload));
    }
    async findById(id: number): Promise<Category | null> {
        const result = await categoryDAL.findById(id);
        if (!result) {
            return null;
        }
        return mapper.toCategory(result);
    }
    async findOne(constraints?: WhereOptions): Promise<Category | null> {
        const result = await categoryDAL.findOne(constraints);
        if (!result) {
            return null;
        }
        return mapper.toCategory(result);
    }
    async findAll(constraints?: WhereOptions): Promise<Category[]> {
        const results = await categoryDAL.findAll(constraints);
        return results.map((r) => mapper.toCategory(r));
    }
    async remove(id: number): Promise<boolean> {
        return await categoryDAL.remove(id);
    }
    async removeAll(constraints?: WhereOptions): Promise<boolean> {
        return await categoryDAL.removeAll(constraints);
    }
}

export default new CategoryService();
