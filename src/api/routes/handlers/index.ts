import { Request, Response } from 'express';
import { Err, HttpStatus, Ok } from '../../../constants';
import { API } from '../../types';

export async function handleSingleUpload(req: Request, res: Response, cb: API.FileCallback) {
    if (req.file === undefined) {
        return res.status(HttpStatus.BAD_REQUEST).json({ message: Err.FILE_NOT_FOUND });
    }
    try {
        cb(req.file);
        res.status(HttpStatus.OK).json({ message: Ok.UPLOAD_COMPLETE });
    } catch (e) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: 'Could not upload the file: ' + req.file.originalname,
            error: req.file,
        });
    }
}
