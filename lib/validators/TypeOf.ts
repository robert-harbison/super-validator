import { createValidator } from '..'
import { config } from '../core/Config'
import { ErrorReturnTypes, ValidatorFunction } from '../core/Validator'

const typeOf = (type: string, customMessage?: string): ValidatorFunction =>
	createValidator((fieldKey: string, value: unknown): ErrorReturnTypes => {
		return typeof value !== type ? config.language.typeOf : null
	}, customMessage)

export default typeOf
