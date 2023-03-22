import React from 'react';

import styles from './errors.module.css';

const Errors = ({ errors }) =>
	errors &&
	errors.length > 0 && (
		<ul className={styles.list}>
			{errors.map((error, index) => (
				<li key={index}>{error.message}</li>
			))}
		</ul>
	);

export default Errors;
