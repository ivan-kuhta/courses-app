import {
	ADD_COURSE,
	DELETE_COURSE,
	FETCH_COURSES,
	FETCH_COURSES_ERROR,
	FETCH_COURSES_SUCCESS,
	FETCH_COURSE_FINNALY,
	UPDATE_COURSE,
} from './actionTypes';

export const initialState = {
	loading: false,
	items: [],
	errors: null,
};

function coursesReducer(state = initialState, { type, payload }) {
	switch (type) {
		case FETCH_COURSES:
			return { ...state, errors: null, loading: true };
		case FETCH_COURSE_FINNALY:
			return { ...state, errors: null, loading: false };
		case FETCH_COURSES_SUCCESS:
			return { ...state, loading: false, items: payload };
		case FETCH_COURSES_ERROR:
			return { ...state, errors: payload, loading: false };
		case ADD_COURSE:
			return { ...state, loading: false, items: [...state.items, payload] };
		case DELETE_COURSE:
			return {
				...state,
				loading: false,
				items: [...state.items.filter((course) => course.id !== payload)],
			};
		case UPDATE_COURSE:
			const { id } = payload;
			return {
				...state,
				loading: false,
				items: state.items.map((course) =>
					course.id === id ? payload : course
				),
			};
		default:
			return state;
	}
}

export default coursesReducer;
