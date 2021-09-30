import { config } from '../core/Config'
import { ErrorReturnTypes } from '../core/Validator'
import { format } from '../utils/StringUtils'

const doesMatch =
	(toMatch: unknown, customMessage?: string) =>
	(fieldKey: string, value: unknown): ErrorReturnTypes => {
		if (value !== toMatch) {
			return (customMessage && format(customMessage, fieldKey, value)) || (config?.language?.doesMatch && format(config?.language?.doesMatch, fieldKey, value)) || 'Must match.'
		}
		return null
	}

export default doesMatch
