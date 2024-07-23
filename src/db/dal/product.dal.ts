import { WhereOptions } from 'sequelize';
import { CRUD } from '../../api/types';
import ProductModel, { ProductAttrs } from '../models/porduct.model';

class ProductDAL implements CRUD<ProductAttrs, ProductModel> {
    async bulkCreate(payload: ProductAttrs[]): Promise<void> {
        await ProductModel.bulkCreate(payload, { ignoreDuplicates: true });
    }
    async count(constraints?: WhereOptions): Promise<number> {
        return await ProductModel.count({ where: constraints ?? {}, col: 'id', distinct: true });
    }
    async create(payload: ProductAttrs): Promise<ProductModel> {
        return await ProductModel.create(payload);
    }
    async update(id: number, payload: ProductAttrs): Promise<ProductModel> {
        const product = await ProductModel.findByPk(id);
        if (product === null) {
            throw new Error('Product not found');
        }

        return await (product as ProductModel).update(payload);
    }
    async findById(id: number): Promise<ProductModel | null> {
        return await ProductModel.findByPk(id);
    }
    async findOne(constraints?: WhereOptions): Promise<ProductModel | null> {
        return await ProductModel.findOne({ where: constraints ?? {} });
    }
    async findAll(constraints?: WhereOptions): Promise<ProductModel[]> {
        return await ProductModel.findAll({ where: constraints ?? {} });
    }

    async remove(constraints?: WhereOptions): Promise<boolean> {
        const delCount = await ProductModel.destroy({ where: constraints ?? {} });
        return !!delCount;
    }
}

export default new ProductDAL();
