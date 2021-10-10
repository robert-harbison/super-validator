import { setConfig } from '..'
import min from './Min'

beforeEach(() => {
	setConfig(null)
})

describe('Min:min()', () => {
	test('Should not return error if value is null or undefined.', () => {
		expect(min(3)('fieldName', null!)).toEqual(null)
		expect(min(3)('fieldName', undefined!)).toEqual(null)
	})

	test('Should not return error if string value is longer than required length.', () => {
		expect(min(3)('fieldName', 'test')).toEqual(null)
	})

	test('Should return error if string value is shorter than required length.', () => {
		expect(min(3)('fieldName', 'te')).toEqual('`fieldName` is too short.')
	})

	test('Should not return error if number value is larger than required number.', () => {
		expect(min(3)('fieldName', 4)).toEqual(null)
	})

	test('Should return error if number value is smaller than required number.', () => {
		expect(min(3)('fieldName', 2)).toEqual('`fieldName` is too small.')
	})

	test('Should return custom error message if value is shorter than required length and custom message is provided.', () => {
		expect(min(3, 'Oh No!')('fieldName', 'te')).toEqual('Oh No!')
	})

	test('Should return config message if set as error for the proper type (string or number)', () => {
		setConfig({ language: { minString: 'CONFIG CUSTOM!' } })
		expect(min(3)('fieldName', 'te')).toEqual('CONFIG CUSTOM!')

		setConfig({ language: { minNumber: 'CONFIG CUSTOM!' } })
		expect(min(3)('fieldName', 2)).toEqual('CONFIG CUSTOM!')
	})

	test('Provided message should override config message.', () => {
		setConfig({ language: { doesMatch: 'CONFIG CUSTOM!' } })
		expect(min(3, 'msg')('fieldName', 'te')).toEqual('msg')
	})
})
