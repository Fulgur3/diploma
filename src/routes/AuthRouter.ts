import * as express from "express"
import { loginSchema, registerSchema } from "../middleware/schema/UserSchema";
import validateRequestSchema from "../middleware/schema/ValidateRequestSchema";
import { UserMiddleware } from "../middleware/UserMiddleware";
import { AuthController } from "../controller/AuthController";

const router = express.Router();

router.post("/login",
    loginSchema,
    validateRequestSchema,

    AuthController.loginUser
);

router.post("/register",
    registerSchema,
    validateRequestSchema,

    UserMiddleware.isExist,

    AuthController.registerUser
);

export default router;
