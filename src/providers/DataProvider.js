import React, { useEffect, useState } from 'react';
import { DataContext } from '../contexts/DataContext';
import useAuthorsHook from '../hooks/useAuthorsHook';
import useCoursesHook from '../hooks/useCoursesHook';

export const Provider = ({ children }) => {
	const { authors, createAuthor, getAuthors, getAuthorsName } =
		useAuthorsHook();
	const { courses, createCourse, getFilterCourses, getCourse } =
		useCoursesHook();

	const [token, setToken] = useState(null);
	const [user, setUser] = useState(null);

	const login = (token, user) => {
		localStorage.setItem('_token', token);
		setToken(localStorage.getItem('_token'));
		setUser(user);
	};

	const logout = () => {
		localStorage.removeItem('_token');
		setToken(localStorage.getItem('_token'));
	};

	useEffect(() => {
		const token = localStorage.getItem('_token');
		if (token) {
			setToken(token);
		} else {
			setToken(null);
		}
	}, []);

	const value = {
		courses: courses,
		authors: authors,
		createAuthor,
		createCourse,
		getFilterCourses,
		getAuthors,
		getAuthorsName,
		getCourse,
		token,
		login,
		logout,
		user,
	};

	return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
