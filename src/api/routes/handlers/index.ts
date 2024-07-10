import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import readXlsxFile from 'read-excel-file/node';
import { Err, HttpStatus } from '../../../constants';
import { UPLOADS_DIR } from '../../config';
import { MapOptions } from '../../controllers/mapper';

const DTO = { 'Mã thiết bị': 'model', IMEI: 'serial' };
export async function handleXlsxFile(req: Request, res: Response) {
    if (req.file === undefined) {
        return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Fiel' + Err.NOT_FOUND });
    }
    try {
        const filename = path.join(UPLOADS_DIR, req.file.filename);
        const { rows } = await readXlsxFile(fs.createReadStream(filename), new MapOptions(DTO, 10));
        res.status(HttpStatus.OK).json(rows);
    } catch (e) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: 'Could not upload the file: ' + req.file.originalname,
            error: req.file,
        });
    } finally {
        if (req.file) {
            // Remove the file
            fs.unlinkSync(req.file.path);
        }
    }
}
