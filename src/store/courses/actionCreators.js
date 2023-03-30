import { v4 as uuid } from 'uuid';

import { CoursesServices } from '../../services';
import {
	ADD_COURSE,
	DELETE_COURSE,
	SET_COURSES,
	UPDATE_COURSE,
} from './actionTypes';
import { SET_LOADING_COURSES } from '../loadings/actionTypes';

export const fetchCourses = (dispatch) => {
	dispatch({ type: SET_LOADING_COURSES, payload: true });
	CoursesServices.getCourses()
		.then(({ successful, result }) => {
			if (successful) {
				dispatch({ type: SET_COURSES, payload: result });
			}
		})
		.finally(() => {
			dispatch({ type: SET_LOADING_COURSES, payload: false });
		});
};

export const addCourse = (course) => (dispatch) => {
	dispatch({ type: ADD_COURSE, payload: { id: uuid(), ...course } });
};

export const deleteCourse = (id) => (dispatch) => {
	dispatch({ type: DELETE_COURSE, payload: id });
};

export const updateCourse = (course) => (dispatch) => {
	dispatch({ type: UPDATE_COURSE, payload: course });
};
