import React from 'react';

import Courses from './components/Courses/Courses';
import Header from './components/Header/Header';

import { Provider } from './providers/DataProvider';

import './App.css';

const App = () => {
	return (
		<Provider>
			<div className='app'>
				<Header />
				<Courses />
			</div>
		</Provider>
	);
};

export default App;
