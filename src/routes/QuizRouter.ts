import * as express from "express"

import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { createSchema, updateSchema } from "../middleware/schema/QuizSchema";
import { questionsSchema } from "../middleware/schema/QuestionSchema";

import { QuizController } from "../controller/QuizController";
import validateRequestSchema from "../middleware/schema/ValidateRequestSchema";
import { QuizMiddleware } from "../middleware/QuizMiddleware";
import { QuestionController } from "../controller/QuestionController";
import { QuestionMiddleware } from "../middleware/QuestionMiddleware";

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
router.put("/:quiz_id",
	updateSchema,
	validateRequestSchema,

	AuthMiddleware.isAuthorized,
	QuizMiddleware.hasAccess('quiz_id'),

	QuizController.updateQuiz
);

//create new question
router.post("/:quiz_id/question",
	questionsSchema,
	validateRequestSchema,
	AuthMiddleware.isAuthorized,
	QuizMiddleware.hasAccess('quiz_id'),
	QuestionController.createQuestion
);

router.post("/:quiz_id/question/:question_id",
	questionsSchema,
	validateRequestSchema,
	AuthMiddleware.isAuthorized,
	QuizMiddleware.hasAccess('quiz_id'),
	QuestionMiddleware.isExist,
	QuestionController.createQuestion
);

router.get("/:quiz_id/question/:question_id",
	QuestionController.getQuestion
)

export default router;
