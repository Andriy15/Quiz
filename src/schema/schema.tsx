import * as yup from 'yup';
import { ERROR_MESSAGES, Fields } from '../models'

export const FormSchema = yup.object().shape({
	[Fields.title]: yup
		.string()
		.required(ERROR_MESSAGES.required),
	[Fields.description]: yup
		.string()
		.required(ERROR_MESSAGES.required),
	[Fields.time]: yup
		.number()
		.required(ERROR_MESSAGES.required)
		.min(10, ERROR_MESSAGES.minTimes({ min: 10 })),
	[Fields.question]: yup.array().of(
		yup.object().shape({
			question: yup.string().required(ERROR_MESSAGES.required),
			answers: yup.array().of(
				yup.object().shape({
					answer: yup.string().required(ERROR_MESSAGES.required),
					isCorrect: yup.boolean().required(ERROR_MESSAGES.required),
				}),
			),
		}),
	).min(1, ERROR_MESSAGES.minQuestions({ min: 1 }))
})
