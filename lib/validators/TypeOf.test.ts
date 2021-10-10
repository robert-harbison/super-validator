import { setConfig } from '..'
import typeOf from './typeOf'

beforeEach(() => {
	setConfig(null)
})

describe('TypeOf:typeOf()', () => {
	test('Should return null if types are correct.', () => {
		expect(typeOf('string')('theField', 'test')).toEqual(null)
		expect(typeOf('number')('theField', 4)).toEqual(null)
		expect(typeOf('boolean')('theField', false)).toEqual(null)
	})

	test('Should return error if types do not match.', () => {
		expect(typeOf('string')('theField', 4)).toEqual('`theField` is of the wrong type.')
		expect(typeOf('string')('theField', false)).toEqual('`theField` is of the wrong type.')
		expect(typeOf('boolean')('theField', 'test')).toEqual('`theField` is of the wrong type.')
	})

	test('Should return custom message if provided when values do not match', () => {
		expect(typeOf('number', 'Custom')('theField', 'test12')).toEqual('Custom')
	})

	test('Should return config message if set as error', () => {
		setConfig({ language: { typeOf: 'CONFIG CUSTOM!' } })
		expect(typeOf('number')('theField', 'test12')).toEqual('CONFIG CUSTOM!')
	})

	test('Provided message should override config message.', () => {
		setConfig({ language: { typeOf: 'CONFIG CUSTOM!' } })
		expect(typeOf('number', 'msg')('theField', 'test12')).toEqual('msg')
	})
})
