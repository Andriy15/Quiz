import React, { useState } from 'react'
import { fetchQuizById } from '../lib/data'
import { BackBtn } from '../ui/buttons'

interface Props {
	id: number;
}

export const QuizPage = ({ id }: Props) => {
	const quiz = fetchQuizById(id)

	const [currentQuestion, setCurrentQuestion] = useState(0)
	const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(quiz?.questions.length).fill(-1))
	const [score, setScore] = useState(0)
	const [isCompleted, setIsCompleted] = useState(false)

	if (!quiz) {
		return <div>No quiz found</div>
	}

	const handleAnswerSelect = (answerIndex: number) => {
		setSelectedAnswers(prev => {
			const copy = [...prev]
			copy[currentQuestion] = answerIndex
			return copy
		})

		if (quiz.questions[currentQuestion].answers[answerIndex].isCorrect) {
			setScore(prev => prev + 1)
		}
	}

	const handleNextQuestion = () => {
		if (currentQuestion === quiz.questions.length - 1) {
			setIsCompleted(true)
		}

		setCurrentQuestion(prev => prev + 1)
	}

	const handlePrevQuestion = () => {
		setCurrentQuestion(prev => prev - 1)
	}

	if (isCompleted) {
		return (
			<div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
				<h1 className="text-2xl font-bold mb-4">Quiz Completed!</h1>
				<p className="mb-4">You answered {score} out of {quiz.questions.length} questions correctly.</p>
				<p className="mb-4">Click the button below to go back to the quizzes page.</p>
				<BackBtn />
			</div>
		)
	}

	return (
		<div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
			<h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
			<div className="mb-4">
				<h2 className="text-lg font-semibold mb-2">Question {currentQuestion + 1} of {quiz.questions.length}:</h2>
				<p className="mb-4">{quiz.questions[currentQuestion].question}</p>
				<div className="space-y-2">
					{quiz.questions[currentQuestion].answers.map((answer, index) => (
						<label key={index} className="flex items-center">
							<input
								type="radio"
								name={`question-${currentQuestion}`}
								value={index}
								checked={selectedAnswers[currentQuestion] === index}
								onChange={() => handleAnswerSelect(index)}
								className="mr-2"
							/>
							{answer.answer}
						</label>
					))}
				</div>
			</div>
			<div className="flex justify-between mt-4">
				<button
					onClick={handlePrevQuestion}
					disabled={currentQuestion === 0}
					className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
				>
					Previous
				</button>
				{currentQuestion === quiz.questions.length - 1 ? (
					<button
						onClick={handleNextQuestion}
						className="px-4 py-2 bg-blue-500 text-white rounded"
					>
						Submit
					</button>
				) : (
					<button
						onClick={handleNextQuestion}
						className="px-4 py-2 bg-blue-500 text-white rounded"
					>
						Next
					</button>
				)}
			</div>
		</div>
	)
}
