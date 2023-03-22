import React, { useContext, useState } from 'react';

import Button from '../../common/Button/Button';
import Input from '../../common/__Input/Input';
import Textarea from '../../common/Textarea/Textarea';
import Errors from '../Errors/Errors';
import Authors from '../Authors/Authors';
import {
	TEXT_ADD_AUTHOR,
	TEXT_CREATE_AUTHOR,
	TEXT_CREATE_COURSE,
	TEXT_REMOVE_AUTHOR,
} from '../../constants';

import { DataContext } from '../../contexts/DataContext';

import { pipeDuration } from '../../helpers/pipeDuration';

import styles from './create-course.module.css';

const CreateCourse = ({ handleBack }) => {
	const { createCourse, createAuthor } = useContext(DataContext);

	const [errors, setErrors] = useState(null);
	const [author, setAuthor] = useState('');
	const [course, setCourse] = useState({
		title: '',
		description: '',
		duration: null,
		authors: [],
	});

	const handleCreateAuthor = () => {
		try {
			createAuthor({ name: author });
			setAuthor('');
			setErrors(null);
		} catch (errors) {
			setErrors(errors);
		}
	};

	const handleChangeCourse = ({ target: { type, value, name } }) => {
		setCourse({
			...course,
			[name]: type === 'number' ? Number(value) : value,
		});
	};

	const handleRemoveAuthor = (id) => {
		setCourse({
			...course,
			authors: course.authors.filter((authorId) => authorId !== id),
		});
	};

	const handleAddAuthor = (id) => {
		setCourse({
			...course,
			authors: [...course.authors, id],
		});
	};

	const handlerCreateCourse = () => {
		try {
			createCourse(course);
			setErrors(null);
			handleBack();
		} catch (errors) {
			setErrors(errors);
		}
	};

	return (
		<>
			<Errors errors={errors} />
			<header className={styles.header}>
				<Input
					name='title'
					value={course.title}
					className={styles['input-title']}
					labelText={'Title'}
					placeholdetText={'Enter title...'}
					onChange={handleChangeCourse}
				/>
				<Button text={TEXT_CREATE_COURSE} onClick={handlerCreateCourse} />
			</header>
			<Textarea
				name='description'
				value={course.description}
				labelText={'Description'}
				placeholdetText={'Enter description'}
				onChange={handleChangeCourse}
			/>
			<div className={`${styles.flex} ${styles['info-fields']}`}>
				<div className={styles.column}>
					<h3 className={styles.title}>Add author</h3>
					<Input
						value={author}
						labelText={'Author name'}
						placeholdetText={'Enter author name...'}
						onChange={(e) => setAuthor(e.target.value)}
					/>
					<Button
						className={styles.center}
						text={TEXT_CREATE_AUTHOR}
						onClick={handleCreateAuthor}
					/>
				</div>
				<div className={styles.column}>
					<h3 className={styles.title}>Authors</h3>
					<Authors
						textButton={TEXT_ADD_AUTHOR}
						authorIds={course.authors}
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
						value={course.duration}
						placeholdetText={'Enter duration in minutes...'}
						onChange={handleChangeCourse}
						min={0}
					/>
					<p>
						Duration:{' '}
						<span className={styles.duration}>
							{pipeDuration(course.duration)}
						</span>{' '}
						hours
					</p>
				</div>
				<div className={styles.column}>
					<h3 className={styles.title}>Course authors</h3>
					<Authors
						textButton={TEXT_REMOVE_AUTHOR}
						authorIds={course.authors}
						handleAuthor={handleRemoveAuthor}
					/>
				</div>
			</div>
		</>
	);
};

export default CreateCourse;
