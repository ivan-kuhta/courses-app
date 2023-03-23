import React from 'react';

import styles from './textarea.module.css';

const Textarea = ({
	name,
	className,
	labelText,
	placeholdetText,
	onChange,
	value,
	rows = 6,
}) => {
	const labelClassNames = [styles.label, className].join(' ');
	return (
		<label className={labelClassNames}>
			{labelText}
			<textarea
				name={name}
				type={'text'}
				className={styles.textarea}
				placeholder={placeholdetText}
				onChange={onChange}
				rows={rows}
				defaultValue={value}
			/>
		</label>
	);
};

export default Textarea;
