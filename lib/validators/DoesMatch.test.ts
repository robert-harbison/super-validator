import { setConfig } from '..'
import doesMatch from './DoesMatch'

beforeEach(() => {
	setConfig(null)
})

describe('DoesMatch:doesMatch()', () => {
	test('Should return null if values match.', () => {
		expect(doesMatch('test')('theField', 'test')).toEqual(null)
	})

	test('Should return error if value does not match.', () => {
		expect(doesMatch('test')('theField', 'test12')).toEqual('Must match.')
	})

	test('Should return custom message if provided when values do not match', () => {
		expect(doesMatch('test', 'Custom')('theField', 'test12')).toEqual('Custom')
	})

	test('Should return config message if set as error', () => {
		setConfig({ language: { doesMatch: 'CONFIG CUSTOM!' } })
		expect(doesMatch('test')('theField', 'test12')).toEqual('CONFIG CUSTOM!')
	})

	test('Provided message should override config message.', () => {
		setConfig({ language: { doesMatch: 'CONFIG CUSTOM!' } })
		expect(doesMatch('test', 'msg')('theField', 'test12')).toEqual('msg')
	})
})
