import { createValidator } from '..'
import { config } from '../core/Config'
import { ErrorReturnTypes, ValidatorFunction } from '../core/Validator'
import { format } from '../utils/StringUtils'

const min = (minValue: number, customMessage?: string): ValidatorFunction<string | number> =>
	createValidator<string | number>((fieldKey: string, value: string | number): ErrorReturnTypes => {
		if (value != undefined) {
			if (typeof value === 'string') {
				if (value.length < minValue) {
					return format(config.language.minString, fieldKey, value)
				}
			} else if (typeof value === 'number') {
				if (value < minValue) {
					return format(config.language.minNumber, fieldKey, value)
				}
			}
		}
		return null
	}, customMessage)

export default min
