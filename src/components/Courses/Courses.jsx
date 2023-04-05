import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getIsAdmin } from '../../store/user/selectors';
import { getFilterCourses } from '../../store/courses/selectors';
import { fetchCourses } from '../../store/courses/thunk';
import { fetchAuthors } from '../../store/authors/thunk';

import Button from '../../common/Button/Button';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import { TEXT_ADD_NEW_COURSE } from '../../constants';

import styles from './courses.module.css';

const Courses = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isAdmin = useSelector(getIsAdmin);

	const [query, setQuery] = useState('');

	const courses = useSelector(getFilterCourses(query));

	useEffect(() => {
		dispatch(fetchCourses);
		dispatch(fetchAuthors);
	}, [dispatch]);

	return (
		<div className={styles.container}>
			<>
				<header className={styles.header}>
					<SearchBar handleSearch={(query) => setQuery(query)} />
					{isAdmin && (
						<Button
							text={TEXT_ADD_NEW_COURSE}
							onClick={() => navigate('/courses/add')}
						/>
					)}
				</header>
				<div className={styles.list}>
					{courses.map(({ id, ...course }) => (
						<CourseCard key={id} id={id} {...course} />
					))}
				</div>
			</>
		</div>
	);
};

export default Courses;
