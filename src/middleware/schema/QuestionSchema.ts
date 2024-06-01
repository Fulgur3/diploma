import { Question } from '../../entity/Question';
import { body } from 'express-validator';

export const questionsSchema = [
	body('title').notEmpty().isAlphanumeric().isLength({ min: 1, max: 200 }),
	body('subtitle').notEmpty().isAlphanumeric().isLength({ min: 1, max: 200 }),
	body('type').isIn(Question.getAvailableTypes()),
	body('options').isArray().custom((options, { req }) => {
		const type = req.body.type;

		console.log(options);

		switch (type) {
			case Question.getAvailableTypes()[0]:
				if (options.length != 1)
					throw new Error('Question must contain one option.');

				const { answer } = options[0];

				if (!answer || !answer.length || answer.length > 40)
					throw new Error('Question answer lenth must be greather then 1 and less then 40 characters.');

				break;
			default:
				if (options.length < 2) {
					throw new Error('Question must contain greather then one option');
				}
				var answerIsExist = false;
				options.forEach(option => {
					const { label, value } = option;

					if (!label || !label.length || label.length > 40)
						throw new Error('Question options label lenth must be greather then 1 and less then 40 characters.');

					if (value) answerIsExist = true;
				});

				if (!answerIsExist)
					throw new Error('Question options must contain correct answer option');

				break;
		}

		return true;
	})
];