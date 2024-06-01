import { Request, Response, NextFunction } from 'express';
import { myDataSource } from '../database/app-data-source';
import { User } from '../entity/User';

export class UserMiddleware {
	static async isExist(req: Request, res: Response, next: NextFunction) {
		
		const user = await myDataSource.getRepository(User).findOneByOrFail({ id: +req.params.id });
		
		(req as any).user = user;

		next();
	}

	static async canCreate(req: Request, res: Response, next: NextFunction) {
		const { email, username } = req.body;
		const existingUser = await myDataSource.getRepository(User).findOne({ where: [{ email }, { username }] });

		if (existingUser) {
			// User with the provided email or username already exists
			return res.status(400).json({ error: `User with this ${existingUser.email == email ? 'email' : 'username'} already exists.` });
		}

		next();
	}
}