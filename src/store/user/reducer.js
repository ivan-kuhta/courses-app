import { LOGIN, LOGOUT } from './actionTypes';

const initialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
};

function userReducer(state = initialState, { type, payload }) {
	switch (type) {
		case LOGIN:
			return { ...state, ...payload, isAuth: true };
		case LOGOUT:
			return { ...state, ...initialState };
		default:
			return state;
	}
}

export default userReducer;
