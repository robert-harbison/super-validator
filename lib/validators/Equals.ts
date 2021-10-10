import { createValidator } from '..'
import { config } from '../core/Config'
import { ErrorReturnTypes, ValidatorFunction } from '../core/Validator'
import { format } from '../utils/StringUtils'

const equals = (toEqual: unknown, strict = true, customMessage?: string): ValidatorFunction =>
	createValidator((fieldKey: string, value: unknown): ErrorReturnTypes => {
		const check = strict ? value !== toEqual : value != toEqual
		return check ? format(config.language.equals, fieldKey, value) : null
	}, customMessage)

export default equals
