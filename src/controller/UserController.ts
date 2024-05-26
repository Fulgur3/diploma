import { Request, Response } from 'express';
import { myDataSource } from '../database/app-data-source';
import { User } from '../entity/User';
import { instanceToPlain } from 'class-transformer';

export class UserController {

	static async getUsers(req: Request, res: Response) {
		const users = await myDataSource.getRepository(User).find();

		return res.json(instanceToPlain(users));
	}

	static async getUser(req: Request, res: Response) {
		try {
			const user = await myDataSource.getRepository(User).findOneByOrFail({
				id: +req.params.id,
			});
		
			return res.send(instanceToPlain(user));
		} catch (error) {
			res.sendStatus(404);
		}
	}

	static async createUser(req: Request, res: Response) {
		const user = await myDataSource.getRepository(User).create(req.body);
		const results = await myDataSource.getRepository(User).save(user);

		return res.send(instanceToPlain(results));
	}

	static async updateUser(req: Request, res: Response) {
		const user = ((req as any).user as User);

		myDataSource.getRepository(User).merge(user, req.body);
		const results = await myDataSource.getRepository(User).save(user);

		return res.send(instanceToPlain(results));
	}
}