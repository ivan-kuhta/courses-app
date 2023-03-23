import { minDigits } from './minDigits';

export function dateGeneratop() {
	const date = new Date();

	if (date === 'Invalid Date' && isNaN(date)) throw new Error('Invalid Date');

	let day = date.getDate();
	let month = date.getMonth() + 1;
	let year = date.getFullYear();

	return `${minDigits(day)}/${minDigits(month)}/${year}`;
}
