export const getAuthors =
	(authorIds, selected = true) =>
	(state) =>
		state.authors.filter(
			(author) => authorIds.includes(author.id) === selected
		);
