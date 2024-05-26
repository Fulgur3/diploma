import { Request, Response } from 'express';
import { myDataSource } from '../database/app-data-source';
import { User } from '../entity/User';
import { UserController } from './UserController';
import { generateToken } from '../TokenManager';

import { instanceToPlain } from 'class-transformer';

export class AuthController {

    static async loginUser(req: Request, res: Response) {

        const { login, password } = req.body;
        const existingUser = await myDataSource.getRepository(User).findOne({ where: [{ email: login }, { username: login }] });

        if (!existingUser) {
            // User with the provided email or username does not exists
            return res.status(400).json({ error: 'User with this username or email does not exist.' });
        }

        const isPasswordMatch = await existingUser.comparePassword(password);

        if (!isPasswordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        
        const token = generateToken(existingUser);
        
        return res.send({ user: instanceToPlain(existingUser), token });
    }

	static async registerUser(req: Request, res: Response) {
		const user = await myDataSource.getRepository(User).create(req.body);
        const savedUsers = await myDataSource.getRepository(User).save(user);

        // If `savedUsers` is an array, extract the first user (assuming one user was saved)
        const newUser = Array.isArray(savedUsers) ? savedUsers[0] : savedUsers;

        // Generate a JWT token for the newly registered user
        const token = generateToken(newUser);

        return res.send({ user: instanceToPlain(newUser), token });
    }
}