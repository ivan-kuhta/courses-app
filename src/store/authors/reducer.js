import { ADD_AUTHOR, SET_AUTHORS } from './actionTypes';

const initialState = [];

function authorsReducer(state = initialState, { type, payload }) {
	switch (type) {
		case SET_AUTHORS:
			return [...payload];
		case ADD_AUTHOR:
			return [...state, payload];
		default:
			return state;
	}
}

export default authorsReducer;
