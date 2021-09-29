import { ErrorReturnTypes } from '../core/Validator'

const doesMatch =
	(toMatch: unknown, customMessage?: string) =>
	(value: unknown): ErrorReturnTypes => {
		if (value !== toMatch) {
			return customMessage || 'Must match.'
		}
		return null
	}

export default doesMatch
