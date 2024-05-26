import { Question } from '../../entity/Question';
import { body } from 'express-validator';

export const questionsSchema = [
    body('questions').isArray({ min: 1 }).withMessage('Questions array cannot be empty.').custom((questions: Array<any>) => {
        const requiredProps = ['title', 'subtitle', 'type'];
        const availableTypes = Question.getAvailableTypes();

        for (const question of questions) {
            //check if the question is plain object
            if (Object.getPrototypeOf(question) !== Object.getPrototypeOf({}))
                throw new Error('Question must be a plain object.');

            //check all required fields
            for (const prop of requiredProps) {
                if (!(prop in question))
                    throw new Error(`Question must contain an \"${prop}\" property.`);

                if (!question[prop])
                    throw new Error(`Question \"${prop}\" property cannot be empty.`);
            }

            //check question type
            if (!availableTypes.includes(question.type))
                throw new Error(`Question type can't be equal to \"${question.type}\".`);
        }

        return true;
    })
];

export const createSchema = [
    body('title').trim().notEmpty().isAlphanumeric(),
    ...questionsSchema
];

export const updateSchema = [
    body('title').optional().trim().notEmpty().isAlphanumeric(),
    ...questionsSchema
];