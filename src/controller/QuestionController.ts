import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { myDataSource } from '../database/app-data-source';
import { Text } from '../entity/Text';

import { Question } from '../entity/Question';
import { Choice } from '../entity/Choice';

export class QuestionController {
    static async getQuestion(req: Request, res: Response) {
        const results = await myDataSource.getRepository(Question).findOneBy({ id: +req.params.question_id });
        return res.send(results);
    }

    static async createQuestion(req: Request, res: Response) {
        const quizId = +req.params.quiz_id;
		const { title, subtitle, type, options } = req.body;
		const question = await myDataSource.getRepository(Question).create({ title, subtitle, type, quizId });
        const createdQuestion = await myDataSource.getRepository(Question).save(question);

        switch (type) {
            case Question.getAvailableTypes()[0]:
                await QuestionController.createTextOption(options[0], createdQuestion.id);
                break;
            default:
                await QuestionController.createChoiceOption(options, createdQuestion.id);
                break;
        }

        const results = await myDataSource.getRepository(Question).findOneBy({ id: createdQuestion.id })
	
		return res.send(instanceToPlain(results))
	}

    static async updateQuestion(req: Request, res: Response) {

        QuestionController.deleteQuestion(req, res);

        return QuestionController.createQuestion(req, res);
	}

	static async deleteQuestion(req: Request, res: Response) {
		const question = await myDataSource.getRepository(Question).findOneBy({
			id: +req.params.id,
        });
        
        await myDataSource.getRepository(Question).remove(question);
    }
    
    static async createTextOption(optionData, questionId) {
        const { answer } = optionData;
        const option = await myDataSource.getRepository(Text).create({ answer, questionId});
        await myDataSource.getRepository(Text).save(option);
    }

    static async createChoiceOption(optionsData, questionId) {
        optionsData.forEach(async ({label, value}) => {
            const option = await myDataSource.getRepository(Choice).create({ label, value, questionId });
            await myDataSource.getRepository(Choice).save(option);
        });
    }
}