import { WhereOptions } from 'sequelize';
import { CRUD } from '../../api/types';
import TransModel, { TransAttrs } from '../models/trans.model';

class TransDAL implements CRUD<TransAttrs, TransModel> {
    async bulkCreate(payload: TransAttrs[]): Promise<void> {
        await TransModel.bulkCreate(payload, { updateOnDuplicate: ['updatedAt'] });
    }
    async count(constraints?: WhereOptions): Promise<number> {
        return await TransModel.count({ where: constraints ?? {}, col: 'id', distinct: true });
    }
    async create(payload: TransAttrs): Promise<TransModel> {
        return await TransModel.create(payload);
    }
    async update(id: string | string, payload: TransAttrs): Promise<TransModel> {
        const trans = await TransModel.findByPk(id);
        if (trans === null) {
            throw new Error('Not Found');
        }

        return await (trans as TransModel).update(payload);
    }
    async findById(id: string): Promise<TransModel | null> {
        return await TransModel.findByPk(id);
    }
    async findOne(constraints?: WhereOptions): Promise<TransModel | null> {
        return await TransModel.findOne({ where: constraints ?? {} });
    }
    async findAll(constraints?: WhereOptions): Promise<TransModel[]> {
        return await TransModel.findAll({ where: constraints ?? {} });
    }
    async remove(constraints?: WhereOptions): Promise<boolean> {
        const delCount = await TransModel.destroy({ where: constraints ?? {} });
        return !!delCount;
    }
}

export default new TransDAL();
