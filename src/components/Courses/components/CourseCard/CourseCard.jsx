import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdDeleteForever, MdModeEdit } from 'react-icons/md';

import { getIsAdmin, getToken } from '../../../../store/user/selectors';
import { deleteCourse } from '../../../../store/courses/thunk';
import { getAuthorsSelected } from '../../../../store/authors/selectors';

import Button from '../../../../common/Button/Button';

import { TEXT_SHOW_COURSE } from '../../../../constants';

import { getNames } from '../../../../helpers/getNames';
import { pipeDuration } from '../../../../helpers/pipeDuration';
import { transformDate } from '../../../../helpers/transformDate';

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

	const token = useSelector(getToken);

	authors = useSelector(getAuthorsSelected(authors));

	const isAdmin = useSelector(getIsAdmin);

	const handlerRemove = () => {
		dispatch(deleteCourse(id, token));
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
					<b>Duration:</b> {pipeDuration(duration) + ' hours'}
				</p>
				<p>
					<b>Created:</b> {transformDate(creationDate)}
				</p>
				<div className={styles.btns}>
					<Button
						text={TEXT_SHOW_COURSE}
						onClick={() => navigate(`/courses/${id}`)}
					/>
					{isAdmin && (
						<>
							<Button
								theme={'icon'}
								text={<MdDeleteForever />}
								onClick={handlerRemove}
							/>
							<Button
								theme={'icon'}
								onClick={() => navigate(`/courses/update/${id}`)}
								text={<MdModeEdit />}
							/>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
