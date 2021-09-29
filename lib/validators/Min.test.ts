import min from './Min'

describe('Validator:min()', () => {
	test('Should not return error if value is null or undefined.', () => {
		expect(min(3)(null!)).toEqual(null)
		expect(min(3)(undefined!)).toEqual(null)
	})

	test('Should not return error if value is longer than required length.', () => {
		expect(min(3)('test')).toEqual(null)
		expect(min(3)('test')).toEqual(null)
	})

	test('Should return error if value is shorter than required length.', () => {
		expect(min(3)('te')).toEqual('Too short.')
		expect(min(3)('te')).toEqual('Too short.')
	})

	test('Should return custom error message if value is shorter than required length and custom message is provided.', () => {
		expect(min(3, 'Oh No!')('te')).toEqual('Oh No!')
	})
})
