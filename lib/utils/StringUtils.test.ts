import { format } from './StringUtils'

describe('StringUtils:format()', () => {
	test('Should return inputed string if there is nothing to replace.', () => {
		expect(format('This is a test sentence.')).toEqual('This is a test sentence.')
		expect(format('This is a test sentence.', 4, 3)).toEqual('This is a test sentence.')
	})

	test('Should add args to string.', () => {
		expect(format('{0} This is a test sentence. {1}', 4, 3)).toEqual('4 This is a test sentence. 3')
	})

	test('Should return string un modified if index is not a number.', () => {
		expect(format('{asdasd} This is a test sentence.')).toEqual('{asdasd} This is a test sentence.')
	})

	test('Should return string replace with undefined if value at index does not exist', () => {
		expect(format('{0} This is a test sentence.')).toEqual('undefined This is a test sentence.')
	})
})
