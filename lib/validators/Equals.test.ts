import { setConfig } from '..'
import equals from './Equals'

beforeEach(() => {
	setConfig(null)
})

describe('Equals:equals()', () => {
	test('Should return null if values match.', () => {
		expect(equals('test')('theField', 'test')).toEqual(null)
	})

	test('Should validate based on the strict option.', () => {
		expect(equals(null)('theField', null)).toEqual(null)
		expect(equals(null)('theField', undefined)).toEqual('`theField` does not equal `undefined`.')
		expect(equals(null, false)('theField2', null)).toEqual(null)
		expect(equals(null, false)('theField2', undefined)).toEqual(null)
	})

	test('Should return error if value does not match.', () => {
		expect(equals('test')('theField', 'test12')).toEqual('`theField` does not equal `test12`.')
	})

	test('Should return custom message if provided when values do not match', () => {
		expect(equals('test', true, 'Custom')('theField', 'test12')).toEqual('Custom')
	})

	test('Should return config message if set as error', () => {
		setConfig({ language: { equals: 'CONFIG CUSTOM!' } })
		expect(equals('test')('theField', 'test12')).toEqual('CONFIG CUSTOM!')
	})

	test('Provided message should override config message.', () => {
		setConfig({ language: { equals: 'CONFIG CUSTOM!' } })
		expect(equals('test', true, 'msg')('theField', 'test12')).toEqual('msg')
	})
})
