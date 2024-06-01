import * as express from "express"
import { UserController } from "../controller/UserController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { param } from "express-validator";
import { updateSchema } from "../middleware/schema/UserSchema";
import validateRequestSchema from "../middleware/schema/ValidateRequestSchema";
import { QuizMiddleware } from "../middleware/QuizMiddleware";
import { UserMiddleware } from "../middleware/UserMiddleware";
import { SessionMiddleware } from "../middleware/SessionMiddleware";

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
router.get('/:id/session/:session_id/answer',
    UserMiddleware.isExist,
    SessionMiddleware.isExist('params', 'session_id'),
    
    UserController.getAnswersBySession
);

export default router;
