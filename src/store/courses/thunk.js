import { v4 as uuid } from 'uuid';

import { CoursesServices } from '../../services';
import {
	ADD_COURSE,
	DELETE_COURSE,
	FETCH_COURSES,
	FETCH_COURSES_ERROR,
	FETCH_COURSES_SUCCESS,
	FETCH_COURSE_FINNALY,
	UPDATE_COURSE,
} from './actionTypes';

export const fetchCourses = (dispatch) => {
	dispatch({ type: FETCH_COURSES });
	CoursesServices.getCourses()
		.then(({ successful, result }) => {
			if (successful) {
				dispatch({ type: FETCH_COURSES_SUCCESS, payload: result });
			} else {
				dispatch({ type: FETCH_COURSES_ERROR, payload: result });
			}
		})
		.catch((error) => dispatch({ type: FETCH_COURSES_ERROR, payload: error }));
};

export const fetchCourse = (id, callback) => (dispatch) => {
	dispatch({ type: FETCH_COURSES });
	CoursesServices.getCourse(id)
		.then(({ successful, result }) => {
			if (successful) {
				dispatch({ type: FETCH_COURSE_FINNALY });
				callback && callback(result);
			} else {
				dispatch({ type: FETCH_COURSES_ERROR, payload: [{ massage: result }] });
			}
		})
		.catch((error) => dispatch({ type: FETCH_COURSES_ERROR, payload: error }));
};

export const addCourse = (course, token, callback) => (dispatch) => {
	const data = { id: uuid(), ...course };
	dispatch({ type: FETCH_COURSES });
	CoursesServices.postCourse(data, token)
		.then(({ successful, result }) => {
			if (successful) {
				dispatch({ type: ADD_COURSE, payload: result });
				callback && callback();
			} else {
				dispatch({ type: FETCH_COURSES_ERROR, payload: { message: result } });
			}
		})
		.catch((errors) => {
			dispatch({ type: FETCH_COURSES_ERROR, payload: errors });
		});
};

export const deleteCourse = (id, token) => (dispatch) => {
	dispatch({ type: FETCH_COURSES });
	CoursesServices.deleteCourse(id, token)
		.then(({ successful, result }) => {
			if (successful) {
				dispatch({ type: DELETE_COURSE, payload: id });
			} else {
				dispatch({ type: FETCH_COURSES_ERROR, payload: { message: result } });
			}
		})
		.catch((errors) => {
			dispatch({ type: FETCH_COURSES_ERROR, payload: errors });
		});
};

export const updateCourse = (id, data, token, callback) => (dispatch) => {
	dispatch({ type: FETCH_COURSES });
	CoursesServices.putCourse(id, data, token)
		.then(({ successful, result }) => {
			if (successful) {
				dispatch({ type: UPDATE_COURSE, payload: result });
				callback && callback();
			} else {
				dispatch({ type: FETCH_COURSES_ERROR, payload: { message: result } });
			}
		})
		.catch((errors) => {
			dispatch({ type: FETCH_COURSES_ERROR, payload: errors });
		});
};
