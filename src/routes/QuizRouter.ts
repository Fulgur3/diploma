import * as express from "express"

import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { questionsSchema, createSchema, updateSchema } from "../middleware/schema/QuizSchema";

import { QuizController } from "../controller/QuizController";
import validateRequestSchema from "../middleware/schema/ValidateRequestSchema";
import { QuizMiddleware } from "../middleware/QuizMiddleware";

const router = express.Router();

//find all
router.get('/', QuizController.getQuizzes);

//find by id
router.get('/:id',
	AuthMiddleware.isAuthorized,
	QuizMiddleware.hasAccess(),

	QuizController.getQuiz
);

//create
router.post('/',
	createSchema,
	validateRequestSchema,

	AuthMiddleware.isAuthorized,

	QuizController.createQuiz
);

//update
router.put("/:id",
	updateSchema,
	validateRequestSchema,

	AuthMiddleware.isAuthorized,
	QuizMiddleware.hasAccess(),

	QuizController.updateQuiz
);

router.post('/test',
	questionsSchema,
	validateRequestSchema,

	AuthMiddleware.isAuthorized,

	QuizController.test
);

export default router;
