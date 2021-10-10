import { createValidator } from '..'
import { config } from '../core/Config'
import { ErrorReturnTypes, ValidatorFunction } from '../core/Validator'

const max = (maxValue: number, customMessage?: string): ValidatorFunction<string | number> =>
	createValidator<string | number>((fieldKey: string, value: string | number): ErrorReturnTypes => {
		if (value != undefined) {
			if (typeof value === 'string') {
				if (value.length > maxValue) {
					return config.language.maxString
				}
			} else if (typeof value === 'number') {
				if (value > maxValue) {
					return config.language.maxNumber
				}
			}
		}
		return null
	}, customMessage)

export default max
