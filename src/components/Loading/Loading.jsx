import React from 'react';

import styles from './loading.module.css';

const Loading = ({ color = 'red' }) => {
	return (
		<div
			className={styles.container}
			style={{
				'--color': color,
			}}
		>
			<div className={styles.circle}></div>
			<div className={styles.circle}></div>
			<div className={styles.circle}></div>
		</div>
	);
};

export default Loading;
