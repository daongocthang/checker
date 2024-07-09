import { Request } from 'express';
import fs from 'fs';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import '../../types';

const xlFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype.includes('excel') || file.mimetype.includes('spreadsheetml')) {
        cb(null, true);
    } else {
        cb(new Error('Please upload only excel file.'));
    }
};

const diskStorage = multer.diskStorage({
    destination(req, file, cb) {
        const uploadPath = path.join(global.publicDir, 'uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }

        cb(null, uploadPath);
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

export const xlUpload = multer({
    storage: diskStorage,
    fileFilter: xlFilter,
});
