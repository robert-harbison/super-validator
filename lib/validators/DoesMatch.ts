import { config } from '../core/Config'
import { ErrorReturnTypes } from '../core/Validator'

const doesMatch =
	(toMatch: unknown, customMessage?: string) =>
	(value: unknown): ErrorReturnTypes => {
		if (value !== toMatch) {
			return customMessage || config?.language?.doesMatch || 'Must match.'
		}
		return null
	}

export default doesMatch
