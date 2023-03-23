export function transformDate(date, divider = '.') {
	return date.replace(/\//g, divider);
}
