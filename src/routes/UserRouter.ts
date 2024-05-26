import * as express from "express"
import { UserController } from "../controller/UserController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { param } from "express-validator";
import { updateSchema } from "../middleware/schema/UserSchema";
import validateRequestSchema from "../middleware/schema/ValidateRequestSchema";
import { QuizMiddleware } from "../middleware/QuizMiddleware";

const router = express.Router();

router.get('/',
    AuthMiddleware.isAuthorized,

    UserController.getUsers
);

router.get('/:id',
    param('id').isInt(),
    validateRequestSchema,
    AuthMiddleware.isAuthorized,

    UserController.getUser
);

router.put('/',
    AuthMiddleware.isAuthorized,
    updateSchema,
    validateRequestSchema,

    UserController.updateUser
);


//quizzes
//receive your answers in some quiz
router.get('/quiz/:quiz_id/answer',
    param('quiz_id').isInt(),
    validateRequestSchema,

    AuthMiddleware.isAuthorized,
)

//receive the answers of some person in your quiz.
router.get('/:id/quiz/:quiz_id/answer',
    param('id').isInt(),
    param('quiz_id').isInt(),
    validateRequestSchema,

    AuthMiddleware.isAuthorized,
    QuizMiddleware.hasAccess('quiz_id')
);

export default router;
