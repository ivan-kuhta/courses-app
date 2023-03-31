import { v4 as uuid } from 'uuid';

import { AuthorsServices } from '../../services';
import { SET_AUTHORS, ADD_AUTHOR } from './actionTypes';
import { SET_LOADING_AUTHORS } from '../loadings/actionTypes';

export const fetchAuthors = (dispatch) => {
	dispatch({ type: SET_LOADING_AUTHORS, payload: true });
	AuthorsServices.getAuthors()
		.then(({ successful, result }) => {
			if (successful) {
				dispatch({ type: SET_AUTHORS, payload: result });
			}
		})
		.finally(() => {
			dispatch({ type: SET_LOADING_AUTHORS, payload: false });
		});
};

export const addAuthor = (author) => (dispatch) => {
	dispatch({ type: ADD_AUTHOR, payload: { id: uuid(), ...author } });
};
