import { config } from '../core/Config'
import { ErrorReturnTypes } from '../core/Validator'
import { format } from '../utils/StringUtils'

const doesMatch =
	(toMatch: unknown, customMessage?: string) =>
	(fieldKey: string, value: unknown): ErrorReturnTypes => {
		if (value !== toMatch) {
			return (customMessage && format(customMessage, fieldKey, value)) || format(config.language.doesMatch, fieldKey, value)
		}
		return null
	}

export default doesMatch
