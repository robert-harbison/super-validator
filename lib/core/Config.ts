interface Config {
	language?: {
		min?: string
		max?: string
		doesMatch?: string
		required?: string
	}
}

export let config: Config | null = null

/**
 * @param newConfig Sets the new config options. If null is provided the config will be back to the default state.
 */
export const setConfig = (newConfig: Config | null): void => {
	config = newConfig
}
