import { createValidator } from '..'
import { config } from '../core/Config'
import { ErrorReturnTypes, ValidatorFunction } from '../core/Validator'
import { format } from '../utils/StringUtils'

const typeOf = (type: string, customMessage?: string): ValidatorFunction =>
	createValidator((fieldKey: string, value: unknown): ErrorReturnTypes => {
		return typeof value !== type ? format(config.language.typeOf, fieldKey, value) : null
	}, customMessage)

export default typeOf
