/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorReturnTypes } from '../core/Validator'
import { createValidator } from './ValidatorUtils'

describe('ValidatorUtils:createValidator()', () => {
	test('Should return null if no error is returned from function.', () => {
		const test = createValidator((fieldKey: string, value: unknown): ErrorReturnTypes => {
			return null
		})
		expect(test('field', 'value')).toEqual(null)
	})

	test('Should return the error string if a error is returned from function.', () => {
		const test = createValidator((fieldKey: string, value: unknown): ErrorReturnTypes => {
			return 'error'
		})
		expect(test('field', 'value')).toEqual('error')
	})

	test('Should return the error string array if a error is returned from function.', () => {
		const test = createValidator((fieldKey: string, value: unknown): ErrorReturnTypes => {
			return ['error', 'error2', 'error3']
		})
		expect(test('field', 'value')).toEqual(['error', 'error2', 'error3'])
	})

	test('Should return null if empty array is returned from validator', () => {
		const test = createValidator((fieldKey: string, value: unknown): ErrorReturnTypes => {
			return []
		})
		expect(test('field', 'value')).toEqual(null)
	})

	test('Should return the custom message if provided.', () => {
		const test = createValidator((fieldKey: string, value: unknown): ErrorReturnTypes => {
			return 'error'
		}, 'test message')
		expect(test('field', 'value')).toEqual('test message')

		const test2 = createValidator((fieldKey: string, value: unknown): ErrorReturnTypes => {
			return ['error', 'error2', 'error3']
		}, 'test message')
		expect(test2('field', 'value')).toEqual('test message')
	})

	test('Should inject values in all errors.', () => {
		const test = createValidator((fieldKey: string, value: unknown): ErrorReturnTypes => {
			return '{0} {1} error'
		})
		expect(test('field', 'value')).toEqual('field value error')

		const test2 = createValidator((fieldKey: string, value: unknown): ErrorReturnTypes => {
			return ['{0} {1} error', '{0} {1} error2', '{0} {1} error3']
		})
		expect(test2('field', 'value')).toEqual(['field value error', 'field value error2', 'field value error3'])
	})
})
