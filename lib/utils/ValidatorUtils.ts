import { ErrorReturnTypes, ValidatorFunction } from '../core/Validator'
import { format } from './StringUtils'

export const createValidator = <T = unknown>(check: ValidatorFunction<T>, customMessage?: string): ValidatorFunction<T> => {
	return (fieldKey: string, value: T): ErrorReturnTypes => {
		const result = check(fieldKey, value)
		const hasError = typeof result === 'string' || (Array.isArray(result) && result.length > 0)
		if (result !== null && hasError) {
			return (customMessage && format(customMessage, fieldKey, value)) || result
		}
		return null
	}
}
