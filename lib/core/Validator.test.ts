/* eslint-disable @typescript-eslint/no-unused-vars */
import { max, min, required } from '..'
import { ErrorReturnTypes, exportedForTesting, validateSchema, ValidatorSchema } from './Validator'

const { processSingleValidator, processListOfValidators, validateSingle } = exportedForTesting

describe('Validator:processSingleValidator()', () => {
	test('Should return a string as the validation result.', () => {
		expect(processSingleValidator((fieldKey: string, value: unknown) => 'Error', 'field', 'theValue')).toEqual('Error')
	})

	test('Should return a array of string as the validation result.', () => {
		expect(processSingleValidator((fieldKey: string, value: unknown) => ['Error1', 'Error2'], 'field', 'theValue')).toEqual(['Error1', 'Error2'])
	})

	test('Should return null if there is no errors.', () => {
		expect(processSingleValidator((fieldKey: string, value: unknown) => null, 'field', 'theValue')).toEqual(null)
	})
})

describe('Validator:processListOfValidators()', () => {
	const validatorString = (fieldKey: string, value: unknown) => 'Error'
	const validatorArray = (fieldKey: string, value: unknown) => ['Error1', 'Error2']

	test('Should return a array of strings for each error in the list', () => {
		expect(processListOfValidators([validatorString, validatorString, validatorString], 'field', 'theValue')).toEqual(['Error', 'Error', 'Error'])
	})

	test('Should return a array of strings with all strings from each error.', () => {
		expect(processListOfValidators([validatorArray, validatorArray, validatorArray], 'field', 'theValue')).toEqual(['Error1', 'Error2', 'Error1', 'Error2', 'Error1', 'Error2'])
	})

	test('Should return no errors if the validator does not return anything or null.', () => {
		expect(
			processListOfValidators(
				[
					(fieldKey: string, value: unknown): ErrorReturnTypes => {
						return null
					},
				],
				'field',
				'value',
			),
		).toEqual(null)
		expect(processListOfValidators([(fieldKey: string, value: unknown) => null], 'field', 'value')).toEqual(null)
	})
})

describe('Validator:validateSingle()', () => {
	const validatorString = (fieldKey: string, value: unknown) => 'Error'
	const validatorArray = (fieldKey: string, value: unknown) => ['Error1', 'Error2']

	describe('validateSingle() should return proper values regardless of it being a single validator or a list of validators', () => {
		test('Should return a string as the validation result.', () => {
			expect(validateSingle('field', 'theValue', validatorString)).toEqual('Error')
		})

		test('Should return a array of string as the validation result.', () => {
			expect(validateSingle('field', 'theValue', validatorArray)).toEqual(['Error1', 'Error2'])
		})

		test('Should return a array of strings for each error in the list', () => {
			expect(validateSingle('field', 'theValue', [validatorString, validatorString, validatorString])).toEqual(['Error', 'Error', 'Error'])
		})

		test('Should return a array of strings with all strings from each error.', () => {
			expect(validateSingle('field', 'theValue', [validatorArray, validatorArray, validatorArray])).toEqual(['Error1', 'Error2', 'Error1', 'Error2', 'Error1', 'Error2'])
		})
	})
})

describe('Validator:validateSchema()', () => {
	const validatorStringEqualsTest = (fieldKey: string, value: unknown) => {
		return !value || value !== 'test' ? 'Value does not equal test' : null
	}

	test('Should return no errors if schema passes', () => {
		const schema = {
			firstName: validatorStringEqualsTest,
		}
		expect(validateSchema({ firstName: 'test' }, schema)).toEqual(null)
	})

	test('Should return errors if schema does not pass', () => {
		const schema = {
			firstName: validatorStringEqualsTest,
		}
		expect(validateSchema({ firstName: 'test123' }, schema)).toEqual({ firstName: 'Value does not equal test' })
	})

	test('Should return errors if value does not exist therefore schema does not pass', () => {
		const schema = {
			firstName: validatorStringEqualsTest,
		}
		expect(validateSchema({}, schema)).toEqual({ firstName: 'Value does not equal test' })
	})

	test('Should return proper response for tested objects.', () => {
		const schema: ValidatorSchema = {
			test: required(),
			test2: required(),
			test3: required(),
			options: {
				testa: [required(), min(5)],
				test2: required(),
				testb: {
					testc: [required(), min(5), max(2)],
					testd: required(),
					testf: required(),
				},
			},
		}

		// No errors obj has no errors.
		const test = validateSchema(
			{
				test: 'test',
				test3: 'test2',
				options: {
					test124: 'tasd',
					testa: 'tesasdasd',
					testb: { testc: 'aas', testd: 'asdasd' },
				},
			},
			schema,
		)

		expect(test).toEqual({
			test2: '`test2` is required.',
			options: { test2: '`test2` is required.', testb: { testc: ['`testc` is too short.', '`testc` is too long.'], testf: '`testf` is required.' } },
		})
	})
})
