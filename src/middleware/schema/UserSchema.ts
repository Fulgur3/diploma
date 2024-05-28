import { Request, Response } from 'express';
import { body } from 'express-validator';

const passwordSchema = (optional = true) => {
	let schema = body('password');
	if (optional) {
		schema.optional();
	}

	return schema.trim().isLength({ min: 8, max: 20 }).withMessage('Your password should be greather then 8 and less then 20 digits.');
};

const confirmPasswordSchema = (optional = true) => {
	let schema = body('confirmPassword')

	return schema.custom(async (confirmPassword, { req }) => {
		const password = req.body.password;
		if (optional) {
			if (password && password !== confirmPassword) {
				throw new Error('Passwords must be same');
			}
		}
		else {
			if (!password || password !== confirmPassword) {
				throw new Error('Passwords must be same');
			}
		}

		return true;
	});
}

const usernameSchema = body('username').trim().notEmpty().isLength({ min: 5, max: 12 }).isAlphanumeric();
const emailSchema = body('email').trim().notEmpty().isEmail();

export const registerSchema = [
	usernameSchema,
	emailSchema,
	passwordSchema(false),
	// confirmPasswordSchema(false)
];

export const loginSchema = [
	body('login').trim().notEmpty(),
	passwordSchema(false),
];

export const updateSchema = [
	passwordSchema(),
	confirmPasswordSchema(),
]
