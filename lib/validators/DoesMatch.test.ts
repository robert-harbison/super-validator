import doesMatch from './DoesMatch'

describe('Validator:doesMatch()', () => {
	test('Should return null if values match.', () => {
		expect(doesMatch('test')('test')).toEqual(null)
	})

	test('Should return error if value does not match.', () => {
		expect(doesMatch('test')('test12')).toEqual('Must match.')
	})

	test('Should return custom message if provided when values do not match', () => {
		expect(doesMatch('test', 'Custom')('test12')).toEqual('Custom')
	})
})
