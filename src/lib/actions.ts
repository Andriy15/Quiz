import { setItemToStorage } from '../utils/localStorage'
import { Quiz } from '../models'
import { useNavigate } from 'react-router-dom'

export const createQuiz = (quiz: Quiz, quizzes: Quiz[], navigate: ReturnType<typeof useNavigate>) => {
	const newQuiz = { ...quiz, id: Date.now() }
	setItemToStorage('quiz', [...quizzes, newQuiz])
	navigate('/')
}

export const editQuiz = (id: number, quiz: Quiz, quizzes: Quiz[], navigate: ReturnType<typeof useNavigate>) => {
	const newQuizzes = quizzes.map(item => {
		if (item.id === id) {
			return { ...item, ...quiz }
		}
		return item
	})
	setItemToStorage('quiz', newQuizzes)
	navigate('/')
}

export const deleteQuiz = (id: number, quizzes: Quiz[]) => {
	const newQuizzes = quizzes.filter(item => item.id !== id)
	setItemToStorage('quiz', newQuizzes)
	window.location.reload()
}