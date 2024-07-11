import { Request, Response } from 'express';
import fs from 'fs';
import { HttpStatus } from '../../constants';
import { API } from '../types';

export async function handleSingleUpload(req: Request, res: Response, cb: API.FileCallback) {
    if (req.file === undefined) {
        return res.status(HttpStatus.BAD_REQUEST).json({ message: 'File not found' });
    }
    try {
        await cb(req.file);
        res.status(HttpStatus.OK).json({ message: 'Upload the file complete' });
    } catch (e) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: 'Could not upload the file: ' + req.file.originalname,
        });
    } finally {
        () => {
            if (req.file) {
                fs.unlinkSync(req.file.filename);
            }
        };
    }
}
