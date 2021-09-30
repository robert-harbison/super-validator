import merge from 'merge-deep'

interface Config {
	// TODO: Rename this to messages
	language: {
		min: string
		max: string
		doesMatch: string
		required: string
	}
}

interface ConfigOptions {
	// TODO: Rename this to messages
	language?: {
		min?: string
		max?: string
		doesMatch?: string
		required?: string
	}
}

const defaultConfig: Config = {
	language: {
		min: '`{0}` is shorter than `{2}`.',
		max: '`{0}` is longer than `{2}`.',
		doesMatch: '`{0}` does not match `{1}`.',
		required: '`{0}` is required.',
	},
}

export let config: Config = defaultConfig

/**
 * @param newConfig Sets the new config options. If null is provided the config will be back to the default state.
 */
export const setConfig = (newConfig: ConfigOptions | null): void => {
	config = merge(defaultConfig, newConfig)
}
