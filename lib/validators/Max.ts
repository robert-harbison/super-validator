import { createValidator } from '..'
import { config } from '../core/Config'
import { ErrorReturnTypes, ValidatorFunction } from '../core/Validator'
import { format } from '../utils/StringUtils'

const max = (maxValue: number, customMessage?: string): ValidatorFunction<string | number> =>
	createValidator<string | number>((fieldKey: string, value: string | number): ErrorReturnTypes => {
		if (value != undefined) {
			if (typeof value === 'string') {
				if (value.length > maxValue) {
					return format(config.language.maxString, fieldKey, value)
				}
			} else if (typeof value === 'number') {
				if (value > maxValue) {
					return format(config.language.maxNumber, fieldKey, value)
				}
			}
		}
		return null
	}, customMessage)

export default max
