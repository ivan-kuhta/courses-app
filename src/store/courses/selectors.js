export const getCourses = ({ courses }) => courses;

export const getCourseById =
	(courseId) =>
	({ courses }) =>
		courses.find(({ id }) => id === courseId);

export const getFilterCourses =
	(query) =>
	({ courses }) =>
		courses.filter(
			(course) =>
				course.id.toLowerCase().includes(query.toLowerCase()) ||
				course.title.toLowerCase().includes(query.toLowerCase())
		);
