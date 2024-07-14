import { CategoryResult, ProductResult, ReceivedTransResult, UserResult } from '../../db/models';
import { Category, Product, ReceivedTrans, User } from '../types';

export const toCategory = (category: CategoryResult): Category => {
    return { model: category.model, withSerial: category.withSerial };
};

export const toProduct = (product: ProductResult): Product => {
    return {
        id: product.id,
        model: product.model,
        serial: product.serial,
    };
};

export const toUser = (user: UserResult): User => {
    return {
        id: user.id,
        name: user.name,
    };
};

export const toReceivedTrans = (trans: ReceivedTransResult): ReceivedTrans => {
    return {
        ticket: trans.ticket,
        model: trans.model,
        serial: trans.serial,
        description: trans.description,
        expired: trans.expired,
        userId: trans.userId,

        createdAt: trans.createdAt,
        updatedAt: trans.updatedAt,
    };
};
