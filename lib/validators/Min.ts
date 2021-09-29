import { config } from '../core/Config'
import { ErrorReturnTypes } from '../core/Validator'

const min =
	(minValue: number, customMessage?: string) =>
	(value: string): ErrorReturnTypes => {
		if (value && value.length < minValue) {
			return customMessage || config?.language?.min || 'Too short.'
		}

		return null
	}

export default min
