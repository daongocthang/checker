import * as userDAL from '../../db/dal/user.dal';
import { UserAttrs } from '../../db/models/user.model';

export const create = async (payload: UserAttrs) => {
    return await userDAL.create(payload);
};
export const update = async (id: number, payload: UserAttrs) => {
    return await userDAL.update(id, payload);
};
export const getById = async (id: number) => {
    return await userDAL.getById(id);
};
export const getAll = async () => {
    return await userDAL.getAll();
};
export const remove = async (id: number) => {
    return await userDAL.remove(id);
};
