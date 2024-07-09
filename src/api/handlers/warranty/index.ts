import { Request, Response } from 'express';
import { Err, HttpStatus } from '../../../constants';
import path from 'path';
import readXlsxFile from 'read-excel-file/node';
import fs from 'fs';
import { ParsedObject } from '../../../types';
import { solidMO } from './mapper';

export async function upload(req: Request, res: Response) {
    if (req.file === undefined) {
        return res.status(HttpStatus.BAD_REQUEST).json({ message: Err.FILE_NOT_FOUND });
    }
    try {
        const filename = path.join(global.publicDir, 'uploads', req.file.filename);
        const { rows } = await readXlsxFile<ParsedObject>(fs.createReadStream(filename));
        res.status(HttpStatus.OK).json({ rows });
    } catch (e) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: 'Could not upload the file: ' + req.file.originalname,
            error: e,
        });
    } finally {
        if (req.file) {
            // Remove the file
            fs.unlinkSync(req.file.path);
        }
    }
}
