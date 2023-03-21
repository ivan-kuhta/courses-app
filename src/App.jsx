import React from 'react';

import Courses from './components/Courses/Courses';
import Header from './components/Header/Header';

import './App.css';

const App = () => {
	return (
		<div className='app'>
			<Header />
			<Courses />
		</div>
	);
};

export default App;
