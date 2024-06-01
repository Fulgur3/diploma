import { body } from 'express-validator';

export const answerSchema = [
    body('answer').trim().notEmpty().isAlphanumeric()
];