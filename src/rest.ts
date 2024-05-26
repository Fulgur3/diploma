import * as express from 'express';
import UserRouter from "./routes/UserRouter";
import QuizRouter from "./routes/QuizRouter";
import AuthRouter from './routes/AuthRouter';
import SessionRouter from './routes/SessionRouter';

export function setupRoutes(app: express.Application) {
	app.use('/api/auth', AuthRouter);
	app.use('/api/user', UserRouter);
	app.use('/api/quiz', QuizRouter);
	app.use('/api/session', SessionRouter);
}
