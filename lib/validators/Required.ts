import { config } from '../core/Config'
import { ErrorReturnTypes } from '../core/Validator'
import { format } from '../utils/StringUtils'

const required =
	(customMessage?: string) =>
	(fieldKey: string, value: unknown): ErrorReturnTypes => {
		if (value === undefined || value === null) {
			return (customMessage && format(customMessage, fieldKey, value)) || (config?.language?.required && format(config?.language?.required, fieldKey, value)) || 'Required.'
		}

		return null
	}

export default required

// TODO: Add opposite variations for these types of validators do it nicely though like adding not method before or someting.
