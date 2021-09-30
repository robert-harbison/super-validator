import { config } from '../core/Config'
import { ErrorReturnTypes } from '../core/Validator'
import { format } from '../utils/StringUtils'

const min =
	(minValue: number, customMessage?: string) =>
	(fieldKey: string, value: string): ErrorReturnTypes => {
		if (value && value.length < minValue) {
			return (customMessage && format(customMessage, fieldKey, value, minValue)) || format(config?.language?.min, fieldKey, value, minValue)
		}

		return null
	}

export default min
