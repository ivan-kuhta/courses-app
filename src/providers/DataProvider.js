import React from 'react';
import { DataContext } from '../contexts/DataContext';
import useAuthorsHook from '../hooks/useAuthorsHook';
import useCoursesHook from '../hooks/useCoursesHook';

export const Provider = ({ children }) => {
	const { authors, createAuthor, getAuthors } = useAuthorsHook();
	const { courses, createCourse, getFilterCourses } = useCoursesHook();

	const value = {
		courses: courses,
		authors: authors,
		createAuthor,
		createCourse,
		getFilterCourses,
		getAuthors,
	};

	return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
