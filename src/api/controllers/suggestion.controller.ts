import { Request, Response } from 'express';
import suggestionService from '../services/suggestion.service';
import { API } from '../types';
import { handleSingleUpload } from './handlers';

class SuggestionController {
    upload = async (req: Request, res: Response) => {
        const cb: API.FileCallback = async (file: Express.Multer.File) => {
            await suggestionService.bulkCreate(file.filename);
            const count = await suggestionService.count();
            res.status(200).send({ message: 'Upload the file complete', count });
        };

        await handleSingleUpload(req, res, cb);
    };
}

export default new SuggestionController();
