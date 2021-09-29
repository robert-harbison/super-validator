import { setConfig } from '..'
import max from './Max'

beforeEach(() => {
	setConfig(null)
})

describe('Max:min()', () => {
	test('Should not return error if value is null or undefined.', () => {
		expect(max(3)(null!)).toEqual(null)
		expect(max(3)(undefined!)).toEqual(null)
	})

	test('Should not return error if value is shorter than required length.', () => {
		expect(max(5)('test')).toEqual(null)
		expect(max(5)('test')).toEqual(null)
	})

	test('Should return error if value is longer than required length.', () => {
		expect(max(3)('test')).toEqual('Too long.')
		expect(max(3)('test')).toEqual('Too long.')
	})

	test('Should return custom error message if value is longer than required length and custom message is provided.', () => {
		expect(max(3, 'Oh No!')('test')).toEqual('Oh No!')
	})

	test('Should return config message if set as error', () => {
		setConfig({ language: { max: 'CONFIG CUSTOM!' } })
		expect(max(3)('test')).toEqual('CONFIG CUSTOM!')
	})

	test('Provided message should override config message.', () => {
		setConfig({ language: { doesMatch: 'CONFIG CUSTOM!' } })
		expect(max(3, 'msg')('test')).toEqual('msg')
	})
})
