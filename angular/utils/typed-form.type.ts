import { FormArray, FormControl, FormGroup } from '@angular/forms';

/*
export type NgTypedForm<TFormData extends object> = FormGroup<{
	[TFormKey in keyof TFormData]: TFormData[TFormKey] extends Date
		? FormControl<Date>
		: TFormData[TFormKey] extends (infer TItem)[]
			? TItem extends Date
				? FormControl<Date[]>
				: TItem extends object
					? FormArray<NgTypedForm<TItem>>
					: FormControl<TItem[]>
			: TFormData[TFormKey] extends object
				? NgTypedForm<TFormData[TFormKey]>
				: FormControl<TFormData[TFormKey]>;
}>;
*/

type TypedFormControl<T> = T extends Date
  ? FormControl<Date>
  : FormControl<T>;

// Helper type để xử lý form group
type TypedFormGroup<T> = FormGroup<{
  [K in keyof T]: TypedControl<T[K]>;
}>;

// Helper type để xử lý form array
type TypedFormArray<T> = FormArray<
  T extends (infer U)[]
    ? U extends object
      ? TypedFormGroup<U>
      : TypedFormControl<U>
    : never
>;

// Main type để xử lý tất cả các trường hợp
type TypedControl<T> = T extends (infer _U)[]
  ? TypedFormArray<T>
  : T extends object
    ? TypedFormGroup<T>
    : TypedFormControl<T>;

// Type chính để sử dụng
export type NgTypedForm<TFormData extends object> = TypedFormGroup<TFormData>;
