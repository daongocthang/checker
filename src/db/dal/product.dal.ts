import { WhereOptions } from 'sequelize';
import Product, { ProductAttrs, ProductResult } from '../models/porduct.model';

export const bulkCreate = async (payloads: ProductAttrs[]): Promise<void> => {
    await Product.bulkCreate(payloads, { ignoreDuplicates: true });
};
export const create = async (payload: ProductAttrs): Promise<ProductResult> => {
    return await Product.create(payload);
};

export const update = async (id: number, payload: ProductAttrs): Promise<ProductResult> => {
    const product = await Product.findByPk(id);
    if (product === null) {
        throw new Error('Product not found');
    }

    return await (product as unknown as Product).update(payload);
};

export const remove = async (id: number): Promise<boolean> => {
    const delCount = await Product.destroy({ where: { id } });
    return !!delCount;
};

export const removeAll = async (constraints?: WhereOptions): Promise<boolean> => {
    const delCount = await Product.destroy({ where: constraints ? constraints : {} });
    return !!delCount;
};

export const getById = async (id: number): Promise<ProductResult | null> => {
    return await Product.findByPk(id);
};

export const getAll = async (constraints?: WhereOptions): Promise<ProductResult[]> => {
    return await Product.findAll({ where: constraints ? constraints : {} });
};

export const findOne = async (constraints?: WhereOptions): Promise<ProductResult | null> => {
    return Product.findOne({ where: constraints ? constraints : {} });
};
