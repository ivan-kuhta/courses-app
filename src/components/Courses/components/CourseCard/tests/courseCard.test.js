import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import CourseCard from '../CourseCard';
import { mockedState, mockedStore } from '../../../../../mockData';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { TEXT_SHOW_COURSE } from '../../../../../constants';

describe('check render course card', () => {
	const course = mockedState.courses.items[0];
	const jsx = (
		<Provider store={mockedStore}>
			<BrowserRouter>
				<CourseCard {...course} />{' '}
			</BrowserRouter>{' '}
		</Provider>
	);

	test('check events', () => {
		const { getByText } = render(jsx);
		userEvent.click(getByText(TEXT_SHOW_COURSE));
	});

	test('check title', () => {
		const { queryByText } = render(jsx);
		expect(queryByText(course.title)).toBeInTheDocument();
	});

	test('check description', () => {
		const { queryByText } = render(jsx);

		expect(queryByText(course.description)).toBeInTheDocument();
	});

	test('check duration', () => {
		const { queryByText } = render(jsx);

		const element = queryByText('02:40 hours');

		expect(element).toBeInTheDocument();
		expect(String(element?.textContent)).toEqual('Duration: 02:40 hours');
	});

	test('check authors', () => {
		const { queryByText } = render(jsx);

		const element = queryByText('Vasiliy Dobkin, Nicolas Kim');

		expect(element).toBeInTheDocument();
		expect(String(element?.textContent)).toEqual(
			'Authors: Vasiliy Dobkin, Nicolas Kim'
		);
	});

	test('check created date', () => {
		const { queryByText } = render(jsx);

		const element = queryByText('8.3.2021');

		expect(element).toBeInTheDocument();
		expect(String(element.textContent)).toEqual('Created: 8.3.2021');
	});
});
