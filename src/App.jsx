import React from 'react';
import { useRoutes } from 'react-router-dom';

import Header from './components/Header/Header';

import { Provider } from './providers/DataProvider';
import routes from './routes';

import './App.css';

const App = () => {
	const routesElement = useRoutes(routes);
	return (
		<Provider>
			<div className='app'>
				<Header />
				{routesElement}
			</div>
		</Provider>
	);
};

export default App;
