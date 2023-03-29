export const getCourses = (state) => state.courses;

export const getCourseById = (id) => (state) =>
	state.courses.find((course) => course.id === id);

export const getFilterCourses = (query) => (state) =>
	state.courses.filter(
		(course) =>
			course.id.toLowerCase().includes(query.toLowerCase()) ||
			course.title.toLowerCase().includes(query.toLowerCase())
	);
