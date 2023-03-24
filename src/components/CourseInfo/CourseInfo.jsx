import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { DataContext } from '../../contexts/DataContext';
import { dateGeneratop } from '../../helpers/dateGeneratop';
import { pipeDuration } from '../../helpers/pipeDuration';

import styles from './course-info.module.css';

const CourseInfo = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { getCourse, getAuthors, token } = useContext(DataContext);

	const [course, setCourse] = useState(null);

	useEffect(() => {
		if (!token) navigate('/');
	}, [token, navigate]);

	useEffect(() => {
		const course = getCourse(id);
		if (course) {
			setCourse(getCourse(id));
		} else {
			navigate('/courses');
		}
	}, [id, getCourse, navigate]);

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
								<b>Created:</b> {dateGeneratop(course.creationDate)}
							</p>
							<p>
								<b>Authors:</b>
							</p>
							{getAuthors(course.authors).map(({ id, name }) => (
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
