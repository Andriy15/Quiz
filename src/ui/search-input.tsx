import { Quiz } from '../models'
import { useState } from 'react'

interface Props {
	quiz: Quiz[]
}

export const SearchInput = ({ quiz }: Props) => {
	const [searchQuery, setSearchQuery] = useState('')

	const filteredQuizzes = quiz.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()))

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value)
	}

	return (
		<div className="flex flex-col items-center justify-center">
			<input
				type="text"
				placeholder="Search quiz..."
				onChange={handleSearch}
				value={searchQuery}
				className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline"
			/>
			{searchQuery.length >= 2 && (
				<div className="mt-2 w-full">
					{filteredQuizzes.length > 0 ? (
						<ul className="p-4 bg-white rounded shadow">
							{filteredQuizzes.map((item, i) => (
								<li
									key={i}
									className="text-lg font-bold"
								>
									{item.title}
								</li>
							))}
						</ul>
					) : (
						<div className="text-center mt-4">
							<p className="text-gray-600">No quizzes available</p>
						</div>
					)}
				</div>
			)}
		</div>
	)
}