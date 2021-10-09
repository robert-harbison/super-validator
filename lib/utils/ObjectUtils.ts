export type GenericObject = { [key: string]: any }
export type GenericObjectOfType<T> = { [key: string]: T }
export type RecursivePartial<T> = {
	[P in keyof T]?: RecursivePartial<T[P]>
}

export const addNestedValueToObj = (originalObject: GenericObject, nestedPathArray: string[], value: any): any => {
	const lastPath = value ? nestedPathArray.pop() : false

	for (let i = 0; i < nestedPathArray.length; i++) {
		originalObject = originalObject[nestedPathArray[i]] = originalObject[nestedPathArray[i]] || {}
	}

	if (lastPath) originalObject = originalObject[lastPath] = value
}
