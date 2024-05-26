import { Request, Response, NextFunction } from 'express';
import { myDataSource } from '../database/app-data-source';
import { User } from '../entity/User';
import { generateToken, verifyToken } from '../TokenManager';


// import jwt lib

export class AuthMiddleware {
	static async isAuthorized(req: Request, res: Response, next: NextFunction) {
		const accessToken = req.headers['authorization'];
		if (!accessToken)
			return res.status(401).json({ error: 'Access token is missing.' });
	
		try {
			// Verify the access token
			const token = accessToken.split(' ')[1]; // Extract token from 'Bearer <token>'
			const decodedToken = verifyToken(token);
			
			const { id } = decodedToken;
			
			(req as any).user = await myDataSource.getRepository(User).findOneBy({ id });
	
			// Continue to the next middleware or route handler
			next();
		} catch (error) {
			// Token verification failed
			return res.status(401).json({ error: 'Invalid access token' });
		}
	}
}