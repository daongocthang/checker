import { WhereOptions } from 'sequelize';

export default interface CRUD<A, T> {
    bulkCreate?(payload: A[] | string): Promise<void>;
    count?(constraints?: WhereOptions): Promise<number>;
    create(payload: A): Promise<T>;
    update(id: number | string, payload: A): Promise<T>;
    findById(id: number | string): Promise<T | null>;
    findOne(constraints?: WhereOptions): Promise<T | null>;
    findAll(constraints?: WhereOptions): Promise<T[]>;
    remove(id: number | string): Promise<boolean>;
    removeAll(constraints?: WhereOptions): Promise<boolean>;
}
