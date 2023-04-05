import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { getCourseById, getCoursesErrors } from '../../store/courses/selectors';
import { getAuthorsSelected } from '../../store/authors/selectors';
import { fetchCourse } from '../../store/courses/thunk';

import { pipeDuration } from '../../helpers/pipeDuration';
import { transformDate } from '../../helpers/transformDate';

import styles from './course-info.module.css';
import { fetchAuthors } from '../../store/authors/thunk';

const CourseInfo = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	const selectCourse = useSelector(getCourseById(id));

	const [course, setCourse] = useState(selectCourse);
	const authors = useSelector(getAuthorsSelected(course?.authors || []));

	const errors = useSelector(getCoursesErrors);

	useEffect(() => {
		if (errors && errors.code === 404) navigate('/courses');
	}, [errors, navigate]);

	useEffect(() => {
		if (!selectCourse) {
			dispatch(
				fetchCourse(id, (course) => {
					setCourse(course);
				})
			);
		}
	}, [id, dispatch, selectCourse]);

	useEffect(() => {
		dispatch(fetchAuthors);
	}, [dispatch]);

	return (
		<div className={styles.container}>
			<Link className={styles.link} to='/courses'>
				{'< Back to courses'}
			</Link>
			{course && (
				<>
					<h1 className={styles.title}>{course.title}</h1>
					<div className={styles.row}>
						<div className={styles.column}>
							<p>{course.description}</p>
						</div>
						<div className={styles.info}>
							<p>
								<b>ID:</b> {id}
							</p>
							<p>
								<b>Duration:</b> {pipeDuration(course.duration)} hours
							</p>
							<p>
								<b>Created:</b> {transformDate(course.creationDate)}
							</p>
							<p>
								<b>Authors:</b>
							</p>
							{authors.map(({ id, name }) => (
								<p key={id}>{name}</p>
							))}
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default CourseInfo;
