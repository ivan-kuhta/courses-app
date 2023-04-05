import React from 'react';

import styles from './errors.module.css';

const Errors = ({ errors }) => {
	const isArray = Array.isArray(errors);

	return (
		errors && (
			<div className={styles.container}>
				{isArray ? (
					<ul className={styles.list}>
						{errors.map((error, index) => (
							<li key={index}>{error.message}</li>
						))}
					</ul>
				) : (
					<p>{errors.message}</p>
				)}
			</div>
		)
	);
};

export default Errors;
