import { MapObject, ParseWithMapOptions, Row } from 'read-excel-file/types';
import { range } from '../../utils';
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
