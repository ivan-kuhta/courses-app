import {
	SET_ERRORS,
	SET_LOADING_AUTHORS,
	SET_LOADING_COURSES,
	SET_LOADING_USER,
} from './actionTypes';

const initialState = {
	loadingUser: true,
	loadingCourses: true,
	loadingAuthors: true,
	errors: [],
};

function loadingsReducer(state = initialState, { type, payload }) {
	switch (type) {
		case SET_LOADING_COURSES:
			return { ...state, loadingCourses: payload, errors: [] };
		case SET_LOADING_AUTHORS:
			return { ...state, loadingAuthors: payload, errors: [] };
		case SET_LOADING_USER:
			return { ...state, loadingUser: payload, errors: [] };
		case SET_ERRORS:
			return { ...state, errors: [...payload] };
		default:
			return state;
	}
}

export default loadingsReducer;
