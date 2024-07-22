import { Row } from 'read-excel-file';
import { MapObject, ParseWithMapOptions } from 'read-excel-file/types';
import { range } from '../../utils/array.util';
import CRUD from './crud.type';
import User from './user.types';

export declare namespace API {
    type FileCallback = (file: Express.Multer.File) => Promise<void>;
}

export class MapOptions implements ParseWithMapOptions {
    offset: number;
    map: MapObject;
    constructor(map: MapObject, offet: number = 0) {
        this.map = map;
        this.offset = offet;
    }

    transformData = (rows: Row[]) => {
        range(this.offset).forEach((_) => {
            rows.shift();
        });
        return rows;
    };
}

export namespace Warranty {
    export type Category = { id: number; model: string; withSerial: boolean; size: number };
    export type Product = {
        id: number;
        model: string;
        serial: string;
    };
    export type Transaction = {
        id: string;
        model: string;
        serial: string;
        description: string;
        expired: boolean;
        userId: number;
        suggestion?: string;

        createdAt: Date;
        updatedAt: Date;
    };
    export type Suggestion = {
        id: string;
        action: string;

        createdAt: Date;
    };
}

export { CRUD, User };
