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

	test('Should not return error if value is shorter than required length.', () => {
		expect(max(5)('theField', 'test')).toEqual(null)
		expect(max(5)('theField', 'test')).toEqual(null)
	})

	test('Should return error if value is longer than required length.', () => {
		expect(max(3)('theField', 'test')).toEqual('`theField` is longer than `3`.')
		expect(max(3)('theField', 'test')).toEqual('`theField` is longer than `3`.')
	})

	test('Should return custom error message if value is longer than required length and custom message is provided.', () => {
		expect(max(3, 'Oh No!')('theField', 'test')).toEqual('Oh No!')
	})

	test('Should return config message if set as error', () => {
		setConfig({ language: { max: 'CONFIG CUSTOM!' } })
		expect(max(3)('theField', 'test')).toEqual('CONFIG CUSTOM!')
	})

	test('Provided message should override config message.', () => {
		setConfig({ language: { doesMatch: 'CONFIG CUSTOM!' } })
		expect(max(3, 'msg')('theField', 'test')).toEqual('msg')
	})
})
