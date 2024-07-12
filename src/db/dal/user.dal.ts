import User, { UserAttrs } from '../models/user.model';

export const create = async (payload: UserAttrs) => {
    return await User.create(payload);
};

export const update = async (id: number, payload: UserAttrs) => {
    const user = User.findByPk(id);
    if (user === undefined) {
        throw new Error('User is not availble');
    }

    return await (user as unknown as User).update(payload);
};

export const getById = async (id: number) => {
    return await User.findByPk(id);
};

export const getAll = async (constraints?: object) => {
    return await User.findAll({ where: { ...constraints } });
};

export const remove = (id: number) => {
    const delCount = User.destroy({ where: { id } });
    return !!delCount;
};
