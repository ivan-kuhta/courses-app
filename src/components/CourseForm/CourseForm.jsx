import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getToken } from '../../store/user/selectors';
import {
	addCourse,
	fetchCourse,
	updateCourse,
} from '../../store/courses/thunk';
import { getCourseById, getCoursesErrors } from '../../store/courses/selectors';

import Button from '../../common/Button/Button';
import Input from '../../common/__Input/Input';
import Textarea from '../../common/Textarea/Textarea';
import CreateAuthor from './components/CreateAuthor/CreateAuthor';
import Errors from '../Errors/Errors';
import Authors from '../Authors/Authors';
import {
	TEXT_ADD_AUTHOR,
	TEXT_CANCEL,
	TEXT_CREATE_COURSE,
	TEXT_REMOVE_AUTHOR,
	TEXT_UPDATE_COURSE,
} from '../../constants';

import { pipeDuration } from '../../helpers/pipeDuration';
import { dateGeneratop } from '../../helpers/dateGeneratop';

import styles from './create-course.module.css';

const CourseForm = () => {
	const { id } = useParams();

	const isEditing = Boolean(id);

	const selectCourse = useSelector(getCourseById(id));

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const token = useSelector(getToken);

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [duration, setDuration] = useState(0);
	const [authorIds, setAuthorIds] = useState([]);

	const handleBack = () => navigate('/courses');

	const handleAddAuthor = (id) => {
		setAuthorIds([...authorIds, id]);
	};

	const handleRemoveAuthor = (id) => {
		setAuthorIds(authorIds.filter((authorId) => authorId !== id));
	};

	const errors = useSelector(getCoursesErrors);

	const handlerCreateCourse = () => {
		const data = {
			title,
			description,
			duration: Number(duration),
			authors: authorIds,
			creationDate: dateGeneratop(),
		};

		dispatch(
			isEditing
				? updateCourse(id, data, token, handleBack)
				: addCourse(data, token, handleBack)
		);
	};

	const setCourseValues = (course) => {
		const { title, description, duration, authors } = course;
		setTitle(title);
		setDescription(description);
		setDuration(duration);
		setAuthorIds(authors);
	};

	useEffect(() => {
		if (errors && errors.code === 404) navigate('/courses');
	}, [errors, navigate]);

	useEffect(() => {
		if (id) {
			if (selectCourse) {
				setCourseValues(selectCourse);
			} else {
				dispatch(
					fetchCourse(id, (data) => {
						setCourseValues(data);
					})
				);
			}
		}
	}, [id, selectCourse, dispatch]);

	return (
		<div className={styles.container}>
			<Errors errors={errors} />
			<header className={styles.header}>
				<Input
					name='title'
					value={title}
					className={styles['input-title']}
					labelText={'Title'}
					placeholdetText={'Enter title...'}
					onChange={({ target: { value } }) => setTitle(value)}
				/>
				<Button
					text={isEditing ? TEXT_UPDATE_COURSE : TEXT_CREATE_COURSE}
					onClick={handlerCreateCourse}
				/>
				<Button
					text={TEXT_CANCEL}
					theme='danger'
					onClick={() => handleBack()}
				/>
			</header>
			<Textarea
				name='description'
				value={description}
				labelText={'Description'}
				placeholdetText={'Enter description'}
				onChange={({ target: { value } }) => setDescription(value)}
			/>
			<div className={`${styles.flex} ${styles['info-fields']}`}>
				<div className={styles.column}>
					<h3 className={styles.title}>Add author</h3>
					<CreateAuthor />
				</div>
				<div className={styles.column}>
					<h3 className={styles.title}>Authors</h3>
					<Authors
						textButton={TEXT_ADD_AUTHOR}
						authorIds={authorIds}
						isMatched={false}
						handleAuthor={handleAddAuthor}
					/>
				</div>
				<div className={styles.column}>
					<h3 className={styles.title}>Duration</h3>
					<Input
						type='number'
						name='duration'
						labelText={'Duration'}
						value={duration}
						placeholdetText={'Enter duration in minutes...'}
						onChange={({ target: { value } }) => setDuration(value)}
						min={0}
					/>
					<p>
						Duration:{' '}
						<span className={styles.duration}>{pipeDuration(duration)}</span>{' '}
						hours
					</p>
				</div>
				<div className={styles.column}>
					<h3 className={styles.title}>Course authors</h3>
					<Authors
						textButton={TEXT_REMOVE_AUTHOR}
						authorIds={authorIds}
						handleAuthor={handleRemoveAuthor}
					/>
				</div>
			</div>
		</div>
	);
};

export default CourseForm;
