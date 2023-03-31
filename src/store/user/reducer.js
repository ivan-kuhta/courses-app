import {
	CLEAR_USER,
	FETCH_USER,
	FETCH_USER_ERROR,
	FETCH_USER_FINNALY,
	FETCH_USER_SUCCESS,
} from './actionTypes';

const initialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
	loading: true,
	errors: null,
};

function userReducer(state = initialState, { type, payload = null }) {
	switch (type) {
		case FETCH_USER:
			return { ...state, loading: true, errors: null };
		case FETCH_USER_SUCCESS:
			return { ...state, loading: false, ...payload, isAuth: true };
		case FETCH_USER_ERROR:
			return { ...state, loading: false, errors: payload };
		case FETCH_USER_FINNALY:
			return { ...state, loading: false };
		case CLEAR_USER:
			return { ...initialState, loading: false };
		default:
			return state;
	}
}

export default userReducer;
