import { ErrorReturnTypes } from '../core/Validator'

const min =
	(minValue: number, customMessage?: string) =>
	(value: string): ErrorReturnTypes => {
		if (value && value.length < minValue) {
			return customMessage || 'Too short.'
		}

		return null
	}

export default min
