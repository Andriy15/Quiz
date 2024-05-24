import { CreateQuizBtn, StartQuizBtn, EditQuizBtn, DeleteQuizBtn } from '../ui/buttons'
import { useFetchQuizzes } from '../lib/data'
import { Quiz } from '../models'
import { SearchInput } from '../ui/search-input'
import { useState } from 'react'

export const Main = () => {
	const { quizzes, loading, error } = useFetchQuizzes()

	if (loading) {
		return <div className="text-center text-lg">Loading...</div>
	}

	if (error) {
		return <div className="text-center text-lg text-red-600">Error: {error}</div>
	}

	return (
		<div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Select a quiz</h1>
				<CreateQuizBtn />
			</div>
			<SearchInput quiz={quizzes} />
			{quizzes.length === 0 ? (
				<div className="text-center mt-4">
					<p className="text-gray-600">No quizzes available</p>
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
					{quizzes.map((quiz: Quiz, i) => (
						<div key={i} className="bg-white rounded-lg shadow-md p-6 transition transform">
							<div className="font-bold text-lg mb-2">{quiz.title}</div>
							<p className="text-gray-700 mb-4">{quiz.description}</p>
							<div className="flex justify-between items-center">
								<StartQuizBtn id={quiz.id} />
								<EditQuizBtn id={quiz.id} />
								<DeleteQuizBtn id={quiz.id} quizzes={quizzes} />
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}
