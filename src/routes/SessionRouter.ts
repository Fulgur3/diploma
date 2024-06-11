import * as express from "express"
import { Request, Response, NextFunction } from 'express';
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { createSchema, updateSchema } from "../middleware/schema/QuizSchema";

import { QuizController } from "../controller/QuizController";
import validateRequestSchema from "../middleware/schema/ValidateRequestSchema";
import { QuizMiddleware } from "../middleware/QuizMiddleware";
import { body, param } from "express-validator";
import { myDataSource } from "../database/app-data-source";
import { Quiz } from "../entity/Quiz";
import { SessionController } from "../controller/SessionController";
import { SessionMiddleware } from "../middleware/SessionMiddleware";
import { QuestionMiddleware } from "../middleware/QuestionMiddleware";
import { answerSchema } from "../middleware/schema/AnswerSchema";
import { User } from "../entity/User";
import { Session } from "../entity/Session";
import { Question } from "../entity/Question";

const router = express.Router();

// find all
router.get('/',
	AuthMiddleware.isAuthorized,
	SessionController.getSessions
);

//find by code
router.get('/:code',
	AuthMiddleware.isAuthorized,
	param('code').notEmpty().isString().isLength({min: 12, max: 12}),
	validateRequestSchema,
	SessionController.getSessionByCode
);

//create
router.post('/',
	AuthMiddleware.isAuthorized,

	body('quizId').notEmpty().isInt().custom(async (quizId) => {
		try {			
			await myDataSource.getRepository(Quiz).findOneByOrFail({
				id: quizId
			});

			return true
		}
		catch (err) {
			throw new Error('Quiz does not exist');
		}
	}),
	body('isOpen').isBoolean().optional(),
	validateRequestSchema,
	SessionController.createSession
);

//update
router.put('/:id',
	AuthMiddleware.isAuthorized,
	body('isOpen').isBoolean(),
	validateRequestSchema,
	SessionMiddleware.isExist(),
	SessionMiddleware.hasAccess(),
	SessionController.updateSession
);

// post user answer
router.post('/:session_id/question/:question_id/answer',
	answerSchema,
	validateRequestSchema,
	AuthMiddleware.isAuthorized,
	SessionMiddleware.isExist('params', 'session_id'),
	SessionMiddleware.isOpen,
	QuestionMiddleware.isExist,
	async (req: Request, res: Response, next: NextFunction) => {
        try {
            const question = await ((req as any).question as Question);
			const session = await ((req as any).session as Session);

			if (!session.quiz.questions.some(q => q.id == question.id))
				throw new Error();

			next();
        }
        catch (error) {
            return res.sendStatus(403);
        }
	},
	SessionController.postUserAnswer
);

export default router;
