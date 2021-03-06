import { ErrorReturnTypes, ValidatorFunction } from '../core/Validator'
import { format } from './StringUtils'

/**
 * Creates a validator function.
 *
 * @param check The function to determine if there are errors.
 * @param customMessage The custom message to use in place of validator errors.
 * @returns The new validator function.
 */
export const createValidator = <T = unknown>(check: ValidatorFunction<T>, customMessage?: string): ValidatorFunction<T> => {
	return (fieldKey: string, value: T): ErrorReturnTypes => {
		const result = check(fieldKey, value)
		const hasError = result !== null && (typeof result === 'string' || (Array.isArray(result) && result.length > 0))
		if (hasError) {
			let formattedResult = result
			if (Array.isArray(formattedResult)) {
				for (let i = 0; i < formattedResult.length; i++) {
					formattedResult[i] = format(formattedResult[i], fieldKey, value)
				}
			} else {
				formattedResult = format(formattedResult, fieldKey, value)
			}
			return (customMessage && format(customMessage, fieldKey, value)) || formattedResult
		}
		return null
	}
}
