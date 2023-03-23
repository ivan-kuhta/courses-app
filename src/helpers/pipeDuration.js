import { minDigits } from './minDigits';

export function pipeDuration(duration) {
	duration = Number(duration);
	if (isNaN(duration)) throw new Error(`Not a number`);

	const hours = Math.floor(duration / 60) || 0;
	const minutes = duration - hours * 60;
	return `${minDigits(hours)}:${minDigits(minutes)}`;
}
