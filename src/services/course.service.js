import { mockedAuthorsList, mockedCoursesList } from '../constants';
import { v4 as uuid } from 'uuid';
import { dateGeneratop } from '../helpers/dateGeneratop';

class CourseService {
	addCourse(course) {
		const data = {
			id: uuid(),
			...course,
			createDate: dateGeneratop(),
		};

		if (CourseService.validateCourse(data)) {
			mockedCoursesList.push(data);
		}
	}

	addAuthor(author) {
		const data = {
			id: uuid(),
			...author,
		};
		mockedAuthorsList.push(data);
	}

	getAuthors(authorIds, selected = true) {
		return mockedAuthorsList.filter(
			(author) => authorIds.includes(author.id) === selected
		);
	}

	getFilterCourses(query) {
		return mockedCoursesList.filter(
			(course) =>
				course.id.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
				course.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
		);
	}

	static validateCourse(course) {
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

const courseService = new CourseService();

export default courseService;
