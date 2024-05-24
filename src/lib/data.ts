import { getItemFromStorage } from '../utils/localStorage'
import { Quiz } from '../models'
import { useEffect, useState } from 'react'

export const fetch = (): Promise<Quiz[]> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const data = getItemFromStorage('quiz')

			if (!data) {
				console.log('No data in local storage')
				reject('No data in local storage')
			}

			resolve(data)
		}, 1000)
	})
}

export const useFetchQuizzes = () => {
	const [quizzes, setQuizzes] = useState<Quiz[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string>('')

	async function fetchQuizData(): Promise<void> {
		try {
			setLoading(true)
			const data = await fetch()
			setQuizzes(data)
			setLoading(false)
		} catch (error: any) {
			setError(error.message)
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchQuizData()
	}, [])


	return { quizzes, loading, error }
}

export const useFetchQuizById = (id: number) => {
	const [quiz, setQuiz] = useState<Quiz>()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string>('')

	async function fetchQuizData(): Promise<void> {
		try {
			setLoading(true)
			const data = await fetch()
			const res = data.find(item => item.id === id)

			if (!res) {
				throw new Error('No item found')
			}

			setQuiz(res)
			setLoading(false)
		} catch (error: any) {
			setError(error.message)
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchQuizData()
	}, [])


	return { quiz, loading, error }
}