import { WhereOptions } from 'sequelize';
import { CRUD } from '../../api/types';
import User, { UserAttrs } from '../models/user.model';

class UserDAL implements CRUD<UserAttrs, User> {
    async create(payload: UserAttrs): Promise<User> {
        return await User.create(payload);
    }
    async update(id: number, payload: UserAttrs): Promise<User> {
        const user = await User.findByPk(id);
        if (user === null) {
            throw new Error('User is not availble');
        }

        return await (user as unknown as User).update(payload);
    }
    async findById(id: number): Promise<User | null> {
        return await User.findByPk(id);
    }
    async findOne(constraints?: WhereOptions): Promise<User | null> {
        return await User.findOne({ where: constraints ? constraints : {} });
    }
    async findAll(constraints?: WhereOptions): Promise<User[]> {
        return await User.findAll({ where: constraints ? constraints : {} });
    }
    async remove(id: number): Promise<boolean> {
        const delCount = await User.destroy({ where: { id } });
        return !!delCount;
    }
    async removeAll(constraints?: WhereOptions): Promise<boolean> {
        const delCount = await User.destroy({ where: constraints ? constraints : {} });
        return !!delCount;
    }
}

export default new UserDAL();
