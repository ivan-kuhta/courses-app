import Courses from './components/Courses/Courses';
import Registration from './components/Registration/Registration';

const routes = [
	{
		path: '/',
		element: <Courses />,
	},
	{
		path: 'registration',
		element: <Registration />,
	},
	{
		path: 'login',
		element: <div>Login</div>,
	},
];

export default routes;
