import { Request, Response } from 'express';
import fs from 'fs';
import { HttpStatus } from '../../constants';
import { API } from '../types';

export async function handleSingleUpload(req: Request, res: Response, cb: API.FileCallback) {
    if (req.file === undefined) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'File not found' });
    }
    const file = req.file as Express.Multer.File;
    try {
        await cb(file);
        res.status(HttpStatus.OK).json({ message: 'Upload the file complete' });
    } catch (e) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: 'Could not upload the file: ' + file.originalname,
            error: e,
        });
    } finally {
        if (file.path) {
            fs.unlinkSync(file.path);
        }
    }
}
