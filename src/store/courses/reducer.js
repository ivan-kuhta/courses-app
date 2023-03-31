import {
	ADD_COURSE,
	DELETE_COURSE,
	SET_COURSES,
	UPDATE_COURSE,
} from './actionTypes';

const initialState = [];

function coursesReducer(state = initialState, { type, payload }) {
	switch (type) {
		case SET_COURSES:
			return [...payload];
		case ADD_COURSE:
			return [...state, payload];
		case DELETE_COURSE:
			return [...state.filter((course) => course.id !== payload)];
		case UPDATE_COURSE:
			const { id, ...updatedCourse } = payload;
			return [
				...state.map((course) => (course.id === id ? updatedCourse : course)),
			];
		default:
			return state;
	}
}

export default coursesReducer;
