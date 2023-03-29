import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdDeleteForever, MdModeEdit } from 'react-icons/md';

import { getAuthorsSelected } from '../../../../store/authors/selectors';
import { deleteCourse } from '../../../../store/courses/actionCreators';

import Button from '../../../../common/Button/Button';

import { TEXT_SHOW_COURSE } from '../../../../constants';

import { getNames } from '../../../../helpers/getNames';

import styles from './course-card.module.css';

const CourseCard = ({
	id,
	title,
	duration,
	creationDate,
	description,
	authors,
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	authors = useSelector(getAuthorsSelected(authors));

	const handlerRemove = () => {
		dispatch(deleteCourse(id));
	};

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h2 className={styles.title}>{title}</h2>
				<p>{description}</p>
			</div>
			<div className={styles.info}>
				<p className={styles.overflow}>
					<b>Authors:</b> {getNames(authors)}
				</p>
				<p>
					<b>Duration:</b> {duration}
				</p>
				<p>
					<b>Created:</b> {creationDate}
				</p>
				<div className={styles.btns}>
					<Button
						text={TEXT_SHOW_COURSE}
						onClick={() => navigate(`/courses/${id}`)}
					/>
					<Button
						theme={'icon'}
						text={<MdDeleteForever />}
						onClick={handlerRemove}
					></Button>
					<Button theme={'icon'} text={<MdModeEdit />}></Button>
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
