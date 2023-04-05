import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import Header from '../Header';
import { mockedState, mockedStore } from '../../../mockData';
import logo from '../../../assets/logo.png';
import { TEXT_LOGOUT } from '../../../constants';

describe('check render header', () => {
	const jsx = (
		<Provider store={mockedStore}>
			<Header />
		</Provider>
	);

	test('check events', () => {
		const { getByText } = render(jsx);
		userEvent.click(getByText(TEXT_LOGOUT));
	});

	test('check logo', () => {
		const { getByRole } = render(jsx);
		const { src, alt } = getByRole('img');
		expect(src).toContain(logo);
		expect(alt).toContain('Logo');
	});

	test('check username', () => {
		const { queryByText } = render(jsx);
		expect(queryByText(mockedState.user.name)).toBeInTheDocument();
	});
});
