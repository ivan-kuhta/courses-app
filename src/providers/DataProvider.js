import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL_API } from '../constants';
import { DataContext } from '../contexts/DataContext';
import useAuthorsHook from '../hooks/useAuthorsHook';
import useCoursesHook from '../hooks/useCoursesHook';

export const Provider = ({ children }) => {
	const { authors, createAuthor, getAuthors, getAuthorsName } =
		useAuthorsHook();
	const { courses, createCourse, getFilterCourses, getCourse } =
		useCoursesHook();

	const [token, setToken] = useState(localStorage.getItem('_token'));
	const [user, setUser] = useState(null);

	const navigate = useNavigate();

	const login = (token, user) => {
		localStorage.setItem('_token', token);
		setToken(localStorage.getItem('_token'));
		setUser(user);
	};

	const logout = () => {
		localStorage.removeItem('_token');
		setToken(localStorage.getItem('_token'));
		navigate('/');
	};

	const fetchMe = async (token) => {
		const response = await fetch(`${URL_API}/users/me`, {
			method: 'GET',
			headers: {
				Authorization: token,
			},
		});
		const { successful, result } = await response.json();

		if (successful) {
			setUser(result);
		}
	};

	useEffect(() => {
		fetchMe(token);
	}, [token]);

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
		setToken,
		login,
		logout,
		user,
	};

	return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
