import React from 'react';
import { useRoutes } from 'react-router-dom';

import Header from './components/Header/Header';

import routes from './routes';

import './App.css';

const App = () => {
	const routesElement = useRoutes(routes);

	return (
		<div className='app'>
			<Header />
			{routesElement}
		</div>
	);
};

export default App;
