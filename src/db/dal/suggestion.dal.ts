import { WhereOptions } from 'sequelize';
import { CRUD } from '../../api/types';
import SuggestionModel, { SuggestionAttrs } from '../models/suggestion.model';

class SuggestionDAL implements CRUD<SuggestionAttrs, SuggestionModel> {
    async bulkCreate(payload: SuggestionAttrs[]): Promise<void> {
        await SuggestionModel.bulkCreate(payload, { ignoreDuplicates: true });
    }
    async count(constraints?: WhereOptions): Promise<number> {
        return SuggestionModel.count({ where: constraints ?? {} });
    }
    async create(payload: SuggestionAttrs): Promise<SuggestionModel> {
        return SuggestionModel.create(payload);
    }
    async update(id: string, payload: SuggestionAttrs): Promise<SuggestionModel> {
        const suggestion = await SuggestionModel.findByPk(id);
        if (!suggestion) throw new Error('Suggestion not found');

        return await (suggestion as SuggestionModel).update(payload);
    }
    async findById(id: string): Promise<SuggestionModel | null> {
        return await SuggestionModel.findByPk(id);
    }
    async findOne(constraints?: WhereOptions): Promise<SuggestionModel | null> {
        return await SuggestionModel.findOne({ where: constraints ?? {} });
    }
    async findAll(constraints?: WhereOptions): Promise<SuggestionModel[]> {
        return await SuggestionModel.findAll({ where: constraints ?? {} });
    }
    async remove(constraints?: WhereOptions): Promise<boolean> {
        const delCount = await SuggestionModel.destroy({ where: constraints ?? {} });

        return !!delCount;
    }
}

export default new SuggestionDAL();
