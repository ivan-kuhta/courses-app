import { URL_API } from '../constants';

export class AuthorsServices {
	static URL = URL_API + '/authors/';

	static async getAuthors() {
		const res = await fetch(this.URL + 'all');
		return res.json();
	}

	static validation = (author) => {
		const errors = [];
		if (author.name.trimStart().length === 0) {
			errors.push({
				message: 'The author name field must not be empty',
			});
		}

		if (errors.length > 0) throw errors;
		else return true;
	};
}
