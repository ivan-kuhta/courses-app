import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addAuthor } from '../../../../store/authors/actionCreators';

import { AuthorsServices } from '../../../../services';

import Button from '../../../../common/Button/Button';
import Input from '../../../../common/__Input/Input';
import Errors from '../../../Errors/Errors';
import { TEXT_CREATE_AUTHOR } from '../../../../constants';

import styles from './create-author.module.css';

const CreateAuthor = () => {
	const dispatch = useDispatch();

	const [author, setAuthor] = useState('');
	const [errors, setErrors] = useState(null);

	const handleCreateAuthor = () => {
		const data = { name: author };
		try {
			if (AuthorsServices.validation(data)) {
				dispatch(addAuthor({ name: author }));
				setAuthor('');
				setErrors(null);
			}
		} catch (e) {
			setErrors(e);
		}
	};

	return (
		<>
			<Errors errors={errors} />
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
		</>
	);
};

export default CreateAuthor;
