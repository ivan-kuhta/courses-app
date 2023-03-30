import { AuthService } from '../../services';
import { SET_ERRORS, SET_LOADING_USER } from '../loadings/actionTypes';
import { LOGIN, LOGOUT } from './actionTypes';

export const checkAuth = () => (dispatch) => {
	const token = localStorage.getItem('_token');
	if (token) {
		dispatch({ type: SET_LOADING_USER, payload: true });
		AuthService.getUser(token)
			.then(({ successful, result: { name, email } }) => {
				if (successful) {
					dispatch({ type: LOGIN, payload: { token, name, email } });
				}
			})
			.catch(() => {
				dispatch({ type: LOGOUT });
			})
			.finally(() => {
				dispatch({ type: SET_LOADING_USER, payload: false });
			});
	} else dispatch({ type: SET_LOADING_USER, payload: false });
};

export const login = (user) => (dispatch) => {
	AuthService.login(user).then(({ successful, result, user }) => {
		if (successful) {
			localStorage.setItem('_token', result);
			dispatch({ type: LOGIN, payload: { token: result, ...user } });
		} else {
			dispatch({ type: SET_ERRORS, payload: [{ message: result }] });
		}
	});
};

export const logout = (token) => (dispatch) => {
	AuthService.logout(token).then(({ ok }) => {
		if (ok) {
			localStorage.removeItem('_token');
			dispatch({ type: LOGOUT });
		}
	});
};
