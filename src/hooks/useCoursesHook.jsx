import { mockedCoursesList } from '../constants';
import { dateGeneratop } from '../helpers/dateGeneratop';
import { v4 as uuid } from 'uuid';

const useCoursesHook = () => {
	const validationCourse = (course) => {
		const errors = [];
		if (course.description.length < 2) {
			errors.push({
				message:
					'The length of the description field should be at least 2 characters',
			});
		}

		if (errors.length > 0) throw errors;
		else return true;
	};

	const createCourse = (course) => {
		if (validationCourse(course)) {
			const data = {
				id: uuid(),
				...course,
				createDate: dateGeneratop(),
			};

			mockedCoursesList.push(data);
		}
	};

	const getFilterCourses = (query) => {
		return mockedCoursesList.filter(
			(course) =>
				course.id.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
				course.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
		);
	};

	return {
		courses: mockedCoursesList,
		createCourse,
		getFilterCourses,
	};
};

export default useCoursesHook;
