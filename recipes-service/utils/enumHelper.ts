/* eslint-disable @typescript-eslint/no-explicit-any */
export function extractValueFromEnum(
	input: any,
	outputType: 'string' | 'number',
): any[] {
	const values = Object.keys(input)
		.map(key => input[key])
		.filter(value => typeof value === outputType)
	return values
}
