import { CategoryResult, ProductResult, TransResult, UserResult } from '../../db/models';
import { User, Warranty as wnty } from '../types';

const toCategory = (category: CategoryResult): wnty.Category => {
    return { id: category.id, model: category.model, withSerial: category.withSerial, size: category.size };
};

const toProduct = (product: ProductResult): wnty.Product => {
    return {
        id: product.id,
        model: product.model,
        serial: product.serial,
    };
};

const toUser = (user: UserResult): User => {
    return {
        id: user.id,
        name: user.name,
    };
};

const toTransaction = (trans: TransResult): wnty.Transaction => {
    return {
        id: trans.id,
        model: trans.model,
        serial: trans.serial,
        description: trans.description,
        expired: trans.expired,
        userId: trans.userId,

        createdAt: trans.createdAt,
        updatedAt: trans.updatedAt,
    };
};

const mapper = { toUser, toCategory, toProduct, toTransaction };

export default mapper;
