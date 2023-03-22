import { mockedAuthorsList } from '../constants';
import { v4 as uuid } from 'uuid';

const useAuthorsHook = () => {
	// const [authors, setAuthors] = useState(mockedAuthorsList);

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

			mockedAuthorsList.push(data);
		}
	};

	const getAuthors = (authorIds, selected = true) => {
		return mockedAuthorsList.filter(
			(author) => authorIds.includes(author.id) === selected
		);
	};

	return {
		authors: mockedAuthorsList,
		createAuthor,
		getAuthors,
	};
};

export default useAuthorsHook;
