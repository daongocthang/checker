import { CategoryResult, ProductResult, ReceivedTransResult, UserResult } from '../../db/models';
import { Category, Product, ReceivedTrans, User } from '../types';

const toCategory = (category: CategoryResult): Category => {
    return { id: category.id, model: category.model, withSerial: category.withSerial };
};

const toProduct = (product: ProductResult): Product => {
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

const toReceivedTrans = (trans: ReceivedTransResult): ReceivedTrans => {
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

const mapper = { toUser, toCategory, toProduct, toReceivedTrans };

export default mapper;
