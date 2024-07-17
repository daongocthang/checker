import { WhereOptions } from 'sequelize';
import * as userDAL from '../../db/dal/user.dal';
import { UserAttrs } from '../../db/models/user.model';
import { User } from '../types';
import * as mapper from './mapper';

export const create = async (payload: UserAttrs): Promise<User> => {
    return mapper.toUser(await userDAL.create(payload));
};
export const update = async (id: number, payload: UserAttrs): Promise<User> => {
    return mapper.toUser(await userDAL.update(id, payload));
};
export const getById = async (id: number): Promise<User | null> => {
    const result = await userDAL.getById(id);
    return result ? mapper.toUser(result) : null;
};
export const getAll = async (constraints?: WhereOptions): Promise<User[]> => {
    const results = await userDAL.getAll(constraints);
    return results.map((r) => mapper.toUser(r));
};
export const remove = async (id: number): Promise<boolean> => {
    return await userDAL.remove(id);
};
