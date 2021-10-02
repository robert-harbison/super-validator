import { config, setConfig } from './Config'

describe('Config:setConfig()', () => {
	test('Should returned combined config with new options.', () => {
		const newConfig = {
			language: {
				min: 'Too short.1',
				max: 'Too long.1',
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
				max: 'Too long.1',
				doesMatch: 'Must match.1',
				required: 'Required.1',
			},
		}
		setConfig(newConfig)
		expect(config.language.min).toEqual('`{0}` is shorter than `{2}`.')
		expect(config.language.max).toEqual('Too long.1')
	})
})
