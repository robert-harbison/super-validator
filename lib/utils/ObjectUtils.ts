export type GenericObject = { [key: string]: any }
export type GenericObjectOfType<T> = { [key: string]: T }
export type RecursivePartial<T> = {
	[P in keyof T]?: RecursivePartial<T[P]>
}
