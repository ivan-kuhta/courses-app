import {
	ADD_AUTHOR,
	FETCH_AUTHORS,
	FETCH_AUTHORS_ERROR,
	FETCH_AUTHORS_SUCCESS,
} from './actionTypes';

const initialState = {
	loading: false,
	items: [],
	errors: null,
};

function authorsReducer(state = initialState, { type, payload }) {
	switch (type) {
		case FETCH_AUTHORS:
			return { ...state, loading: true, errors: null };
		case FETCH_AUTHORS_SUCCESS:
			return { ...state, loading: false, items: payload, errors: null };
		case FETCH_AUTHORS_ERROR:
			return { ...state, loading: false, errors: payload };
		case ADD_AUTHOR:
			return { ...state, items: [...state.items, payload], loading: false };
		default:
			return state;
	}
}

export default authorsReducer;
