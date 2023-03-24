import CourseInfo from './components/CourseInfo/CourseInfo';
import Courses from './components/Courses/Courses';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';

const routes = [
	{
		path: 'courses',
		element: <Courses />,
	},
	{
		path: 'courses/:id',
		element: <CourseInfo />,
	},
	{
		path: 'registration',
		element: <Registration />,
	},
	{
		path: 'login',
		element: <Login />,
	},
];

export default routes;
