import { config } from '../core/Config'
import { ErrorReturnTypes } from '../core/Validator'
import { format } from '../utils/StringUtils'

const min =
	(minValue: number, customMessage?: string) =>
	(fieldKey: string, value: string): ErrorReturnTypes => {
		if (value && value.length < minValue) {
			return (customMessage && format(customMessage, fieldKey, value)) || (config?.language?.min && format(config?.language?.min, fieldKey, value)) || 'Too short.'
		}

		return null
	}

export default min
