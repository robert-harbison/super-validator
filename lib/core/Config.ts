import merge from 'merge-deep'
import { RecursivePartial } from '../utils/ObjectUtils'

interface Config {
	// All language configs.
	language: {
		minString: string // The message to give when the min validator fails for a string.
		minNumber: string // The message to give when the min validator fails for a number.
		maxString: string // The message to give when the max validator fails for a string.
		maxNumber: string // The message to give when the max validator fails for a number.
		equals: string // The message to give when the equals validator fails.
		required: string // The message to give when the required validator fails.
		typeOf: string // The message to give when the typeOf validator fails.
	}
}

const defaultConfig: Config = {
	language: {
		minString: '`{0}` is too short.',
		minNumber: '`{0}` is too small.',
		maxString: '`{0}` is too long.',
		maxNumber: '`{0}` is too large.',
		equals: '`{0}` does not equal target.',
		required: '`{0}` is required.',
		typeOf: '`{0}` is of the wrong type.',
	},
}

export let config: Config = defaultConfig

/**
 * @param newConfig Sets the new config options. If null is provided the config will be back to the default state.
 */
export const setConfig = (newConfig: RecursivePartial<Config> | null): void => {
	config = merge(defaultConfig, newConfig)
}
