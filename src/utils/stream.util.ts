import fs from 'fs';
import path from 'path';
import { UPLOADS_DIR } from '../api/config';

export const fromFile = (filename: string) => {
    const filePath = path.join(UPLOADS_DIR, filename);
    return fs.createReadStream(filePath);
};
