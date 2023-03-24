import { Navigate } from 'react-router-dom';
import CourseInfo from './components/CourseInfo/CourseInfo';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';

const routes = [
	{
		path: 'registration',
		element: <Registration />,
	},
	{
		path: 'login',
		element: <Login />,
	},
	{
		path: 'courses',
		element: <Courses />,
	},
	{
		path: 'courses/add',
		element: <CreateCourse />,
	},
	{
		path: 'courses/:id',
		element: <CourseInfo />,
	},
	{
		path: '*',
		element: <Navigate to='/login' />,
	},
];

export default routes;
