/**
 *
 * generate id
 *
 * @returns {string} string
 */

export default function () {
	return crypto.randomUUID().replaceAll('-', '');
}
