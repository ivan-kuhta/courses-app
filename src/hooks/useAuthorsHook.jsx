import { useState } from 'react';

import { v4 as uuid } from 'uuid';
import { mockedAuthorsList } from '../constants';

const useAuthorsHook = () => {
	const [authors, setAuthors] = useState(mockedAuthorsList);

	const validationAuthor = (author) => {
		const errors = [];
		if (author.name.length === 0) {
			errors.push({
				message: 'The author name field must not be empty',
			});
		}

		if (errors.length > 0) throw errors;
		else return true;
	};

	const createAuthor = (author) => {
		if (validationAuthor(author)) {
			const data = {
				id: uuid(),
				...author,
			};

			setAuthors([...authors, data]);
		}
	};

	const getAuthors = (authorIds, selected = true) =>
		authors.filter((author) => authorIds.includes(author.id) === selected);

	const getAuthorsName = (authorIds) =>
		getAuthors(authorIds)
			.map(({ name }) => name)
			.join(', ');

	return {
		authors,
		createAuthor,
		getAuthors,
		getAuthorsName,
	};
};

export default useAuthorsHook;
