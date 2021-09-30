import { config } from '../core/Config'
import { ErrorReturnTypes } from '../core/Validator'
import { format } from '../utils/StringUtils'

const max =
	(maxValue: number, customMessage?: string) =>
	(fieldKey: string, value: string): ErrorReturnTypes => {
		if (value && value.length > maxValue) {
			return (customMessage && format(customMessage, fieldKey, value, maxValue)) || format(config?.language?.max, fieldKey, value, maxValue)
		}
		return null
	}

export default max
