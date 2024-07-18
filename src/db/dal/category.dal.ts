import { WhereOptions } from 'sequelize';
import { CRUD } from '../../api/types';
import Category, { CategoryAttrs } from '../models/category.model';

class CategoryDAL implements CRUD<CategoryAttrs, Category> {
    async bulkCreate(payload: CategoryAttrs[]): Promise<void> {
        await Category.bulkCreate(payload, { ignoreDuplicates: true });
    }
    async create(payload: CategoryAttrs): Promise<Category> {
        return await Category.create(payload);
    }
    async update(id: number, payload: CategoryAttrs): Promise<Category> {
        const result = await Category.findByPk(id);
        if (result === null) {
            throw new Error('Not found');
        }

        return await (result as Category).update(payload);
    }
    async findById(id: number): Promise<Category | null> {
        return await Category.findByPk(id);
    }
    async findOne(constraints?: WhereOptions): Promise<Category | null> {
        return await Category.findOne({ where: constraints ? constraints : {} });
    }
    async findAll(constraints?: WhereOptions): Promise<Category[]> {
        return await Category.findAll({ where: constraints ? constraints : {} });
    }
    async remove(id: number): Promise<boolean> {
        const delCount = Category.destroy({ where: { id } });
        return !!delCount;
    }
    async removeAll(constraints?: WhereOptions): Promise<boolean> {
        const delCount = Category.destroy({ where: constraints ? constraints : {} });
        return !!delCount;
    }
}

export default new CategoryDAL();
