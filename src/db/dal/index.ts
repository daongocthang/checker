import { CategoryAttrs } from '../models/category.model';

declare namespace dal {
    interface WarrantyCategoryDAL {
        create(payload: CategoryAttrs): Promise<void>;
        bulkCreate(payloads: CategoryAttrs[]): Promise<void>;
        update(id: number, payload: CategoryAttrs): Promise<void>;
        remove(id: number): Promise<boolean>;
        removeAll(): Promise<boolean>;
        find(id: number): Promise<CategoryAttrs | null>;
        findAll(constraints: {}): Promise<CategoryAttrs[]>;
    }
}
