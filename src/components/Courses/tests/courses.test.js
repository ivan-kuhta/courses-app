import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Courses from '../Courses';
import { mockedState, mockedStore } from '../../../mockData';
import { TEXT_ADD_NEW_COURSE } from '../../../constants';
import * as router from 'react-router';

const navigate = jest.fn();

describe('check render course card', () => {
	beforeEach(() => {
		jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
	});

	const jsx = (
		<Provider store={mockedStore}>
			<BrowserRouter>
				<Courses />
			</BrowserRouter>{' '}
		</Provider>
	);

	test('check display amound of CourseCard', async () => {
		const { container } = render(jsx);
		const list = container.getElementsByClassName('list')[0];
		const courseCardList = await list.getElementsByClassName('container');

		expect(courseCardList).toHaveLength(mockedState.courses.items.length);
	});

	test('check display empty list', async () => {
		mockedState.courses = {
			...mockedState.courses,
			items: [],
		};

		const { container } = render(jsx);
		const list = container.getElementsByClassName('list')[0];

		expect(list).toBeEmptyDOMElement();
	});

	test('check link Add New Course', async () => {
		const { getByRole } = render(jsx);

		const addCourseBtn = getByRole('button', { name: TEXT_ADD_NEW_COURSE });

		addCourseBtn.click();

		expect(navigate).toHaveBeenCalledWith('/courses/add');
	});
});
