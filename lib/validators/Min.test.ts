import { setConfig } from '..'
import min from './Min'

beforeEach(() => {
	setConfig(null)
})

describe('Min:min()', () => {
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

	test('Should return config message if set as error', () => {
		setConfig({ language: { min: 'CONFIG CUSTOM!' } })
		expect(min(3)('te')).toEqual('CONFIG CUSTOM!')
	})

	test('Provided message should override config message.', () => {
		setConfig({ language: { doesMatch: 'CONFIG CUSTOM!' } })
		expect(min(3, 'msg')('te')).toEqual('msg')
	})
})
