export const getCourses = (state) => state.courses;

export const getCourseById = (id) => (state) =>
	state.courses.find((course) => course.id === id);

export const getFilterCourses = (query) => (state) =>
	state.courses.filter(
		(course) =>
			course.id.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
			course.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
	);
