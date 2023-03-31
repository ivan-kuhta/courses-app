import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUser } from './store/user/thunk';
import { getUserLoading } from './store/user/selectors';
import { getAuthorsLoading } from './store/authors/selectors';
import { getCoursesLoading } from './store/courses/selectors';

import Header from './components/Header/Header';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Loading from './components/Loading/Loading';

import routes from './routes';

import './App.css';

const App = () => {
	const dispatch = useDispatch();

	const isUserLoading = useSelector(getUserLoading);
	const isAuthorsLoading = useSelector(getAuthorsLoading);
	const isCoursesLoading = useSelector(getCoursesLoading);

	useEffect(() => {
		dispatch(fetchUser());
	}, [dispatch]);

	return (
		<div className='app'>
			{(isUserLoading || isAuthorsLoading || isCoursesLoading) && (
				<Loading color={'purple'} />
			)}
			<Header />
			<Routes>
				{routes.map(({ path, element, isPrivate }, index) =>
					!isPrivate ? (
						<Route key={index} path={path} element={element} exact />
					) : (
						<Route
							key={index}
							path={path}
							element={<PrivateRoute>{element}</PrivateRoute>}
						/>
					)
				)}
			</Routes>
		</div>
	);
};

export default App;
