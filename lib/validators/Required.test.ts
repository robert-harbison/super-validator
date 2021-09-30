import { setConfig } from '..'
import required from './Required'

beforeEach(() => {
	setConfig(null)
})

describe('Required:required()', () => {
	test('Should return error if value is null or undefined.', () => {
		expect(required()('theField', null)).toEqual('`theField` is required.')
		expect(required()('theField', undefined)).toEqual('`theField` is required.')
	})

	test('Should not return error if value is defined.', () => {
		expect(required()('theField', 'test')).toEqual(null)
		expect(required()('theField', 'test')).toEqual(null)
	})

	test('Should return custom message if provided when values are null or undefined', () => {
		expect(required('Custom')('theField', null)).toEqual('Custom')
		expect(required('Custom')('theField', undefined)).toEqual('Custom')
	})

	test('Should return config message if set as error', () => {
		setConfig({ language: { required: 'CONFIG CUSTOM!' } })
		expect(required()('theField', null)).toEqual('CONFIG CUSTOM!')
	})

	test('Provided message should override config message.', () => {
		setConfig({ language: { doesMatch: 'CONFIG CUSTOM!' } })
		expect(required('msg')('theField', null)).toEqual('msg')
	})
})
