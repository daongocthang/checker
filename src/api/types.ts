import { Row } from 'read-excel-file';
import { MapObject, ParseWithMapOptions } from 'read-excel-file/types';
import { range } from '../utils';

export declare namespace API {
    type FileCallback = (file: Express.Multer.File) => void;
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
