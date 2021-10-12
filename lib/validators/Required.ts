import { createValidator } from '..'
import { config } from '../core/Config'
import { ErrorReturnTypes, ValidatorFunction } from '../core/Validator'

const required = (customMessage?: string): ValidatorFunction =>
	createValidator((fieldKey: string, value: unknown): ErrorReturnTypes => {
		return value == null ? config.language.required : null
	}, customMessage)

export default required
