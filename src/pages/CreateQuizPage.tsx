import { Breadcrumbs } from '../ui/breadcrumbs'
import { Form } from '../ui/create-quiz-form'

export const CreateQuiz = () => {
	return (
		<div>
			<Breadcrumbs
				breadcrumbs={[
					{ label: 'Home', href: '/' },
					{
						label: 'Create Quiz',
						href: '/create',
						active: true,
					},
				]}
			/>
			<Form />
		</div>
	)
}