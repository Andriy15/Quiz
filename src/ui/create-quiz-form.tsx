import { useFormik } from 'formik'
import { createQuiz } from '../lib/actions'
import { useFetchQuizzes } from '../lib/data'
import { useNavigate } from 'react-router-dom'
import { Fields, FORM_LABELS } from '../models'
import { FormSchema } from '../schema/schema'

export const Form = () => {
	const { quizzes } = useFetchQuizzes()
	const navigate = useNavigate()

	const formik = useFormik({
		initialValues: {
			title: '',
			description: '',
			time: 0,
			questions: [
				{
					question: '',
					answers: [
						{
							answer: '',
							isCorrect: false,
						},
					],
				},
			],
		},
		validationSchema: FormSchema,
		onSubmit: values => {
			createQuiz({ ...values, id: Date.now() }, quizzes, navigate)
		},
	})

	const handleAddQuestion = () => {
		formik.setFieldValue('questions', [
			...formik.values.questions,
			{
				question: '',
				answers: [
					{
						answer: '',
						isCorrect: false,
					},
				],
			},
		])
	}

	const handleDeleteQuestion = (questionIndex: number) => {
		const newQuestions = [...formik.values.questions]
		newQuestions.splice(questionIndex, 1)
		formik.setFieldValue('questions', newQuestions)
	}

	const handleAddAnswer = (questionIndex: number) => {
		const newQuestions = [...formik.values.questions]
		newQuestions[questionIndex].answers.push({
			answer: '',
			isCorrect: false,
		})
		formik.setFieldValue('questions', newQuestions)
	}

	const handleDeleteAnswer = (questionIndex: number, answerIndex: number) => {
		const newQuestions = [...formik.values.questions]
		newQuestions[questionIndex].answers.splice(answerIndex, 1)
		formik.setFieldValue('questions', newQuestions)
	}

	return (
		<div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
			<form onSubmit={formik.handleSubmit} className="space-y-4">
				<div>
					<label className="block text-gray-700 font-bold mb-2">{FORM_LABELS[Fields.title]}</label>
					<input
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						type="text"
						onChange={formik.handleChange}
						value={formik.values.title}
						placeholder="Title"
					/>
					{formik.errors.title && <div className="text-red-500">{formik.errors.title}</div>}
				</div>
				<div>
					<label className="block text-gray-700 font-bold mb-2">{FORM_LABELS[Fields.description]}</label>
					<input
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						type="text"
						onChange={formik.handleChange}
						value={formik.values.description}
						placeholder="Description"
					/>
					{formik.errors.description && <div className="text-red-500">{formik.errors.description}</div>}
				</div>
				<div>
					<label className="block text-gray-700 font-bold mb-2">{FORM_LABELS[Fields.time]}</label>
					<input
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						type="number"
						onChange={formik.handleChange}
						value={formik.values.time}
						placeholder="Time (in seconds)"
					/>
					{formik.errors.time && <div className="text-red-500">{formik.errors.time}</div>}
				</div>
				{formik.values.questions.map((question, index) => (
					<div key={index} className="space-y-2">
						<label className="block text-gray-700 font-bold mb-2">{FORM_LABELS[Fields.question]}</label>
						<input
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							type="text"
							onChange={formik.handleChange}
							value={question.question}
							placeholder="Question"
						/>
						{question.answers.map((answer, answerIndex) => (
							<div key={answerIndex} className="flex items-center space-x-2">
								<label className="sr-only">Answer</label>
								<input
									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
									type="text"
									onChange={formik.handleChange}
									value={answer.answer}
									placeholder="Answer"
								/>
								<input
									className="h-4 w-4"
									type="checkbox"
									onChange={formik.handleChange}
									checked={answer.isCorrect}
								/>
								<button
									type="button"
									onClick={() => handleDeleteAnswer(index, answerIndex)}
									className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500"
								>
									Delete
								</button>
							</div>
						))}
						<button
							type="button"
							onClick={() => handleAddAnswer(index)}
							className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
						>
							Add Answer
						</button>
						<button
							type="button"
							onClick={() => handleDeleteQuestion(index)}
							className="ml-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
						>
							Delete Question
						</button>
					</div>
				))}
				<button
					type="button"
					onClick={handleAddQuestion}
					className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
				>
					Add Question
				</button>
				<button
					type="submit"
					className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
				>
					Submit
				</button>
			</form>
		</div>
	)
}
