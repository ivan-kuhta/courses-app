import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../common/Button/Button';
import { TEXT_AUTHORS_LIST_EMPTY } from '../../constants';
import {
	getAuthorsNotSelected,
	getAuthorsSelected,
} from '../../store/authors/selectors';
import { fetchAuthors } from '../../store/authors/thunk';

import styles from './authors.module.css';

const Authors = ({
	className,
	authorIds = [],
	handleAuthor,
	textButton,
	isMatched = true,
}) => {
	const dispatch = useDispatch();

	const authors = useSelector(
		isMatched ? getAuthorsSelected(authorIds) : getAuthorsNotSelected(authorIds)
	);

	useEffect(() => {
		dispatch(fetchAuthors);
	}, [dispatch]);

	const classNameList = [styles.list];

	if (className) classNameList.push(className);

	return (
		<div className={classNameList.join(' ')}>
			{authors.length === 0 ? (
				<p className={styles.center}>{TEXT_AUTHORS_LIST_EMPTY}</p>
			) : (
				authors.map(({ id, name }) => (
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
				))
			)}
		</div>
	);
};

export default Authors;
