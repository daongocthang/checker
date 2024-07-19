import { WhereOptions } from 'sequelize';
import { CRUD } from '../../api/types';
import UserModel, { UserAttrs } from '../models/user.model';

class UserDAL implements CRUD<UserAttrs, UserModel> {
    async create(payload: UserAttrs): Promise<UserModel> {
        return await UserModel.create(payload);
    }
    async update(id: number, payload: UserAttrs): Promise<UserModel> {
        const user = await UserModel.findByPk(id);
        if (user === null) {
            throw new Error('User is not availble');
        }

        return await (user as unknown as UserModel).update(payload);
    }
    async findById(id: number): Promise<UserModel | null> {
        return await UserModel.findByPk(id);
    }
    async findOne(constraints?: WhereOptions): Promise<UserModel | null> {
        return await UserModel.findOne({ where: constraints ? constraints : {} });
    }
    async findAll(constraints?: WhereOptions): Promise<UserModel[]> {
        return await UserModel.findAll({ where: constraints ? constraints : {} });
    }
    async remove(id: number): Promise<boolean> {
        const delCount = await UserModel.destroy({ where: { id } });
        return !!delCount;
    }
    async removeAll(constraints?: WhereOptions): Promise<boolean> {
        const delCount = await UserModel.destroy({ where: constraints ? constraints : {} });
        return !!delCount;
    }
}

export default new UserDAL();
