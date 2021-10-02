import { config, setConfig } from './Config'

describe('Config:setConfig()', () => {
	test('Should returned combined config with new options.', () => {
		const newConfig = {
			language: {
				minString: 'Too short.1',
				maxString: 'Too long.1',
				minNumber: 'Too short.2',
				maxNumber: 'Too long.2',
				doesMatch: 'Must match.1',
				required: 'Required.1',
			},
		}
		setConfig(newConfig)
		expect(config).toEqual(newConfig)
	})

	test('Should returned combined config with new options while keeping the old ones.', () => {
		const newConfig = {
			language: {
				maxString: 'Too long.1',
				doesMatch: 'Must match.1',
				required: 'Required.1',
			},
		}
		setConfig(newConfig)
		expect(config.language.minString).toEqual('`{0}` is shorter than `{2}`.')
		expect(config.language.maxString).toEqual('Too long.1')
	})
})
