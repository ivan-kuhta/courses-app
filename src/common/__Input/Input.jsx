import React from 'react';

import styles from './input.module.css';

const Input = ({
	name,
	min,
	max,
	className,
	labelText,
	placeholdetText,
	onChange,
	type = 'text',
	value = '',
}) => {
	const labelClassNames = [styles.label, className].join(' ');

	return (
		<label className={labelClassNames}>
			{labelText}
			<input
				value={value}
				type={type}
				name={name}
				onChange={(e) => onChange(e)}
				className={styles.input}
				placeholder={placeholdetText}
				min={min}
				max={max}
			/>
		</label>
	);
};

export default Input;
