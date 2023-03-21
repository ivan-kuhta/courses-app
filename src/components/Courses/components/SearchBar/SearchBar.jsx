import React, { useState } from 'react';

import Button from '../../../../common/Button/Button';
import Input from '../../../../common/__Input/Input';
import { TEXT_SEARCH } from '../../../../constants';

import styles from './search-bar.module.css';

const SearchBar = ({ handleSearch }) => {
	const [query, setQuery] = useState('');

	const handleChangeQuery = (e) => {
		const value = e.target.value;
		setQuery(value);
		if (value === '' && handleSearch) handleSearch('');
	};

	const handleClick = () => {
		handleSearch(query);
	};

	return (
		<div className={styles.container}>
			<Input
				value={query}
				className={styles.input}
				type={'text'}
				placeholdetText='Enter course name...'
				onChange={handleChangeQuery}
			/>
			<Button text={TEXT_SEARCH} onClick={handleClick} />
		</div>
	);
};

export default SearchBar;
