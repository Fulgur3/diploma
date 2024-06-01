import { Request, Response, NextFunction } from 'express';
import { myDataSource } from '../database/app-data-source';
import { User } from '../entity/User';
import { Quiz } from '../entity/Quiz';

export class QuizMiddleware {
	static hasAccess(quizIdName = 'id') {
		return async function (req: Request, res: Response, next: NextFunction) {
			try {
				const user = await ((req as any).user as User);
				console.log(user);
				const quiz = await myDataSource.getRepository(Quiz).findOneByOrFail({ id: +req.params[quizIdName] });
				console.log(quiz);
	
				if (quiz.creatorId !== user.id) {
					return res.sendStatus(403);
				}
	
				next();
			}
			catch (error) {
				return res.sendStatus(404);
			}
		}
	}
}