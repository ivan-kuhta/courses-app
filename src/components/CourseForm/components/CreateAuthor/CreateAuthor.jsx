import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAuthorsErrors } from '../../../../store/authors/selectors';
import { getToken } from '../../../../store/user/selectors';
import { addAuthor } from '../../../../store/authors/thunk';

import Button from '../../../../common/Button/Button';
import Input from '../../../../common/__Input/Input';
import Errors from '../../../Errors/Errors';
import { TEXT_CREATE_AUTHOR } from '../../../../constants';

import styles from './create-author.module.css';

const CreateAuthor = () => {
	const dispatch = useDispatch();

	const [author, setAuthor] = useState('');

	const errors = useSelector(getAuthorsErrors);
	const token = useSelector(getToken);

	const handleCreateAuthor = () => {
		const data = { name: author };

		dispatch(addAuthor(data, token, () => setAuthor('')));
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
