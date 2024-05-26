import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { myDataSource } from '../database/app-data-source';
import { Quiz } from '../entity/Quiz';

export class QuizController {

	static async getQuizzes(req: Request, res: Response) {
		const quizs = await myDataSource.getRepository(Quiz).find();

		return res.json(instanceToPlain(quizs));
	}

	static async getQuiz(req: Request, res: Response) {
		const quiz = await myDataSource.getRepository(Quiz).findOneBy({
			id: +req.params.id,
		});
	
		return res.send(quiz);
	}

	static async createQuiz(req: Request, res: Response) {
		const { title } = req.body;
		const quiz = await myDataSource.getRepository(Quiz).create({ title, creatorId: 1 });
		const results = await myDataSource.getRepository(Quiz).save(quiz);
	
		return res.send(instanceToPlain(results));
	}

	static async updateQuiz (req: Request, res: Response) {
		const quiz = await myDataSource.getRepository(Quiz).findOneBy({
			id: +req.params.id,
		});
	
		myDataSource.getRepository(Quiz).merge(quiz, req.body);
		const results = await myDataSource.getRepository(Quiz).save(quiz);
	
		return res.send(instanceToPlain(results))
	}

	static async test(req: Request, res: Response) {
		res.status(200).json((req as any).user);
	}
}