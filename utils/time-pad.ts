export default function time(input: string | number) {
	if (!input) {
		return '00';
	}
	return `0${input}`.slice(-2);
}
