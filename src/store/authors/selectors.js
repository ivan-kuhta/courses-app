export const getAuthorsSelected =
	(authorsIds) =>
	({ authors: { items } }) =>
		items.filter(({ id }) => authorsIds.includes(id));

export const getAuthorsNotSelected =
	(authorsIds) =>
	({ authors: { items } }) =>
		items.filter(({ id }) => !authorsIds.includes(id));

export const getAuthors = ({ authors: { items } }) => items;
export const getAuthorsLoading = ({ authors: { loading } }) => loading;
export const getAuthorsErrors = ({ authors: { errors } }) => errors;
