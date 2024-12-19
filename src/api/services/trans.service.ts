import readXlsxFile from 'read-excel-file/node';
import { WhereOptions } from 'sequelize';
import writeXlsxFile from 'write-excel-file/node';
import transDal from '../../db/dal/trans.dal';
import { TransAttrs, TransResult } from '../../db/models/trans.model';
import { chunks, random } from '../../utils/array.util';
import { fromFile } from '../../utils/stream.util';
import { PATTERNS, TransMapObject } from '../config';
import { Adapter, CRUD, MapOptions, Warranty as wnty } from '../types';
import categoryService from './category.service';
import mapper from './mapper';
import productService from './product.service';
import suggestionService from './suggestion.service';

class TransService implements CRUD<TransAttrs, wnty.Transaction> {
    async bulkCreate(payload: TransAttrs[]): Promise<void> {
        await Promise.all(chunks(payload, 500).map((chunk) => transDal.bulkCreate(chunk)));
    }
    async count(constraints?: WhereOptions): Promise<number> {
        return await transDal.count(constraints);
    }
    async create(payload: TransAttrs): Promise<wnty.Transaction> {
        return mapper.toTransaction(await transDal.create(payload));
    }
    async update(id: string, payload: TransAttrs): Promise<wnty.Transaction> {
        return mapper.toTransaction(await transDal.update(id, payload));
    }
    async findById(id: string): Promise<wnty.Transaction | null> {
        const result = await transDal.findById(id);
        if (!result) return null;

        return mapper.toTransaction(result);
    }
    async findOne(constraints?: WhereOptions): Promise<wnty.Transaction | null> {
        const result = await transDal.findOne(constraints);
        if (!result) return null;

        return mapper.toTransaction(result);
    }
    async findAll(constraints?: WhereOptions): Promise<wnty.Transaction[]> {
        const results = await transDal.findAll(constraints);
        return results.map((r) => mapper.toTransaction(r));
    }
    async remove(constraints?: WhereOptions): Promise<boolean> {
        return await transDal.remove(constraints);
    }
}

const transService = new TransService();

const findCategory = (model: string, categories: wnty.Category[]): wnty.Category | undefined => {
    return categories.find((cat) => model.includes(cat.id));
};

const checkExpired = async (trans: wnty.Transaction, categories: wnty.Category[]): Promise<wnty.Transaction> => {
    trans.expired = await isExpired(trans.serial, trans.model, categories);

    return trans;
};

export const readAndFitler = async (filename: string): Promise<wnty.Transaction[]> => {
    const { rows } = await readXlsxFile<TransAttrs>(fromFile(filename), new MapOptions(TransMapObject, 10));
    const filtered = rows.filter((row) => PATTERNS.indexOf(row.status as string) !== -1);
    return filtered.map((r) => mapper.toTransaction(r as TransResult));
};

export const isExpired = async (serial: string, model: string, categories: wnty.Category[]): Promise<boolean> => {
    const cat = findCategory(model, categories);

    if (cat === undefined) {
        return true;
    }

    if (!cat.withSerial || cat.size === 0) return false; // still under warranty

    const truncated = `${serial}`.substring(0, cat.size);
    const count = await productService.count({
        model: { $like: `%${cat.id}%` },
        serial: truncated,
    });

    return !count;
};

export const updateExpiredAll = async (payload: wnty.Transaction[]): Promise<wnty.Transaction[]> => {
    const categories = await categoryService.findAll();
    const checkedTransArray = await Promise.all(payload.map((row) => checkExpired(row, categories)));
    return checkedTransArray;
};

export const suggest = (s: string, adapter: Adapter<wnty.Suggestion>): string => {
    if (!adapter) return 'unknown';

    const suggestion = adapter.find((item) => s.includes(item.id));
    return suggestion ? suggestion.action : 'lỗi thời';
};

export const updateAllSuggestions = async (rows: wnty.Transaction[], size: number = Infinity, inverse: boolean = true) => {
    const adapter: Adapter<wnty.Suggestion> = await suggestionService.findAll();
    rows.forEach((x) => (x.suggestion = x.expired ? suggest(x.model, adapter) : 'test'));

    const filteredRows = rows.filter((x) => x.suggestion == 'dồn dịch');
    const fixedSize = Math.min(size, filteredRows.length);
    let count = inverse ? filteredRows.length - fixedSize : fixedSize;

    while (count-- > 0) {
        let i = random(filteredRows.length);
        let trans = filteredRows.splice(i, 1)[0];

        let rowId = rows.findIndex((x) => x.id == trans.id);
        if (rowId >= 0) rows[rowId].suggestion = 'test';
    }

    return rows;
};

export const exportXlsxFile = async (data: wnty.Transaction[], filePath: string) => {
    const schema = [
        {
            column: 'Phiếu tiếp nhận',
            type: String,
            value: (t: wnty.Transaction) => t.id,
        },
        {
            column: 'IMEI',
            type: String,
            value: (t: wnty.Transaction) => t.serial,
        },
        {
            column: 'Mã thiết bị',
            type: String,
            value: (t: wnty.Transaction) => t.model,
        },
        {
            column: 'Hết BH hãng',
            type: Boolean,
            value: (t: wnty.Transaction) => t.expired,
        },
        {
            column: 'Đề xuất',
            type: String,
            value: (t: wnty.Transaction) => t.suggestion,
        },
        {
            column: 'User',
            type: Number,
            value: (t: wnty.Transaction) => t.userId,
        },
    ];
    await writeXlsxFile(data, { schema, filePath });
};

export default transService;
