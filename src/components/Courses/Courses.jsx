import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getIsAuth } from '../../store/user/selectors';
import { getFilterCourses } from '../../store/courses/selectors';

import Button from '../../common/Button/Button';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import { TEXT_ADD_NEW_COURSE } from '../../constants';

import { pipeDuration } from '../../helpers/pipeDuration';

import { transformDate } from '../../helpers/transformDate';

import styles from './courses.module.css';

const Courses = () => {
	const navigate = useNavigate();

	const [query, setQuery] = useState('');

	const courses = useSelector(getFilterCourses(query));

	const isAuth = useSelector(getIsAuth);

	useEffect(() => {
		if (!isAuth) navigate('/');
	}, [isAuth, navigate]);

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
					{courses.map(({ id, authors, duration, creationDate, ...course }) => (
						<CourseCard
							key={id}
							{...course}
							id={id}
							authors={authors}
							duration={pipeDuration(duration) + ' hours'}
							creationDate={transformDate(creationDate)}
						/>
					))}
				</div>
			</>
		</div>
	);
};

export default Courses;
