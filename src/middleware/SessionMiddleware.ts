import { Request, Response, NextFunction } from 'express';
import { myDataSource } from '../database/app-data-source';
import { User } from '../entity/User';
import { Session } from '../entity/Session';

export class SessionMiddleware {
	static isExist(paramLocation = 'param', sessionIdName = 'id') {
		return async function (req: Request, res: Response, next: NextFunction) {
			try {
				const session = await myDataSource.getRepository(Session).findOneByOrFail({ [sessionIdName]: req[paramLocation][sessionIdName] });
				
				(req as any).session = session;
	
				next();
			}
			catch (error) {
				return res.sendStatus(404);
			}
		}
	}

	static hasAccess() {
		return async function (req: Request, res: Response, next: NextFunction) {
			const user = await ((req as any).user as User);
			const session = await ((req as any).session as Session);

			if (session.quiz.creatorId !== user.id)
				return res.sendStatus(403);

			next();
		}
	}
}