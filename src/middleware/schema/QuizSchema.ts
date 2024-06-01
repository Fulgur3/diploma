import { Question } from '../../entity/Question';
import { body } from 'express-validator';

export const createSchema = [
    body('title').trim().notEmpty().isAlphanumeric()
];

export const updateSchema = [
    body('title').optional().trim().notEmpty().isAlphanumeric(),
];