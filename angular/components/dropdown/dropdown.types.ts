export interface DropdownOptionWithInternalId {
	__id: string
}

export type DropdownOutputWithInternalId<TDataProps extends object> = DropdownOptionWithInternalId & TDataProps

export interface DropdownInternalValue<T> extends DropdownOptionWithInternalId {
	label?: string
	value: T
}
