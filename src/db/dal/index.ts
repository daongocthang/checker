import { WarrantyCategoryAttrs } from '../models/warranty.model';

declare namespace dal {
    interface WarrantyCategoryDAL {
        create(payload: WarrantyCategoryAttrs): Promise<void>;
        bulkCreate(payloads: WarrantyCategoryAttrs[]): Promise<void>;
        update(id: number, payload: WarrantyCategoryAttrs): Promise<void>;
        remove(id: number): Promise<boolean>;
        removeAll(): Promise<boolean>;
        find(id: number): Promise<WarrantyCategoryAttrs | null>;
        findAll(constraints: {}): Promise<WarrantyCategoryAttrs[]>;
    }
}
