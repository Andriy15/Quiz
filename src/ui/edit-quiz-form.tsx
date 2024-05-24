import { editQuiz } from '../lib/actions'
import { useFormik } from 'formik'
import { Fields, FORM_LABELS, Quiz } from '../models'
import { useNavigate } from 'react-router-dom'
import { useFetchQuizzes } from '../lib/data'
import { FormSchema } from '../schema/schema'
import { BackBtn } from './buttons'

export const Form = ({ quiz }: { quiz: Quiz }) => {
	const { quizzes } = useFetchQuizzes()
	const navigate = useNavigate()

	const formik = useFormik({
		initialValues: {
			title: quiz.title,
			description: quiz.description,
			time: quiz.time,
			questions: quiz.questions,
		},
		validationSchema: FormSchema,
		onSubmit: values => {
			editQuiz(quiz.id, { ...values, id: quiz.id }, quizzes, navigate)
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
		<div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md mt-10">
			<form onSubmit={formik.handleSubmit} className="space-y-6">
				<div>
					<label htmlFor="title" className="block text-sm font-medium text-gray-700">
						{FORM_LABELS[Fields.title]}
					</label>
					<input
						className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						id="title"
						name="title"
						type="text"
						onChange={formik.handleChange}
						value={formik.values.title}
						placeholder="Title"
					/>
					{formik.errors.title && <div className="text-red-500">{formik.errors.title}</div>}
				</div>
				<div>
					<label htmlFor="description" className="block text-sm font-medium text-gray-700">
						{FORM_LABELS[Fields.description]}
					</label>
					<input
						className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						id="description"
						name="description"
						type="text"
						onChange={formik.handleChange}
						value={formik.values.description}
						placeholder="Description"
					/>
					{formik.errors.description && (
						<div className="text-red-500">{formik.errors.description}</div>
					)}
				</div>
				<div>
					<label htmlFor="time" className="block text-sm font-medium text-gray-700">
						{FORM_LABELS[Fields.time]}
					</label>
					<input
						className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						id="time"
						name="time"
						type="number"
						onChange={formik.handleChange}
						value={formik.values.time}
						placeholder="Time (in seconds)"
					/>
					{formik.errors.time && <div className="text-red-500">{formik.errors.time}</div>}
				</div>
				{formik.values.questions.map((question, questionIndex) => (
					<div key={questionIndex} className="space-y-4">
						<label
							htmlFor={`questions.${questionIndex}.question`}
							className="block text-sm font-medium text-gray-700"
						>
							{FORM_LABELS[Fields.question]} {questionIndex + 1}
						</label>
						<input
							className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							id={`questions.${questionIndex}.question`}
							name={`questions.${questionIndex}.question`}
							type="text"
							onChange={formik.handleChange}
							value={question.question}
							placeholder="Question"
						/>
						{question.answers.map((answer, answerIndex) => (
							<div key={answerIndex} className="flex items-center space-x-2 mt-2">
								<input
									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
									id={`questions.${questionIndex}.answers.${answerIndex}.answer`}
									name={`questions.${questionIndex}.answers.${answerIndex}.answer`}
									type="text"
									onChange={formik.handleChange}
									value={answer.answer}
									placeholder="Answer"
								/>
								<input
									className="h-4 w-4"
									type="checkbox"
									id={`questions.${questionIndex}.answers.${answerIndex}.isCorrect`}
									name={`questions.${questionIndex}.answers.${answerIndex}.isCorrect`}
									onChange={formik.handleChange}
									checked={answer.isCorrect}
								/>
								<button
									type="button"
									onClick={() => handleDeleteAnswer(questionIndex, answerIndex)}
									className="ml-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
								>
									Delete
								</button>
							</div>
						))}
						<button
							type="button"
							onClick={() => handleAddAnswer(questionIndex)}
							className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
						>
							Add Answer
						</button>
						<button
							type="button"
							onClick={() => handleDeleteQuestion(questionIndex)}
							className="mt-2 ml-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
						>
							Delete Question
						</button>
					</div>
				))}
				<button
					type="button"
					onClick={handleAddQuestion}
					className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
				>
					Add Question
				</button>
				<button
					type="submit"
					className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
				>
					Edit Quiz
				</button>
				<BackBtn>Cancel</BackBtn>
			</form>
		</div>
	)
}
