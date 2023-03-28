import React, { useContext, useEffect, useState } from 'react';

import Button from '../../common/Button/Button';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import { TEXT_ADD_NEW_COURSE } from '../../constants';

import { dateGeneratop } from '../../helpers/dateGeneratop';
import { pipeDuration } from '../../helpers/pipeDuration';

import { DataContext } from '../../contexts/DataContext';

import styles from './courses.module.css';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
	const navigate = useNavigate();
	const { getFilterCourses, getAuthorsName, token } = useContext(DataContext);

	const [query, setQuery] = useState('');

	useEffect(() => {
		if (!token) navigate('/');
	}, [navigate, token]);

	return (
		<div className={styles.container}>
			<>
				<header className={styles.header}>
					<SearchBar handleSearch={(query) => setQuery(query)} />
					<Button
						text={TEXT_ADD_NEW_COURSE}
						onClick={() => navigate('/courses/add')}
					/>
				</header>
				<div className={styles.list}>
					{getFilterCourses(query).map(
						({ id, authors, duration, creationDate, ...course }) => (
							<CourseCard
								key={id}
								{...course}
								id={id}
								authors={getAuthorsName(authors)}
								duration={pipeDuration(duration) + ' hours'}
								creationDate={dateGeneratop(creationDate)}
							/>
						)
					)}
				</div>
			</>
		</div>
	);
};

export default Courses;
