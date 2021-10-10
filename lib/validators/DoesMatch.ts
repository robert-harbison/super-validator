import { createValidator } from '..'
import { config } from '../core/Config'
import { ErrorReturnTypes, ValidatorFunction } from '../core/Validator'
import { format } from '../utils/StringUtils'

const doesMatch = (toMatch: unknown, customMessage?: string): ValidatorFunction =>
	createValidator((fieldKey: string, value: unknown): ErrorReturnTypes => {
		return value !== toMatch ? format(config.language.doesMatch, fieldKey, value) : null
	}, customMessage)

export default doesMatch
