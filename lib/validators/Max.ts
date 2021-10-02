import { config } from '../core/Config'
import { ErrorReturnTypes } from '../core/Validator'
import { format } from '../utils/StringUtils'

const max =
	(maxValue: number, customMessage?: string) =>
	(fieldKey: string, value: string | number): ErrorReturnTypes => {
		const isString = typeof value === 'string'
		if (value) {
			if (isString) {
				if (value.length > maxValue) {
					return (customMessage && format(customMessage, fieldKey, value, maxValue)) || format(config?.language?.maxString, fieldKey, value, maxValue)
				}
			} else {
				if (value > maxValue) {
					return (customMessage && format(customMessage, fieldKey, value, maxValue)) || format(config?.language?.maxNumber, fieldKey, value, maxValue)
				}
			}
		}
		return null
	}

export default max
