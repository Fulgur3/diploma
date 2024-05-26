import { generateRandomString, CharacterSetType, Capitalisation } from "ts-randomstring/lib"

import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { myDataSource } from '../database/app-data-source';
import { Session } from '../entity/Session';

export class SessionController {

	static async getSessions(req: Request, res: Response) {
		const sessions = await myDataSource.getRepository(Session).find();

		return res.json(instanceToPlain(sessions));
	}

	static async getSession(req: Request, res: Response) {
		const session = await myDataSource.getRepository(Session).findOneBy({
			id: +req.params.id,
		});
	
		return res.send(instanceToPlain(session));
	}

	static async getSessionByCode(req: Request, res: Response) {
		const session = await myDataSource.getRepository(Session).findOneBy({
			code: req.params.code,
		});

		return res.send(instanceToPlain(session));
	}

	static async createSession(req: Request, res: Response) {
		const code = generateRandomString({
			length: 12,
			charSetType: CharacterSetType.Alphanumeric,
			capitalisation: Capitalisation.Mixed
		});

		req.body.isOpen = req.body.isOpen ?? true;
		const session = await myDataSource.getRepository(Session).create({ ...req.body , code });
		const results = await myDataSource.getRepository(Session).save(session);
	
		return res.send(instanceToPlain(results));
	}

	static async updateSession(req: Request, res: Response) {
		const isOpen = req.body.isOpen;
		
		const session = await myDataSource.getRepository(Session).findOneBy({
			id: +req.params.id,
		});

		myDataSource.getRepository(Session).merge(session, { isOpen });

		const results = await myDataSource.getRepository(Session).save(session);

		return res.send(instanceToPlain(results));
	}

	// get a list of users who have already answered the quiz in this session
	static async getListOfUsers(req: Request, res: Response) {

	}
}