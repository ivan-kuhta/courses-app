import { URL_API } from '../constants';

export async function getCourses() {
	const res = await fetch(URL_API + '/courses/all');

	const json = await res.json();

	if (!res.ok && !json.successful) {
		const error = { code: res.status, message: json.result || res.statusText };
		throw error;
	}

	return json;
}

export async function getCourse(id) {
	const res = await fetch(URL_API + '/courses/' + id);

	const json = await res.json();

	if (!res.ok && !json.successful) {
		const error = { code: res.status, message: json.result || res.statusText };
		throw error;
	}

	return json;
}

export async function postCourse(data, token) {
	if (validation(data)) {
		const res = await fetch(URL_API + '/courses/add', {
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

export async function putCourse(id, data, token) {
	if (validation(data)) {
		const res = await fetch(URL_API + '/courses/' + id, {
			method: 'PUT',
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

export async function deleteCourse(id, token) {
	const res = await fetch(URL_API + '/courses/' + id, {
		method: 'DELETE',
		headers: {
			Authorization: token,
		},
	});

	const json = await res.json();

	if (!res.ok && !json.successful) {
		const error = { code: res.status, message: json.result || res.statusText };
		throw error;
	}

	return json;
}

export function validation(course) {
	const errors = [];
	if (course.description.length < 2) {
		errors.push({
			message:
				'The length of the description field should be at least 2 characters',
		});
	}

	if (errors.length > 0) throw errors;
	else return true;
}
