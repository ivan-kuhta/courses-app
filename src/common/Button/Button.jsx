import React from 'react';

import styles from './button.module.css';

const Button = ({ className, text, onClick }) => {
	const btnClassNames = [styles.btn, className].join(' ');
	return (
		<button className={btnClassNames} onClick={onClick}>
			{text}
		</button>
	);
};

export default Button;
