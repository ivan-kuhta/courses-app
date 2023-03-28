import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { getAuthors } from '../../store/authors/selectors';
import { getCourseById } from '../../store/courses/selectors';
import { getUser } from '../../store/user/selectors';

import { pipeDuration } from '../../helpers/pipeDuration';
import { transformDate } from '../../helpers/transformDate';

import styles from './course-info.module.css';

const CourseInfo = () => {
	const navigate = useNavigate();
	const { id } = useParams();

	const course = useSelector(getCourseById(id));
	const authors = useSelector(getAuthors(course?.authors || []));
	const { isAuth } = useSelector(getUser);

	useEffect(() => {
		if (!isAuth || !course) {
			navigate('/courses');
		}
	}, [isAuth, navigate, course]);

	return (
		<div className={styles.container}>
			<Link to='/courses'>{'< Back to courses'}</Link>
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
