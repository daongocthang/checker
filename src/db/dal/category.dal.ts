import { WhereOptions } from 'sequelize';
import { CRUD } from '../../api/types';
import CategoryModel, { CategoryAttrs } from '../models/category.model';

class CategoryDAL implements CRUD<CategoryAttrs, CategoryModel> {
    async bulkCreate(payload: CategoryAttrs[]): Promise<void> {
        await CategoryModel.bulkCreate(payload, { ignoreDuplicates: true });
    }
    async create(payload: CategoryAttrs): Promise<CategoryModel> {
        return await CategoryModel.create(payload);
    }
    async update(id: number, payload: CategoryAttrs): Promise<CategoryModel> {
        const result = await CategoryModel.findByPk(id);
        if (result === null) {
            throw new Error('Not found');
        }

        return await (result as CategoryModel).update(payload);
    }
    async findById(id: number): Promise<CategoryModel | null> {
        return await CategoryModel.findByPk(id);
    }
    async findOne(constraints?: WhereOptions): Promise<CategoryModel | null> {
        return await CategoryModel.findOne({ where: constraints ? constraints : {} });
    }
    async findAll(constraints?: WhereOptions): Promise<CategoryModel[]> {
        return await CategoryModel.findAll({ where: constraints ? constraints : {} });
    }
    async remove(id: number): Promise<boolean> {
        const delCount = CategoryModel.destroy({ where: { id } });
        return !!delCount;
    }
    async removeAll(constraints?: WhereOptions): Promise<boolean> {
        const delCount = CategoryModel.destroy({ where: constraints ? constraints : {} });
        return !!delCount;
    }
    async count(constraints?: WhereOptions): Promise<number> {
        return CategoryModel.count({ where: constraints ? constraints : {} });
    }
}

export default new CategoryDAL();
