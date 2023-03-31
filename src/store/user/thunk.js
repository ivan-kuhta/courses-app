import { TOKEN_NAME } from '../../constants';
import { AuthService } from '../../services';
import {
	CLEAR_USER,
	FETCH_USER,
	FETCH_USER_ERROR,
	FETCH_USER_FINNALY,
	FETCH_USER_SUCCESS,
} from './actionTypes';

export const fetchUser = () => (dispatch) => {
	const token = localStorage.getItem(TOKEN_NAME);
	if (token) {
		dispatch({ type: FETCH_USER });
		AuthService.getUser(token)
			.then(({ successful, result: { name, email, role } }) => {
				if (successful) {
					dispatch({
						type: FETCH_USER_SUCCESS,
						payload: { token, name, email, role },
					});
				}
			})
			.catch((errors) => {
				dispatch({ type: FETCH_USER_ERROR, payload: errors });
			});
	} else dispatch({ type: CLEAR_USER });
};

export const register = (user, callback) => (dispatch) => {
	dispatch({ type: FETCH_USER });
	AuthService.register(user)
		.then(({ successful, errors }) => {
			if (successful) {
				dispatch({ type: FETCH_USER_FINNALY });
				callback && callback();
			} else {
				console.log(errors);
				dispatch({
					type: FETCH_USER_ERROR,
					payload: { message: errors },
				});
			}
		})
		.catch((errors) => {
			dispatch({ type: FETCH_USER_ERROR, payload: errors });
		});
};

export const login = (user) => (dispatch) => {
	dispatch({ type: FETCH_USER });
	AuthService.login(user)
		.then(({ successful, result, user }) => {
			if (successful) {
				localStorage.setItem(TOKEN_NAME, result);
				dispatch(fetchUser());
			} else {
				dispatch({ type: FETCH_USER_ERROR, payload: [{ message: result }] });
			}
		})
		.catch((errors) => {
			dispatch({ type: FETCH_USER_ERROR, payload: errors });
		});
};

export const logout = (token) => (dispatch) => {
	dispatch({ type: FETCH_USER });
	AuthService.logout(token).then(({ ok }) => {
		if (ok) {
			localStorage.removeItem(TOKEN_NAME);
			dispatch({ type: CLEAR_USER });
		}
	});
};
