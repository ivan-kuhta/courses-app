import React, { useContext } from 'react';
import { useRoutes } from 'react-router-dom';

import Header from './components/Header/Header';

import { getRoutes } from './routes';

import './App.css';
import { DataContext } from './contexts/DataContext';

const App = () => {
	const { token } = useContext(DataContext);

	const routesElement = useRoutes(getRoutes(token));

	return (
		<div className='app'>
			<Header />
			{routesElement}
		</div>
	);
};

export default App;
