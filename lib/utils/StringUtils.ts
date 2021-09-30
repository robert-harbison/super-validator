/**
 * Adds variables in to a string in place of {i} i would be which argument to use to replace.
 *
 * @param str The string to format
 * @param args The arguments to add into a string.
 * @returns The formatted string.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const format = (str: string, ...args: any): string => {
	return str.replace(/{(\d+)}/g, function (match, number) {
		return typeof args[number] !== undefined ? args[number] : match
	})
}
