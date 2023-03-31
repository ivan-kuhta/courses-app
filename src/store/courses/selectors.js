export const getCourses = ({ courses: { items } }) => items;

export const getCourseById =
	(courseId) =>
	({ courses: { items } }) =>
		items.find(({ id }) => id === courseId);

export const getFilterCourses =
	(query) =>
	({ courses: { items } }) =>
		items.filter(
			(course) =>
				course.id.toLowerCase().includes(query.toLowerCase()) ||
				course.title.toLowerCase().includes(query.toLowerCase())
		);

export const getCoursesLoading = ({ courses: { loading } }) => loading;
export const getCoursesErrors = ({ courses: { errors } }) => errors;
