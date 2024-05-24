import React, { useEffect, useState } from 'react'
import { useFetchQuizById } from '../lib/data'
import { BackBtn } from '../ui/buttons'
import clsx from 'clsx'
import Countdown from 'react-countdown'

interface Props {
	id: number;
}

interface CountdownRenderProps {
	hours: number;
	minutes: number;
	seconds: number;
	completed: boolean;
}

export const QuizPage = ({ id }: Props) => {
	const { quiz, loading, error } = useFetchQuizById(id)

	const [currentQuestion, setCurrentQuestion] = useState(0)
	const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
	const [score, setScore] = useState(0)
	const [isCompleted, setIsCompleted] = useState(false)
	const [isTimerCompleted, setIsTimerCompleted] = useState(false)
	const [time, setTime] = useState<number>(0)
	const [isReviewing, setIsReviewing] = useState(false)

	useEffect(() => {
		if (quiz) {
			setSelectedAnswers(new Array(quiz.questions.length).fill(-1))
			setTime(quiz.time * 1000)
		}
	}, [quiz])

	const renderer = ({ hours, minutes, seconds, completed }: CountdownRenderProps) => {
		if (completed) {
			setIsTimerCompleted(true)
		} else {
			return <p>Time remaining: {hours} hours {minutes} minutes {seconds} seconds</p>
		}
	}

	if (loading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error: {error}</div>
	}

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

	if (isCompleted || isTimerCompleted) {
		return (
			<div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
				<h1
					className={clsx(isTimerCompleted ? 'text-red-500' : 'text-gray-500', 'text-2xl font-bold mb-4')}
				>
					{isTimerCompleted ? 'Time is up!' : 'Quiz Completed!'}
				</h1>
				<p className="mb-4">You answered {score} out of {quiz.questions.length} questions correctly.</p>
				<p className="mb-4">Click the button below to go back to the quizzes page.</p>
				<BackBtn />
				<button
					className="inline-block px-6 py-2 ml-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-600 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none"
					onClick={() => {
						setIsReviewing(true)
						setIsCompleted(false)
						setIsTimerCompleted(false)
					}}
				>
					Review answers
				</button>
			</div>
		)
	}

	if (isReviewing) {
		return (
			<div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
				<h1 className="text-2xl font-bold mb-4">Reviewing Answers</h1>
				{quiz.questions.map((question, index) => (
					<div key={index} className="mb-4">
						<h2 className="text-lg font-semibold mb-2">Question {index + 1}:</h2>
						<p className="mb-4">{question.question}</p>
						<p className="mb-4">Your answer: {question.answers[selectedAnswers[index]]?.answer || 'None'}</p>
						<p className="mb-4">Correct answer: {question.answers.find(answer => answer.isCorrect)?.answer || ''}</p>
					</div>
				))}
				<button
					className="px-4 py-2 bg-blue-500 text-white rounded mt-4"
					onClick={() => {
						setIsReviewing(false)
						setIsCompleted(true)
					}}
				>
					Done reviewing
				</button>
			</div>
		)
	}

	return (
		<div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
			<h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
			{quiz && time && (
				<Countdown
					date={Date.now() + time}
					renderer={renderer}
				/>
			)}
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
