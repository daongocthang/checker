import { Warranty as wnty } from '../api/types';
import { chunks } from '../utils/array.util';
import OrderModel, { OrderAttrs } from './order.model';

class OrderDAL {
    async bulkCreate(payload: OrderAttrs[]): Promise<OrderModel[]> {
        const results = await Promise.all(chunks(payload, 500).map((row) => OrderModel.bulkCreate(row, { ignoreDuplicates: true })));
        return results.reduce((acc, item) => acc.concat(item), []);
    }
}

export const toOrderAttrs = (trans: wnty.Transaction) => {
    const orderAttrs: OrderAttrs = {
        receiptNo: trans.id,
        model: trans.model,
        serial: trans.serial,
        description: trans.description,
    };

    return orderAttrs;
};

export default new OrderDAL();
