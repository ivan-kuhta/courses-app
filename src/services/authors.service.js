import { URL_API } from '../constants';

export async function getAuthors() {
	const res = await fetch(URL_API + '/authors/all');

	if (!res.ok) {
		const error = { code: res.status, message: res.statusText };
		throw error;
	}

	return res.json();
}

export async function postAuthor(data, token) {
	if (validation(data)) {
		const res = await fetch(URL_API + '/authors/add', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
		});

		if (!res.ok) {
			const error = { code: res.status, message: res.statusText };
			throw error;
		}

		return res.json();
	}
}

export function validation(author) {
	const errors = [];
	if (author.name.trimStart().length === 0) {
		errors.push({
			message: 'The author name field must not be empty',
		});
	}

	if (errors.length > 0) throw errors;
	else return true;
}
