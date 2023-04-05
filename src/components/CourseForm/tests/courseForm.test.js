import '@testing-library/jest-dom';
import { mockedState, mockedStore } from '../../../mockData';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import CourseForm from '../CourseForm';
import { fireEvent, render } from '@testing-library/react';
import {
	TEXT_ADD_AUTHOR,
	TEXT_CREATE_AUTHOR,
	TEXT_REMOVE_AUTHOR,
} from '../../../constants';

describe('check course form', () => {
	const jsx = (
		<Provider store={mockedStore}>
			<BrowserRouter>
				<CourseForm />
			</BrowserRouter>{' '}
		</Provider>
	);

	test('should show authors lists (all and course authors)', async () => {
		const { container } = render(jsx);

		const authors = await container.getElementsByClassName('author');

		expect(authors).toHaveLength(mockedState.authors.items.length);
	});

	test('"Create author" click button should call dispatch.', () => {
		const { getByRole } = render(jsx);

		const button = getByRole('button', { name: TEXT_CREATE_AUTHOR });

		button.click();
	});

	test('"Add author" button click should add an author to course authors list.', () => {
		const { getAllByRole, container } = render(jsx);

		const notSelectedAuthorList = container.getElementsByClassName(
			'authors--not-selected'
		)[0];

		const selectedAuthorList =
			container.getElementsByClassName('authors--selected')[0];

		const addButton = getAllByRole('button', {
			name: TEXT_ADD_AUTHOR,
		})[0];

		fireEvent.click(addButton);

		const authorsSelected = selectedAuthorList.getElementsByClassName('author');
		const authorsNotSlected =
			notSelectedAuthorList.getElementsByClassName('author');

		expect(authorsNotSlected).toHaveLength(
			mockedState.authors.items.length - 1
		);
		expect(authorsSelected).toHaveLength(1);
	});

	test('"Delete author" button click should add an author to course authors list.', () => {
		const { getAllByRole, container } = render(jsx);

		const notSelectedAuthorList = container.getElementsByClassName(
			'authors--not-selected'
		)[0];

		const selectedAuthorList =
			container.getElementsByClassName('authors--selected')[0];

		const addButton = getAllByRole('button', {
			name: TEXT_ADD_AUTHOR,
		})[0];

		fireEvent.click(addButton);

		const authorsNotSlected =
			notSelectedAuthorList.getElementsByClassName('author');
		expect(authorsNotSlected).toHaveLength(
			mockedState.authors.items.length - 1
		);

		const removeButton = getAllByRole('button', {
			name: TEXT_REMOVE_AUTHOR,
		})[0];

		fireEvent.click(removeButton);

		const authorsSelected = selectedAuthorList.getElementsByClassName('author');
		expect(authorsNotSlected).toHaveLength(mockedState.authors.items.length);
		expect(authorsSelected).toHaveLength(0);
	});
});
