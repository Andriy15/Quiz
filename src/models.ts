export interface Quiz {
	id: number
	title: string
	description: string
	time: number
	questions: {
		question: string
		answers: {
			answer: string
			isCorrect: boolean
		}[]
	}[]
}

export enum Fields {
	title = 'title',
	description = 'description',
	time = 'time',
	question = 'question',
}

export const FORM_LABELS = {
	[Fields.title]: 'Title',
	[Fields.description]: 'Description',
	[Fields.time]: 'Time (in seconds)',
	[Fields.question]: 'Question',
}

export const ERROR_MESSAGES = {
	required: 'This field is required',
	minQuestions: ({ min }: { min: number }) => `Minimum questions is ${min}`,
	minTimes: ({ min }: { min: number }) => `Minimum time is ${min}`,
}