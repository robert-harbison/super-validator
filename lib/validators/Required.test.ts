import { setConfig } from '..'
import required from './Required'

describe('Required:required()', () => {
	test('Should return error if value is null or undefined.', () => {
		expect(required()(null)).toEqual('Required.')
		expect(required()(undefined)).toEqual('Required.')
	})

	test('Should not return error if value is defined.', () => {
		expect(required()('test')).toEqual(null)
		expect(required()('test')).toEqual(null)
	})

	test('Should return custom message if provided when values are null or undefined', () => {
		expect(required('Custom')(null)).toEqual('Custom')
		expect(required('Custom')(undefined)).toEqual('Custom')
	})

	test('Should return config message if set as error', () => {
		setConfig({ language: { required: 'CONFIG CUSTOM!' } })
		expect(required()(null)).toEqual('CONFIG CUSTOM!')
	})

	test('Provided message should override config message.', () => {
		setConfig({ language: { doesMatch: 'CONFIG CUSTOM!' } })
		expect(required('msg')(null)).toEqual('msg')
	})
})
