import { config } from '../core/Config'
import { ErrorReturnTypes } from '../core/Validator'

const required =
	(customMessage?: string) =>
	(value: unknown): ErrorReturnTypes => {
		if (value === undefined || value === null) {
			return customMessage || config?.language?.required || 'Required.'
		}

		return null
	}

export default required

// TODO: Add opposite variations for these types of validators do it nicely though like adding not method before or someting.
