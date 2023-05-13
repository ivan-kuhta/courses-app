import React from 'react';

import styles from './button.module.css';

const Button = ({ className, text, onClick, theme }) => {
	const btnClassNamesArray = [styles.btn];

	if (styles[theme]) btnClassNamesArray.push(styles[theme]);
	if (className) btnClassNamesArray.push(className);

	const btnClassNames = btnClassNamesArray.join(' ');
	return (
		<button className={btnClassNames} onClick={onClick}>
			{text}
		</button>
	);
};

export default Button;
