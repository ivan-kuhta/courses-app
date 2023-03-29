export const getAuthorsSelected =
	(authorsIds) =>
	({ authors }) =>
		authors.filter(({ id }) => authorsIds.includes(id));

export const getAuthorsNotSelected =
	(authorsIds) =>
	({ authors }) =>
		authors.filter(({ id }) => !authorsIds.includes(id));
