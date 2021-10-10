import { ErrorReturnTypes, ValidatorFunction } from '../core/Validator'
import { format } from './StringUtils'

export const createValidator = <T = unknown>(check: ValidatorFunction<T>, customMessage?: string): ValidatorFunction<T> => {
	return (fieldKey: string, value: T): ErrorReturnTypes => {
		const result = check(fieldKey, value)
		if (result !== null) {
			return (customMessage && format(customMessage, fieldKey, value)) || result
		}
		return null
	}
}
