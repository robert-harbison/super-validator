import { addNestedValueToObj } from './ObjectUtils'

describe('ObjectUtils:addNestedValueToObj()', () => {
	test('Should add value to object at the path location.', () => {
		const obj = {}
		addNestedValueToObj(obj, ['test', 'test2', 'test3'], 4)
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		expect(obj.test.test2.test3).toEqual(4)
	})

	test('Should add value to object at the path location without overriding current values.', () => {
		const obj = {
			test: {
				abc: 5,
			},
		}
		addNestedValueToObj(obj, ['test', 'test2', 'test3'], 4)
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		expect(obj.test.test2.test3).toEqual(4)
	})
})
