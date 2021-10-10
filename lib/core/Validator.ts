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

	if (Object.keys(errors).length === 0) return null

	return errors
}

const validateSingle = (key: string, value: unknown, validator: ValidatorFunction | ValidatorFunction[]): ErrorReturnTypes => {
	if (Array.isArray(validator)) {
		return processListOfValidators(validator, key, value)
	} else {
		return processSingleValidator(validator, key, value)
	}
}

const processSingleValidator = (validator: ValidatorFunction, key: string, value: unknown): ErrorReturnTypes => {
	const funcReturned = validator(key, value)
	return funcReturned && Array.isArray(funcReturned) ? [...funcReturned] : funcReturned
}

const processListOfValidators = (validators: ValidatorFunction[], key: string, value: unknown): ErrorReturnTypes => {
	let validationResult: string[] = []

	for (let i = 0; i < validators.length; i++) {
		const validatorFunc = validators[i]
		const funcReturned = validatorFunc(key, value)
		if (funcReturned != null) {
			if (Array.isArray(funcReturned)) {
				validationResult = [...validationResult, ...funcReturned]
			} else {
				validationResult = [...validationResult, funcReturned]
			}
		}
	}

	if (validationResult.length === 0) return null
	return validationResult
}

export const exportedForTesting = {
	processListOfValidators,
	processSingleValidator,
	validateSingle,
}

// TODO: add custom log function to config and add loging.
// TODO: Order docs pages correctly.
// TODO: make sure the docs make sense alot of them are kind of jotted ideas.
// TODO: Add links throughout read me and docs.
// TODO: edit readme
// TODO: Check grammer, spelling and overall docs etc.
// TODO: Optimize / review code final
// TODO: push to master and move these comments to somewhere not here.
// TODO: Add circle ci
// TODO: Release
// TODO: Test in typescript. test in es6 and test in legacy js
// TODO: Make library that support for password validator, google phone lib, validator js?.
// TODO: Integrate into meeting_app and make sure it all works
