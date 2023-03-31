import { URL_API } from '../constants';

export async function getUser(token) {
	const res = await fetch(URL_API + '/users/me', {
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

export async function login(user) {
	const res = await fetch(URL_API + '/login', {
		method: 'POST',
		body: JSON.stringify(user),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (!res.ok) {
		const error = { code: res.status, message: res.statusText };
		throw error;
	}

	return res.json();
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

	if (!res.ok) {
		const error = { code: res.status, message: res.statusText };
		throw error;
	}

	return await res.json();
}
