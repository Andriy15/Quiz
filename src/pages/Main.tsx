import { CreateQuizBtn, StartQuizBtn } from '../ui/buttons'
import { useParams } from 'react-router-dom'
import { fetchQuiz } from '../lib/data'
import { Quiz } from '../models'

export const Quizzes = () => {
	const fetchedQuizzes = fetchQuiz()
	const quizzes = Array.isArray(fetchedQuizzes) ? fetchedQuizzes : []

	if (quizzes.length === 0) {
		return (
			<div>
				<p>No quizzes available</p>
				<CreateQuizBtn />
			</div>
		)
	}

	return (
		<div className="flex flex-wrap justify-around">
			{quizzes.map((quiz: Quiz, i) => (
				<div key={i} className="max-w-sm rounded overflow-hidden shadow-lg m-4">
					<div className="px-6 py-4">
						<div className="font-bold text-xl mb-2">{quiz.title}</div>
						<p className="text-gray-700 text-base">{quiz.description}</p>
					</div>
					<div className="px-6 pt-4 pb-2">
						<StartQuizBtn id={quiz.id} />
					</div>
				</div>
			))}
			<CreateQuizBtn />
		</div>
	)
}