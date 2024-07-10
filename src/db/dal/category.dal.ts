import Category, { CategoryAttrs } from '../models/category.model';

export const bulkCreate = async (payloads: CategoryAttrs[]): Promise<void> => {
    await Category.bulkCreate(payloads, { ignoreDuplicates: true });
};
export const createOrUpdate = async (payload: CategoryAttrs) => {
    const cat = findByModel(payload.model);
    if (cat === null) {
        await Category.create(payload);
    } else {
        await (cat as unknown as Category).update(payload);
    }
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
