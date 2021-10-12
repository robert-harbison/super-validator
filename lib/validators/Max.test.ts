/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { setConfig } from '..'
import max from './Max'

beforeEach(() => {
	setConfig(null)
})

describe('Max:min()', () => {
	test('Should not return error if value is null or undefined.', () => {
		expect(max(3)('theField', null!)).toEqual(null)
		expect(max(3)('theField', undefined!)).toEqual(null)
	})

	test('Should not return error if string value is shorter than required length.', () => {
		expect(max(5)('theField', 'test')).toEqual(null)
	})

	test('Should return error if string value is longer than required length.', () => {
		expect(max(3)('theField', 'test')).toEqual('`theField` is too long.')
	})

	test('Should not return error if number value is smaller than max number.', () => {
		expect(max(5)('theField', 4)).toEqual(null)
	})

	test('Should return error if number value is larger than max number.', () => {
		expect(max(3)('theField', 6)).toEqual('`theField` is too large.')
	})

	test('Should return custom error message if value is longer than required length and custom message is provided.', () => {
		expect(max(3, 'Oh No!')('theField', 'test')).toEqual('Oh No!')
	})

	test('Should return config message if set as error for the proper type (string or number)', () => {
		setConfig({ language: { maxString: 'CONFIG CUSTOM!' } })
		expect(max(3)('theField', 'test')).toEqual('CONFIG CUSTOM!')

		setConfig({ language: { maxNumber: 'CONFIG CUSTOM!' } })
		expect(max(3)('theField', 4)).toEqual('CONFIG CUSTOM!')
	})

	test('Provided message should override config message.', () => {
		setConfig({ language: { maxString: 'CONFIG CUSTOM!' } })
		expect(max(3, 'msg')('theField', 'test')).toEqual('msg')
	})
})
