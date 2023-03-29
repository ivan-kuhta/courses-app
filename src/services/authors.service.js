import { URL_API } from '../constants';

export async function getAuthors() {
	const res = await fetch(URL_API + '/authors/all');
	return res.json();
}

export async function validation(author) {
	const errors = [];
	if (author.name.trimStart().length === 0) {
		errors.push({
			message: 'The author name field must not be empty',
		});
	}

	return errors.length > 0 ? errors : true;
}
