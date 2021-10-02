import { GenericObjectOfType, GenericObject } from '../utils/ObjectUtils'

type ValidatorFunction = (fieldKey: string, value: unknown) => ErrorReturnTypes

export type ErrorReturnTypes = string | string[] | null
export interface ValidatorSchema extends GenericObjectOfType<ValidatorFunction | ValidatorFunction[]> {}
export interface ValidatorError extends GenericObjectOfType<ErrorReturnTypes> {}

/**
 * Validates a object against a schema.
 *
 * @param obj The object to validate against the schema.
 * @param schema The schema to use for validation.
 * @returns The errors from validating. Returns 'null' if there are no erros.
 */
export const validateSchema = (toValidateObj: GenericObject, schema: ValidatorSchema): ValidatorError[] | null => {
	const errors: ValidatorError[] = []

	const schemaObj = Object.keys(schema)
	for (let i = 0; i < schemaObj.length; i++) {
		const toValidateObjKey = schemaObj[i]
		const objValue = toValidateObj[toValidateObjKey]
		const schemaValidatorFuncs = schema[toValidateObjKey]

		if (schemaValidatorFuncs !== undefined) {
			const validationResult = validateSingle(toValidateObjKey, objValue, schemaValidatorFuncs)
			if (validationResult && validationResult.length > 0) {
				const errorObj: GenericObject = {}
				errorObj[toValidateObjKey] = validationResult
				errors.push(errorObj)
			}
		}
	}

	if (errors.length === 0) {
		return null
	}

	return errors
}

/**
 * Validates a single object.
 *
 * @param valueToValidate The value to use for validation.
 * @param schemaValidatorFuncs The validator function or array of validator functions to use to validate the value provided.
 * @returns The errors from validating. Returns 'null' if there are no erros.
 */
export const validateSingle = (fieldKey: string, valueToValidate: unknown, schemaValidatorFuncs: ValidatorFunction | ValidatorFunction[]): ErrorReturnTypes => {
	if (Array.isArray(schemaValidatorFuncs)) {
		return processListOfValidators(schemaValidatorFuncs, fieldKey, valueToValidate)
	} else {
		return processSingleValidator(schemaValidatorFuncs, fieldKey, valueToValidate)
	}
}

const processSingleValidator = (validator: ValidatorFunction, fieldKey: string, valueToValidate: unknown): ErrorReturnTypes => {
	const funcReturned = validator(fieldKey, valueToValidate)

	if (funcReturned == null) {
		return null
	} else if (Array.isArray(funcReturned)) {
		return [...funcReturned]
	} else {
		return funcReturned
	}
}

const processListOfValidators = (validators: ValidatorFunction[], fieldKey: string, valueToValidate: unknown): ErrorReturnTypes => {
	let validationResult: string[] = []

	for (let i = 0; i < validators.length; i++) {
		const validatorFunc = validators[i]
		const funcReturned = validatorFunc(fieldKey, valueToValidate)
		if (funcReturned != null) {
			if (Array.isArray(funcReturned)) {
				validationResult = [...validationResult, ...funcReturned]
			} else {
				validationResult = [...validationResult, funcReturned]
			}
		}
	}

	if (validationResult.length === 0) {
		return null
	}

	return validationResult
}

export const exportedForTesting = {
	processListOfValidators,
	processSingleValidator,
}
// Notes validation function can return strings or arrays of string if it returns null there is no error. This will later be made into a object so you can have a dev and user message.
// Validators like min and max don't return a error if nothing is provided.
// Adding variables to messages. 0 is fieldKey, 1 is value

// TODO: Add links throughout read me.
// Support nested schemas
// Add readme
// TODO: add password validator that takes in password options.
// TODO: Optimize / review code
// TODO: Fix Todos
// TODO: Try to optimise performance.
// TODO: Test in typescript. test in es6 and test in legacy js
// TODO: Test in project.
// TODO: Look at doing some of the in the future in readme.
// TODO: Add circle ci
// TODO: Release
// TOOD: Add phone, email validator + look at validator js for other ideas to add.
// TODO: Integrate into meeting_app and make sure it all works
