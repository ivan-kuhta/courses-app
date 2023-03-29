import { URL_API } from '../constants';

export async function getCourses() {
	const res = await fetch(URL_API + '/courses/all');
	return res.json();
}

export async function validation(course) {
	const errors = [];
	if (course.description.length < 2) {
		errors.push({
			message:
				'The length of the description field should be at least 2 characters',
		});
	}

	return errors.length > 0 ? errors : true;
}
