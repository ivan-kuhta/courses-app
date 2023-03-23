export function minDigits(number, count = 2) {
	return String(number).padStart(count, '0');
}
