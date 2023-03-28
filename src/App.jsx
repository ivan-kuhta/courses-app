import React, { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { checkAuth } from './store/user/actionCreators';
import { fetchCourses } from './store/courses/actionCreators';
import { fetchAuthors } from './store/authors/actionCreators';
import { getIsAuth } from './store/user/selectors';
import { getLoadingUser } from './store/loadings/selectors';

import Header from './components/Header/Header';

import routes from './routes';

import './App.css';

const App = () => {
	const dispatch = useDispatch();
	const routesElement = useRoutes(routes);
	const isAuth = useSelector(getIsAuth);
	const isLoadingUser = useSelector(getLoadingUser);

	useEffect(() => {
		dispatch(checkAuth());
	}, [dispatch]);

	useEffect(() => {
		if (isAuth) {
			dispatch(fetchCourses);
			dispatch(fetchAuthors);
		}
	}, [dispatch, isAuth]);

	if (isLoadingUser) return <p>Loading...</p>;

	return (
		<div className='app'>
			<Header />
			{routesElement}
		</div>
	);
};

export default App;
