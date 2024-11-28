import { inject, Injectable } from '@angular/core'
import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms'

interface ScrollToElementOptions {
	replaceErrorSelector: string
	document: Document
}

export interface FieldAsyncErrorProps<TValue = any> {
	message: string
	value: TValue
	emitEvent?: boolean
}

export type ValidationErrorsMap<T extends Record<string, any>> =
	| (ValidationErrors & {
			[K in keyof T]?: FieldAsyncErrorProps
	  })
	| null

@Injectable({ providedIn: 'root' })
export class ReactiveFormExtension {
	private scrollTimeout?: number

	static setAsyncError<
		TFormData extends {
			controls: {
				[K in keyof TFormData['controls']]: AbstractControl
			}
		},
	>(
		form: TFormData,
		errors?: ValidationErrorsMap<{ [K in keyof TFormData['controls']]: TFormData['controls'][K]['value'] }>
	) {
		const keys = Object.keys(errors ?? {}) as (keyof TFormData['controls'])[]

		keys.forEach((key) => {
			const errorDetail = errors![key]
			if (!errorDetail) return

			const { emitEvent = true, ...error } = errorDetail
			const control = form.controls[key]

			if (!control) {
				console.error(
					`[ReactiveForm.setError] Key "%c${key as string}%c" is invalid.`,
					'font-weight: bold;',
					'font-weight: normal;'
				)
				return
			}

			try {
				control.setErrors(error, { emitEvent })
			} catch (e) {
				console.error(
					`[ReactiveForm.setError] Error setting error for key: "%c${key as string}%c"`,
					'font-weight: bold;',
					'font-weight: normal;',
					e
				)
				throw e
			}
		})
	}

	static handleAsyncConflictId(errors: Record<string, string[]>) {
		const findConflictIdKey = Object.keys(errors)
			.find((item) => item.includes('conflictingRecordId'))
			?.split('.')[0]
		return findConflictIdKey
			? {
					[findConflictIdKey]: {
						message: errors[findConflictIdKey][0],
						value: errors[`${findConflictIdKey}.conflictingRecordId`][0],
					},
				}
			: void 0
	}

	static invalidField = <
		TFormData extends {
			controls: {
				[K in keyof TFormData['controls']]: AbstractControl
			}
		},
	>(
		form: TFormData
	) => {
		return (key: keyof TFormData['controls'], _form?: TFormData) => {
			const f = _form ?? form
			return f.controls[key].invalid && (f.controls[key].dirty || f.controls[key].touched)
		}
	}

	static invalidFieldInArray = <
		TFormData extends {
			controls: {
				[K in keyof TFormData['controls']]: AbstractControl
			}
		},
		TArrayKey extends keyof TFormData['controls'] &
			{
				[K in keyof TFormData['controls']]: TFormData['controls'][K] extends FormArray ? K : never
			}[keyof TFormData['controls']],
		TItem extends TFormData['controls'][TArrayKey] extends FormArray<infer U> ? U : FormGroup,
		/* @ts-ignore */
		TKey extends keyof TItem['controls'],
	>(
		form: TFormData,
		arrayField: TArrayKey
	) => {
		return (index: number, key: TKey, _form?: TFormData) => {
			const f = _form ?? form
			const arrayControl = f.controls[arrayField] as FormArray
			const itemControl = arrayControl.at(index) as FormGroup
			if (!itemControl) {
				console.error(
					`Cannot find control "%c${key as string}%c" with index =`,
					'font-weight: bold;',
					'font-weight: normal;',
					index
				)
				return
			}
			return (
				itemControl.controls[key as string].invalid &&
				(itemControl.controls[key as string].dirty || itemControl.controls[key as string].touched)
			)
		}
	}

	scrollToFirstErrorElement(options?: ScrollToElementOptions) {
		const defaultOptions: ScrollToElementOptions = {
			document: document,
			replaceErrorSelector: '.ng-invalid:not(form)',
		}
		options = {
			...defaultOptions,
			...options,
		}
		const element = options.document.querySelector(options.replaceErrorSelector)
		if (this.scrollTimeout) {
			clearTimeout(this.scrollTimeout)
		}
		this.scrollTimeout = element
			? window.setTimeout(() => {
					element.scrollIntoView({
						behavior: 'smooth',
						block: 'start',
					})
				})
			: void 0
	}

	ngOnDestroy() {
		if (this.scrollTimeout) {
			clearTimeout(this.scrollTimeout)
		}
	}
}

export const injectReactiveFormExtension = () => inject(ReactiveFormExtension)
