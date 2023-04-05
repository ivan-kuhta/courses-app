import { URL_API } from '../constants';

export async function getAuthors() {
	const res = await fetch(URL_API + '/authors/all');

	const json = await res.json();

	if (!res.ok && !json.successful) {
		const error = { code: res.status, message: json.result || res.statusText };
		throw error;
	}

	return json;
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

		const json = await res.json();

		if (!res.ok && !json.successful) {
			const error = {
				code: res.status,
				message: json.result || res.statusText,
			};
			throw error;
		}

		return json;
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
