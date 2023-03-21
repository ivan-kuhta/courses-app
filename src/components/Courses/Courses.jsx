import React, { useState } from 'react';

import Button from '../../common/Button/Button';
import CreateCourse from '../CreateCourse/CreateCourse';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import { TEXT_ADD_NEW_COURSE } from '../../constants';

import { dateGeneratop } from '../../helpers/dateGeneratop';
import { pipeDuration } from '../../helpers/pipeDuration';

import courseService from '../../services/course.service';

import styles from './courses.module.css';

const Courses = () => {
	const { getFilterCourses } = courseService;

	const [query, setQuery] = useState('');

	const [show, setShow] = useState(false);

	return (
		<div className={styles.container}>
			{show ? (
				<CreateCourse handleBack={() => setShow(false)} />
			) : (
				<>
					<header className={styles.header}>
						<SearchBar handleSearch={(query) => setQuery(query)} />
						<Button text={TEXT_ADD_NEW_COURSE} onClick={() => setShow(true)} />
					</header>
					<div className={styles.list}>
						{getFilterCourses(query).map((course) => (
							<CourseCard
								key={course.id}
								{...course}
								duration={pipeDuration(course.duration) + ' hours'}
								creationDate={dateGeneratop(course.creationDate)}
							/>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default Courses;
