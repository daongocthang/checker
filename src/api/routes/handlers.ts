import { Request, Response } from 'express';
import fs from 'fs';
import { Err, HttpStatus, Ok } from '../../constants';
import { API } from '../types';

export async function handleSingleUpload(req: Request, res: Response, cb: API.FileCallback) {
    if (req.file === undefined) {
        return res.status(HttpStatus.BAD_REQUEST).json({ message: Err.FILE_NOT_FOUND });
    }
    try {
        await cb(req.file);
        res.status(HttpStatus.OK).json({ message: Ok.UPLOAD_COMPLETE });
    } catch (e) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: Err.UPLOAD_FAILED,
        });
    } finally {
        () => {
            if (req.file) {
                fs.unlinkSync(req.file.filename);
            }
        };
    }
}
