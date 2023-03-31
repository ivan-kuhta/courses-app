import { v4 as uuid } from 'uuid';

import { AuthorsServices } from '../../services';
import {
	ADD_AUTHOR,
	FETCH_AUTHORS,
	FETCH_AUTHORS_ERROR,
	FETCH_AUTHORS_SUCCESS,
} from './actionTypes';

export const fetchAuthors = (dispatch) => {
	dispatch({ type: FETCH_AUTHORS });
	AuthorsServices.getAuthors()
		.then(({ successful, result }) => {
			if (successful) {
				dispatch({ type: FETCH_AUTHORS_SUCCESS, payload: result });
			} else {
				dispatch({ type: FETCH_AUTHORS_ERROR, payload: result });
			}
		})
		.catch((errors) => {
			dispatch({ type: FETCH_AUTHORS_ERROR, payload: errors });
		});
};

export const addAuthor = (author, token, callback) => (dispatch) => {
	const data = { id: uuid(), ...author };
	dispatch({ type: FETCH_AUTHORS });
	AuthorsServices.postAuthor(data, token)
		.then(({ successful, result }) => {
			if (successful) {
				dispatch({ type: ADD_AUTHOR, payload: result });
				callback && callback();
			} else {
				dispatch({ type: FETCH_AUTHORS_ERROR, payload: { message: result } });
			}
		})
		.catch((errors) => {
			dispatch({ type: FETCH_AUTHORS_ERROR, payload: errors });
		});
};
