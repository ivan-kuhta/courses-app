import { URL_API } from '../constants';

export class CoursesServices {
	static URL = URL_API + '/courses/';

	static async getCourses() {
		const res = await fetch(this.URL + 'all');
		return res.json();
	}

	static validation(course) {
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
}
