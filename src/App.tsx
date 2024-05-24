import React from 'react'
import { Routes, Route, useParams } from 'react-router-dom'
import { CreateQuiz } from './pages/CreateQuizPage'
import { Main } from './pages/Main'
import { QuizPage } from './pages/QuizPage'
import { EditQuiz } from './pages/EditQuizPage'


export const App = () => {
	return (
		<Routes>
			<Route path='/create' element={<CreateQuiz />} />
			<Route path='/' element={<Main />} />
			<Route path='/quiz/:id' element={<QuizWrapper />} />
			<Route path='/edit/:id' element={<EditQuizWrapper />} />
		</Routes>
	)
}

const QuizWrapper = () => {
	const { id } = useParams()
	return <QuizPage id={Number(id)} />
}

const EditQuizWrapper = () => {
	const { id } = useParams()
	return <EditQuiz id={Number(id)} />
}