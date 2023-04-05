import { URL_API } from '../constants';

export async function getUser(token) {
	const res = await fetch(URL_API + '/users/me', {
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

export async function login(user) {
	const res = await fetch(URL_API + '/login', {
		method: 'POST',
		body: JSON.stringify(user),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const json = await res.json();

	if (!res.ok && !json.successful) {
		const error = { code: res.status, message: json.result || res.statusText };
		throw error;
	}

	return json;
}

export async function logout(token) {
	return fetch(URL_API + '/logout', {
		method: 'DELETE',
		headers: {
			Authorization: token,
		},
	});
}

export async function register(user) {
	const res = await fetch(URL_API + '/register', {
		method: 'POST',
		body: JSON.stringify(user),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const json = await res.json();

	if (!res.ok && !json.successful) {
		const error = { code: res.status, message: json.result || res.statusText };
		throw error;
	}

	return json;
}
