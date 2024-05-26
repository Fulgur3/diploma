import * as jwt from 'jsonwebtoken';
import { User } from './entity/User';

interface JwtPayload {
    id: number;
    username: string;
    email: string;
}

export const generateToken = (user: User): string => {
    const payload: JwtPayload = {
        id: user.id,
        username: user.username,
        email: user.email,
    };

    // Generate a signed JWT token with the user payload and secret key
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    return token;
};

export const verifyToken = (token: string): JwtPayload | null => {
    //this function can throw error which will be handled in the AuthMiddleware
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    return decoded;
};
