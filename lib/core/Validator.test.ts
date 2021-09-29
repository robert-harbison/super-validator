import { exportedForTesting, validateSingle, validateSchema } from './Validator'

const { processSingleValidator, processListOfValidators } = exportedForTesting

describe('Validator:processSingleValidator()', () => {
	test('Should return a string as the validation result.', () => {
		expect(processSingleValidator((value: unknown) => 'Error', 'theValue')).toEqual('Error')
	})

	test('Should return a array of string as the validation result.', () => {
		expect(processSingleValidator((value: unknown) => ['Error1', 'Error2'], 'theValue')).toEqual(['Error1', 'Error2'])
	})
})

describe('Validator:processListOfValidators()', () => {
	const validatorString = (value: unknown) => 'Error'
	const validatorArray = (value: unknown) => ['Error1', 'Error2']

	test('Should return a array of strings for each error in the list', () => {
		expect(processListOfValidators([validatorString, validatorString, validatorString], 'theValue')).toEqual(['Error', 'Error', 'Error'])
	})

	test('Should return a array of strings with all strings from each error.', () => {
		expect(processListOfValidators([validatorArray, validatorArray, validatorArray], 'theValue')).toEqual(['Error1', 'Error2', 'Error1', 'Error2', 'Error1', 'Error2'])
	})

	test('Should return no errors if the validator does not return anything or null.', () => {
		expect(
			processListOfValidators(
				[
					(value: unknown): any => {
						return
					},
				],
				'value',
			),
		).toEqual(null)
		expect(processListOfValidators([(value: unknown) => null], 'value')).toEqual(null)
	})
})

describe('Validator:validateSingle()', () => {
	const validatorString = (value: unknown) => 'Error'
	const validatorArray = (value: unknown) => ['Error1', 'Error2']

	describe('validateSingle() should return proper values regardless of it being a single validator or a list of validators', () => {
		test('Should return a string as the validation result.', () => {
			expect(validateSingle('theValue', validatorString)).toEqual('Error')
		})

		test('Should return a array of string as the validation result.', () => {
			expect(validateSingle('theValue', validatorArray)).toEqual(['Error1', 'Error2'])
		})

		test('Should return a array of strings for each error in the list', () => {
			expect(validateSingle('theValue', [validatorString, validatorString, validatorString])).toEqual(['Error', 'Error', 'Error'])
		})

		test('Should return a array of strings with all strings from each error.', () => {
			expect(validateSingle('theValue', [validatorArray, validatorArray, validatorArray])).toEqual(['Error1', 'Error2', 'Error1', 'Error2', 'Error1', 'Error2'])
		})
	})
})

describe('Validator:validateSchema()', () => {
	const validatorStringEqualsTest = (value: unknown) => (!value || value !== 'test' ? 'Value does not equal test' : null)

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
		expect(validateSchema({ firstName: 'test123' }, schema)).toEqual([{ firstName: 'Value does not equal test' }])
	})

	// // TODO: Make it so a value can be required
	// test('Should return errors if value does not exist therefore schema does not pass', () => {
	// 	const schema = {
	// 		firstName: validatorStringEqualsTest,
	// 	}
	// 	expect(validateSchema({}, schema)).toEqual([{ firstName: 'Value does not equal test' }])
	// })
})
