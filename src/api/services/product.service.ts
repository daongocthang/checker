import readXlsxFile from 'read-excel-file/node';
import { WhereOptions } from 'sequelize';
import productDal from '../../db/dal/product.dal';
import { ProductAttrs } from '../../db/models/porduct.model';
import { chunks } from '../../utils/array.util';
import { fromFile } from '../../utils/stream.util';
import { ProductMapObject } from '../config';
import { CRUD, MapOptions, Warranty as wnty } from '../types';
import mapper from './mapper';

class ProductService implements CRUD<ProductAttrs, wnty.Product> {
    async bulkCreate(filename: string): Promise<void> {
        try {
            const { rows } = await readXlsxFile<ProductAttrs>(fromFile(filename), new MapOptions(ProductMapObject));
            await Promise.all(chunks(rows, 500).map((chunk) => productDal.bulkCreate(chunk)));
        } catch (error) {
            throw new Error('Heap out of memory');
        }
    }
    async count(constraints?: WhereOptions): Promise<number> {
        return await productDal.count(constraints);
    }
    async create(payload: ProductAttrs): Promise<wnty.Product> {
        return mapper.toProduct(await productDal.create(payload));
    }
    async update(id: number, payload: ProductAttrs): Promise<wnty.Product> {
        return mapper.toProduct(await productDal.update(id, payload));
    }
    async findById(id: number): Promise<wnty.Product | null> {
        const result = await productDal.findById(id);
        if (!result) return null;

        return mapper.toProduct(result);
    }
    async findOne(constraints?: WhereOptions): Promise<wnty.Product | null> {
        const result = await productDal.findOne(constraints);
        if (!result) return null;

        return mapper.toProduct(result);
    }
    async findAll(constraints?: WhereOptions): Promise<wnty.Product[]> {
        const results = await productDal.findAll(constraints);
        return results.map((r) => mapper.toProduct(r));
    }

    async remove(constraints?: WhereOptions): Promise<boolean> {
        return await productDal.remove(constraints);
    }

    async group(): Promise<wnty.Product[]> {
        return await productDal.group();
    }
}

export default new ProductService();
