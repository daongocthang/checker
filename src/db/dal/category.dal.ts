import Category, { CategoryAttrs } from '../models/category.model';

export const bulkCreate = async (payloads: CategoryAttrs[]) => {
    return await Category.bulkCreate(payloads, { ignoreDuplicates: true });
};

export const create = async (payload: CategoryAttrs) => {
    return await Category.create(payload);
};

export const update = async (model: string, payload: CategoryAttrs) => {
    const cat = await findByModel(model);
    if (cat === null) {
        throw new Error('Not found');
    }

    return await (cat as unknown as Category).update(payload);
};

export const removeByModel = async (model: string) => {
    const constraints = { model };
    const delCategoryCount = await Category.destroy({ where: constraints });
    return !!delCategoryCount;
};
export const removeAll = async (constraints?: object) => {
    const delCategoryCount = await Category.destroy({ where: { ...constraints } });
    return !!delCategoryCount;
};
export const findByModel = async (model: string) => {
    const constraints = { model };
    return await Category.findOne({ where: constraints });
};

export const findAll = async (constants?: object) => {
    return await Category.findAll({ where: { ...constants } });
};
