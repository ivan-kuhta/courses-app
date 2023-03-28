import { URL_API } from '../constants';

export class AuthService {
	static URL = URL_API + '/';

	static async getUser(token) {
		const res = await fetch(this.URL + 'users/me', {
			headers: {
				Authorization: token,
			},
		});

		return res.json();
	}

	static async login(user) {
		const res = await fetch(this.URL + 'login', {
			method: 'POST',
			body: JSON.stringify(user),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return res.json();
	}

	static async logout(token) {
		return fetch(this.URL + 'logout', {
			method: 'DELETE',
			headers: {
				Authorization: token,
			},
		});
	}

	static async register(user) {
		const res = await fetch(`${URL_API}/register`, {
			method: 'POST',
			body: JSON.stringify(user),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return await res.json();
	}
}