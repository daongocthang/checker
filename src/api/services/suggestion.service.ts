import readXlsxFile from 'read-excel-file/node';
import { WhereOptions } from 'sequelize';
import suggestionDal from '../../db/dal/suggestion.dal';
import { SuggestionAttrs } from '../../db/models/suggestion.model';
import { chunks } from '../../utils/array.util';
import { fromFile } from '../../utils/stream.util';
import { SuggestionMapObject } from '../config';
import { CRUD, MapOptions, Warranty as wnty } from '../types';
import mapper from './mapper';

class SuggestionService implements CRUD<SuggestionAttrs, wnty.Suggestion> {
    async bulkCreate(filename: string): Promise<void> {
        const { rows } = await readXlsxFile<SuggestionAttrs>(fromFile(filename), new MapOptions(SuggestionMapObject));
        await Promise.all(chunks(rows, 500).map((chunk) => suggestionDal.bulkCreate(chunk)));
    }
    async count(constraints?: WhereOptions): Promise<number> {
        return await suggestionDal.count(constraints);
    }
    async create(payload: SuggestionAttrs): Promise<wnty.Suggestion> {
        return mapper.toSuggestion(await suggestionDal.create(payload));
    }
    async update(id: string, payload: SuggestionAttrs): Promise<wnty.Suggestion> {
        return mapper.toSuggestion(await suggestionDal.update(id, payload));
    }
    async findById(id: string): Promise<wnty.Suggestion | null> {
        const suggestion = await suggestionDal.findById(id);
        if (!suggestion) return null;

        return mapper.toSuggestion(suggestion);
    }
    async findOne(constraints?: WhereOptions): Promise<wnty.Suggestion | null> {
        const suggestion = await suggestionDal.findOne(constraints);
        if (!suggestion) return null;

        return mapper.toSuggestion(suggestion);
    }
    async findAll(constraints?: WhereOptions): Promise<wnty.Suggestion[]> {
        const suggestions = await suggestionDal.findAll(constraints);
        return suggestions.map((s) => mapper.toSuggestion(s));
    }
    async remove(constraints?: WhereOptions): Promise<boolean> {
        return await suggestionDal.remove(constraints);
    }
}

export default new SuggestionService();
