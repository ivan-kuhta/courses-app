import React from 'react';

import styles from './button.module.css';

const Button = ({ className, text, onClick, theme }) => {
	const btnClassNames = [styles.btn, styles[theme], className].join(' ');
	return (
		<button className={btnClassNames} onClick={onClick}>
			{text}
		</button>
	);
};

export default Button;
