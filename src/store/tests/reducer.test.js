import '@testing-library/jest-dom';
import coursesReducer, { initialState } from '../courses/reducer';
import { mockedCoursesList } from '../../mockData';
import { ADD_COURSE, FETCH_COURSES } from '../courses/actionTypes';

describe('courses reducer', () => {
	test('should return the initial state', () => {
		expect(coursesReducer(undefined, {})).toEqual(initialState);
	});

	test('should handle SAVE_COURSE and returns new state', () => {
		const mockCourse = mockedCoursesList[0];

		const addCourseAction = {
			type: ADD_COURSE,
			payload: mockCourse,
		};

		expect(coursesReducer(undefined, addCourseAction)).toEqual({
			...initialState,
			items: [...initialState.items, mockCourse],
		});
	});

	test('should handle GET_COURSES and returns new state', () => {
		const getCoursesAction = {
			type: FETCH_COURSES,
		};

		expect(coursesReducer(undefined, getCoursesAction)).toEqual({
			loading: true,
			items: [],
			errors: null,
		});
	});
});
