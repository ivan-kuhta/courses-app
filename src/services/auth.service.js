import { URL_API } from '../constants';

export async function getUser(token) {
	const res = await fetch(URL_API + '/users/me', {
		headers: {
			Authorization: token,
		},
	});

	return res.json();
}

export async function login(user) {
	const res = await fetch(this.URL + 'login', {
		method: 'POST',
		body: JSON.stringify(user),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	return res.json();
}

export async function logout(token) {
	return fetch(this.URL + 'logout', {
		method: 'DELETE',
		headers: {
			Authorization: token,
		},
	});
}

export async function register(user) {
	const res = await fetch(`${URL_API}/register`, {
		method: 'POST',
		body: JSON.stringify(user),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	return await res.json();
}
