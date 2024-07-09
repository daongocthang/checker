import { Request } from 'express';
import fs from 'fs';
import multer, { FileFilterCallback } from 'multer';
import '../../types';
import { UPLOADS_DIR } from '../config';

const xlFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype.includes('excel') || file.mimetype.includes('spreadsheetml')) {
        cb(null, true);
    } else {
        cb(new Error('Please upload only excel file.'));
    }
};

const diskStorage = multer.diskStorage({
    destination(req, file, cb) {
        if (!fs.existsSync(UPLOADS_DIR)) {
            fs.mkdirSync(UPLOADS_DIR);
        }

        cb(null, UPLOADS_DIR);
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

export const xlUpload = multer({
    storage: diskStorage,
    fileFilter: xlFilter,
});
