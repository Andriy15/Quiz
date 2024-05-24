import { Link } from 'react-router-dom'
import { deleteQuiz } from '../lib/actions'
import { Quiz } from '../models'

interface Props {
	id: number
}

interface DeleteProps {
	id: number
	quizzes: Quiz[]
}

export const CreateQuizBtn = () => {
	return (
		<Link to="/create" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
			Create Quiz
		</Link>
	)
}

export const StartQuizBtn = ({ id }: Props) => {
	return (
		<Link
			to={`/quiz/${id}`}
			className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-600 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none"
		>
			Start Quiz
		</Link>
	)
}

export const BackBtn = () => {
	return (
		<Link
			to="/"
			className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-600 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none"
		>
			Back
		</Link>
	)
}

export const EditQuizBtn = ({ id }: Props) => {
	return (
		<Link
			to={`/edit/${id}`}
			className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-600 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none"
		>
			Edit Quiz
		</Link>
	)
}

export const DeleteQuizBtn = ({ id, quizzes }: DeleteProps) => {
	return (
		<button
			className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-red-600 rounded shadow ripple hover:shadow-lg hover:bg-red-800 focus:outline-none"
			onClick={() => deleteQuiz(id, quizzes)}
		>
			Delete Quiz
		</button>
	)
}
