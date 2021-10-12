import { createValidator } from '..'
import { config } from '../core/Config'
import { ErrorReturnTypes, ValidatorFunction } from '../core/Validator'

const min = (minValue: number, customMessage?: string): ValidatorFunction<string | number> =>
	createValidator<string | number>((fieldKey: string, value: string | number): ErrorReturnTypes => {
		if (value != undefined) {
			if (typeof value === 'string') {
				if (value.length < minValue) {
					return config.language.minString
				}
			} else if (typeof value === 'number') {
				if (value < minValue) {
					return config.language.minNumber
				}
			}
		}
		return null
	}, customMessage)

export default min
