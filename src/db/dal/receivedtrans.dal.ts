import { WhereOptions } from 'sequelize';
import ReceivedTrans, { ReceivedTransAttrs, ReceivedTransResult } from '../models/receivedtrans.model';

export const bulkCreate = async (payloads: ReceivedTransAttrs[]): Promise<void> => {
    await ReceivedTrans.bulkCreate(payloads, { ignoreDuplicates: true });
};

export const removeAll = async (constraints?: WhereOptions): Promise<boolean> => {
    const deletedCount = await ReceivedTrans.destroy({ where: constraints ? constraints : {} });
    return !!deletedCount;
};

export const findAll = async (constraints?: WhereOptions): Promise<ReceivedTransResult[]> => {
    return await ReceivedTrans.findAll({ where: constraints ? constraints : {} });
};

export const findOne = async (constraints?: WhereOptions): Promise<ReceivedTransResult | null> => {
    return await ReceivedTrans.findOne({ where: constraints ? constraints : {} });
};

export const update = async (ticket: string, payload: ReceivedTransAttrs): Promise<ReceivedTransResult> => {
    const trans = await ReceivedTrans.findByPk(ticket);
    if (trans === null) {
        throw new Error('Not Found');
    }

    return await (trans as unknown as ReceivedTrans).update(payload);
};
