import fs from 'fs';
import path from 'path';
import readXlsxFile from 'read-excel-file/node';
import { MapObject } from 'read-excel-file/types';
import { UPLOADS_DIR } from '../config';
import { MapOptions } from './mapper';

export const bulkCreate = async (filename: string, mapObject: MapObject) => {
    const filePath = path.join(UPLOADS_DIR, filename);
    const { rows } = await readXlsxFile(fs.createReadStream(filePath), new MapOptions(mapObject));
};
