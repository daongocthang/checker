import ReceivedTrans, { ReceivedTransAttrs } from '../models/receivedtrans.model';

export const bulkCreate = async (payloads: ReceivedTransAttrs[]) => {
    return await ReceivedTrans.bulkCreate(payloads, { ignoreDuplicates: true });
};

export const removeAll = async (constraints?: object) => {
    const deletedCount = await ReceivedTrans.destroy({ where: { ...constraints } });
    return !!deletedCount;
};

export const findAll = async (constraints?: object) => {
    return await ReceivedTrans.findAll({ where: { ...constraints } });
};
