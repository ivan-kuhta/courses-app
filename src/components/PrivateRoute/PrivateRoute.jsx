import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getIsAdmin, getUserLoading } from '../../store/user/selectors';

const PrivateRoute = ({ children }) => {
	const isAdmin = useSelector(getIsAdmin);

	const isUserLoading = useSelector(getUserLoading);

	if (isUserLoading) return null;

	return isAdmin ? children : <Navigate to='/courses' replace />;
};

export default PrivateRoute;
