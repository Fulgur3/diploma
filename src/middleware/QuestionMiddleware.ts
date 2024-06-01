import { Request, Response, NextFunction } from 'express';
import { myDataSource } from '../database/app-data-source';
import { Question } from '../entity/Question';

export class QuestionMiddleware {
    static async isExist(req: Request, res: Response, next: NextFunction) {
        try {
            const question = await myDataSource.getRepository(Question).findOneByOrFail({ id: +req.params.question_id });

            (req as any).question = question;

            next();
        }
        catch (error) {
            return res.sendStatus(404);
        }
	}
}