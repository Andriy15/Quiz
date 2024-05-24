import { Breadcrumbs } from '../ui/breadcrumbs'
import { Form } from '../ui/edit-quiz-form'
import { useFetchQuizById } from '../lib/data'
import { Quiz } from '../models'
import { useState } from 'react'

interface Props {
	id: number
}

export const EditQuiz = ({ id }: Props) => {
	const { quiz, loading, error } = useFetchQuizById(id)

	if (loading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>{error}</div>
	}

	if (!quiz) {
		return <div>No quiz found</div>
	}

	return (
		<main>
			<Breadcrumbs
				breadcrumbs={[
					{ label: 'Quiz', href: '/' },
					{
						label: 'Edit quiz',
						href: '/edit',
						active: true,
					},
				]}
			/>
			<Form quiz={quiz} />
		</main>
	)
}
