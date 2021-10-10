// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GenericObject = { [key: string]: any }
export type GenericObjectOfType<T> = { [key: string]: T }
export type RecursivePartial<T> = {
	[P in keyof T]?: RecursivePartial<T[P]>
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const addNestedValueToObj = (originalObject: GenericObject, nestedPathArray: string[], value: any): void => {
	const lastPath = value ? nestedPathArray.pop() : false

	for (let i = 0; i < nestedPathArray.length; i++) {
		originalObject = originalObject[nestedPathArray[i]] = originalObject[nestedPathArray[i]] || {}
	}

	if (lastPath) originalObject = originalObject[lastPath] = value
}
