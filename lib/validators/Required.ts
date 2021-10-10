import { createValidator } from '..'
import { config } from '../core/Config'
import { ErrorReturnTypes, ValidatorFunction } from '../core/Validator'
import { format } from '../utils/StringUtils'

const required = (customMessage?: string): ValidatorFunction =>
	createValidator((fieldKey: string, value: unknown): ErrorReturnTypes => {
		return value == null ? format(config.language.required, fieldKey, value) : null
	}, customMessage)

export default required
