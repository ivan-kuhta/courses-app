import { URL_API } from '../constants';

export async function getCourses() {
	const res = await fetch(URL_API + '/courses/all');

	if (!res.ok) {
		const error = { code: res.status, message: res.statusText };
		throw error;
	}

	return res.json();
}

export async function getCourse(id) {
	const res = await fetch(URL_API + '/courses/' + id);

	if (!res.ok) {
		const error = { code: res.status, message: res.statusText };
		throw error;
	}

	return res.json();
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

		if (!res.ok) {
			const error = { code: res.status, message: res.statusText };
			throw error;
		}

		return res.json();
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

		if (!res.ok) {
			const error = { code: res.status, message: res.statusText };
			throw error;
		}

		return res.json();
	}
}

export async function deleteCourse(id, token) {
	const res = await fetch(URL_API + '/courses/' + id, {
		method: 'DELETE',
		headers: {
			Authorization: token,
		},
	});

	if (!res.ok) {
		const error = { code: res.status, message: res.statusText };
		throw error;
	}

	return res.json();
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
