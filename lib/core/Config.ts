import merge from 'merge-deep'
import { RecursivePartial } from '../utils/ObjectUtils'

interface Config {
	language: {
		minString: string
		minNumber: string
		maxString: string
		maxNumber: string
		doesMatch: string
		required: string
	}
}

const defaultConfig: Config = {
	language: {
		minString: '`{0}` is too short.',
		minNumber: '`{0}` is too small.',
		maxString: '`{0}` is too long.',
		maxNumber: '`{0}` is too large.',
		doesMatch: '`{0}` does not match `{1}`.',
		required: '`{0}` is required.',
	},
}

export let config: Config = defaultConfig

/**
 * @param newConfig Sets the new config options. If null is provided the config will be back to the default state.
 */
export const setConfig = (newConfig: RecursivePartial<Config> | null): void => {
	config = merge(defaultConfig, newConfig)
}
