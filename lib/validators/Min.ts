import { config } from '../core/Config'
import { ErrorReturnTypes } from '../core/Validator'
import { format } from '../utils/StringUtils'

const min =
	(minValue: number, customMessage?: string) =>
	(fieldKey: string, value: string | number): ErrorReturnTypes => {
		const isString = typeof value === 'string'
		if (value) {
			if (isString) {
				if (value.length < minValue) {
					return (customMessage && format(customMessage, fieldKey, value, minValue)) || format(config?.language?.minString, fieldKey, value, minValue)
				}
			} else {
				if (value < minValue) {
					return (customMessage && format(customMessage, fieldKey, value, minValue)) || format(config?.language?.minNumber, fieldKey, value, minValue)
				}
			}
		}

		return null
	}

export default min
