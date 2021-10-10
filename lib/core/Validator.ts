import { GenericObjectOfType, GenericObject, addNestedValueToObj } from '../utils/ObjectUtils'

export type ValidatorFunction<T = unknown> = (fieldKey: string, value: T) => ErrorReturnTypes

export type ErrorReturnTypes = string | string[] | null
export interface ValidatorSchema extends GenericObjectOfType<ValidatorFunction | ValidatorFunction[] | GenericObject> {}
export interface ValidatorError extends GenericObjectOfType<ErrorReturnTypes | ValidatorError> {}

/**
 * Validates a object against a schema.
 *
 * @param obj The object to validate against the schema.
 * @param schema The schema to use for validation.
 * @returns The errors from validating. Returns 'null' if there are no erros.
 */
export const validateSchema = (toValidateObj: GenericObject, schema: ValidatorSchema): ValidatorError | null => {
	const errors: ValidatorError = {}

	// Object to validate, validation schema, nested object parent key
	const validationStack: Array<[GenericObject, ValidatorSchema, string[]?]> = [[toValidateObj, schema]]

	while (validationStack.length > 0) {
		const validationParams = validationStack.pop()
		if (!validationParams) continue

		const [objToValidate, validationSchema, parentObjPath] = validationParams
		if (objToValidate === undefined || validationSchema === undefined) continue

		const keys = Object.keys(validationSchema)
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i]
			const validator = validationSchema[key]
			const value = objToValidate[key]

			if (Array.isArray(validator) || typeof validator === 'function') {
				const validationResult = validateSingle(key, value, validator as ValidatorFunction | ValidatorFunction[])
				if (validationResult && validationResult.length > 0) {
					if (parentObjPath !== undefined) {
						addNestedValueToObj(errors, [...parentObjPath, key], validationResult)
					} else {
						errors[key] = validationResult
					}
				}
				// Deals with nested schemas and objects.
			} else if (typeof validator === 'object') {
				const _parentObjPath = parentObjPath ? [...parentObjPath, key] : [key]
				validationStack.push([value, validator, _parentObjPath])
			}
		}
	}

	if (Object.keys(errors).length === 0) {
		return null
	}

	return errors
}

const validateSingle = (fieldKey: string, valueToValidate: unknown, schemaValidatorFuncs: ValidatorFunction | ValidatorFunction[]): ErrorReturnTypes => {
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
	}

	return Array.isArray(funcReturned) ? [...funcReturned] : funcReturned
}

const processListOfValidators = (validators: ValidatorFunction[], fieldKey: string, valueToValidate: unknown): ErrorReturnTypes => {
	let validationResult: string | string[] = []

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
	validateSingle,
}
// Notes validation function can return strings or arrays of string if it returns null there is no error. This will later be made into a object so you can have a dev and user message.
// Validators like min and max don't return a error if nothing is provided.
// Adding variables to messages. 0 is fieldKey, 1 is value
// When validating a schema if you pass in a array of validators it will return a array of errors instead of a string
// We use validator js for some validators.

// TODO: Add links throughout read me.
// TODO: Look at doing some of the in the future in readme entries.
// TODO: edit readme
// TODO: Optimize / review code
// TODO: Add circle ci
// TODO: Release
// TODO: Test in typescript. test in es6 and test in legacy js
// TODO: Test in project.
// TODO: Make library that support for password validator, google phone lib, validator js?.
// TODO: Integrate into meeting_app and make sure it all works
