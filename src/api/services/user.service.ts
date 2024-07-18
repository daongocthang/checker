import { WhereOptions } from 'sequelize';
import userDAL from '../../db/dal/user.dal';
import { UserAttrs } from '../../db/models/user.model';
import { CRUD, User } from '../types';
import mapper from './mapper';

class UserService implements CRUD<UserAttrs, User> {
    async create(payload: UserAttrs): Promise<User> {
        return await userDAL.create(payload);
    }
    async update(id: number, payload: UserAttrs): Promise<User> {
        return mapper.toUser(await userDAL.update(id, payload));
    }
    async findById(id: number): Promise<User | null> {
        const result = await userDAL.findById(id);
        return result ? mapper.toUser(result) : null;
    }
    async findOne(constraints?: WhereOptions): Promise<User | null> {
        const result = await userDAL.findOne(constraints);
        if (!result) {
            return null;
        }
        return mapper.toUser(result);
    }
    async findAll(constraints?: WhereOptions): Promise<User[]> {
        const results = await userDAL.findAll(constraints);
        return results.map((r) => mapper.toUser(r));
    }
    async remove(id: number): Promise<boolean> {
        return await userDAL.remove(id);
    }
    async removeAll(constraints?: WhereOptions): Promise<boolean> {
        return await userDAL.removeAll(constraints);
    }
}

export default new UserService();
