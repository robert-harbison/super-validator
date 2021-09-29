import { ErrorReturnTypes } from '../core/Validator'

const max =
	(maxValue: number, customMessage?: string) =>
	(value: string): ErrorReturnTypes => {
		if (value && value.length > maxValue) {
			return customMessage || 'Too long.'
		}
		return null
	}

export default max
