import { Navigate } from 'react-router-dom';
import CourseInfo from './components/CourseInfo/CourseInfo';
import Courses from './components/Courses/Courses';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import CourseForm from './components/CourseForm/CourseForm';

const routes = [
	{
		path: '/registration',
		element: <Registration />,
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/courses',
		element: <Courses />,
	},
	{
		path: '/courses/:id',
		element: <CourseInfo />,
	},
	{
		path: '/courses/add',
		element: <CourseForm />,
		isPrivate: true,
	},
	{
		path: '/courses/update/:id',
		element: <CourseForm />,
		isPrivate: true,
	},
	{
		path: '*',
		element: <Navigate to='/login' replace />,
	},
];

export default routes;
