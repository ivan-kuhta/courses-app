import React, { useContext } from 'react';

import Button from '../../common/Button/Button';
import { TEXT_AUTHORS_LIST_EMPTY } from '../../constants';
import { DataContext } from '../../contexts/DataContext';

import styles from './authors.module.css';

const Authors = ({
	authorIds = [],
	handleAuthor,
	textButton,
	isMatched = true,
	isReturnText = false,
}) => {
	const { getAuthors } = useContext(DataContext);

	const authors = getAuthors(authorIds, isMatched);

	if (isReturnText) return authors.map(({ id, name }) => name).join(', ');

	if (authors.length === 0)
		return <p className={styles.center}>{TEXT_AUTHORS_LIST_EMPTY}</p>;

	return (
		<>
			{authors.map(({ id, name }) => (
				<div key={id} className={`${styles.flex} ${styles.author}`}>
					<div className={styles.column}>
						<p>{name}</p>
					</div>
					{handleAuthor && (
						<div className={styles.column}>
							<Button text={textButton} onClick={() => handleAuthor(id)} />
						</div>
					)}
				</div>
			))}
		</>
	);
};

export default Authors;
