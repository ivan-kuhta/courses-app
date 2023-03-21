import React from 'react';

import Button from '../../../../common/Button/Button';
import Authors from '../../../Authors/Authors';
import { TEXT_SHOW_COURSE } from '../../../../constants';

import { transformDate } from '../../../../helpers/transformDate';

import styles from './course-card.module.css';

const CourseCard = ({
	title,
	duration,
	creationDate,
	description,
	authors,
}) => {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h2 className={styles.title}>{title}</h2>
				<p>{description}</p>
			</div>
			<div className={styles.info}>
				<p className={styles.overflow}>
					<b>Authors:</b> <Authors authorIds={authors} isReturnText />
				</p>
				<p>
					<b>Duration:</b> {duration}
				</p>
				<p>
					<b>Created:</b> {transformDate(creationDate)}
				</p>
				<Button text={TEXT_SHOW_COURSE} className={styles.btn} />
			</div>
		</div>
	);
};

export default CourseCard;
