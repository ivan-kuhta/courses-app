import React, { useContext, useState } from 'react';

import Button from '../../common/Button/Button';
import Input from '../../common/__Input/Input';
import Textarea from '../../common/Textarea/Textarea';
import Errors from '../Errors/Errors';
import Authors from '../Authors/Authors';
import {
	TEXT_ADD_AUTHOR,
	TEXT_CANCEL,
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
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [duration, setDuration] = useState(0);
	const [authorIds, setAuthorIds] = useState([]);

	const handleCreateAuthor = () => {
		try {
			createAuthor({ name: author });
			setAuthor('');
			setErrors(null);
		} catch (errors) {
			setErrors(errors);
		}
	};

	const handleRemoveAuthor = (id) => {
		setAuthorIds(authorIds.filter((authorId) => authorId !== id));
	};

	const handleAddAuthor = (id) => {
		setAuthorIds([...authorIds, id]);
	};

	const handlerCreateCourse = () => {
		try {
			createCourse({
				title,
				description,
				duration: Number(duration),
				authors: authorIds,
			});
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
					value={title}
					className={styles['input-title']}
					labelText={'Title'}
					placeholdetText={'Enter title...'}
					onChange={({ target: { value } }) => setTitle(value)}
				/>
				<Button text={TEXT_CREATE_COURSE} onClick={handlerCreateCourse} />
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
					<Input
						value={author}
						labelText={'Author name'}
						placeholdetText={'Enter author name...'}
						onChange={({ target: { value } }) => setAuthor(value)}
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
		</>
	);
};

export default CreateCourse;
