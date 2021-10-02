import { config } from '../core/Config'
import { ErrorReturnTypes } from '../core/Validator'
import { format } from '../utils/StringUtils'

const required =
	(customMessage?: string) =>
	(fieldKey: string, value: unknown): ErrorReturnTypes => {
		if (value == null) {
			return (customMessage && format(customMessage, fieldKey, value)) || format(config?.language?.required, fieldKey, value)
		}

		return null
	}

export default required
