import { Component, computed, Directive, ElementRef, inject, input, output, ViewEncapsulation } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import { ReactiveAsyncError, ValidationErrorsMap, FieldAsyncErrorProps } from './reactive-form-field.types';

const DEFAULT_ERROR_DECLARE = {
	email: 'This email is invalid.',
	required: 'This is a required field.',
	dateFromTo: 'Expected Receipt Date must be after Expected Ship Date.',
};

function mergeObjectValues(obj1: Record<string, any>, obj2: Record<string, any>) {
	const result: Record<string, any> = { ...obj2 };

	for (const key in obj1) {
		if (obj2.hasOwnProperty(key)) {
			if (obj2[key] === true) {
				result[key] = obj1[key];
			}
		}
	}

	return { ...obj1, ...result } as Record<string, string>;
}

@Directive({
	standalone: true,
	host: {
		class: `w-fit text-red-500`,
	},
})
class BaseReactiveFieldControlErrors {
	/**
	 * passing controls as `[control]="form.controls[property]"`
	 * */
	readonly control = input.required<FormControl>();
}

@Component({
	selector: 'field-error',
	encapsulation: ViewEncapsulation.None,
	standalone: true,
	host: {
		'[class]': `'block' + error()?.length > 0 ? 'has-error' : ''`,
		'(click)': 'extractAsyncError() && value.emit(extractAsyncError()!.value)',
	},
	template: `@if (control().dirty || control().touched) {
		@if (extractAsyncError()) {
			<div class="field-error-message text-xsm mt-1 flex items-center w-fit text-red-500 cursor-pointer">
				{{ extractAsyncError()!.message }}
				<div class="ml-1 error-exc text-sky-500">[View duplicate]</div>
			</div>
		} @else {
			<span class="text-txt-danger text-xs"> {{ error() }}</span>
		}
	}`,
	imports: [],
})
export class FieldErrorComponent {
	private readonly erl = inject<ElementRef<HTMLElement>>(ElementRef);
	readonly control = input.required<FormControl>();
	/**
	 * passing controls as
	 * ```html
	 * <field-error
	 *   [errors]="form.controls[property].errors"
	 * />
	 * ```
	 * */
	readonly errors = input.required<ValidationErrors | null>();
	readonly asyncErrorKey = input<string>();
	readonly value = output<any>();
	protected readonly extractAsyncError = computed<ReactiveAsyncError<number> | undefined>(() => {
		if (this.asyncErrorKey() && this.errors()?.[this.asyncErrorKey()!]) {
			return {
				message: this.errors()?.[this.asyncErrorKey()!]['message'] as string,
				value: this.errors()?.[this.asyncErrorKey()!]['value'] as number,
			};
		}
		return void 0;
	});
	/**
	 * override errors message,
	 * passing as
	 *
	 * ```html
	 * <field-error
	 *   [control]="form.controls[property]"
	 *   [errors]="form.controls[property].errors"
	 *   [errorMap]="errorMap"
	 * />
	 * ```
	 *
	 *  ```ts
	 *  @Component({...})
	 *  class Example {
	 *    errorMap = {
	 *      required: 'Required field', // override message for required validator
	 *      email: 'Email format incorrect' // override message for email validator
	 *    }
	 *  }
	 *  ```
	 *
	 * */
	readonly errorMap = input<Record<string, string> | null | undefined>(DEFAULT_ERROR_DECLARE);
	readonly mergedErrorsMap = computed(() => {
		const error = this.errorMap() ?? {};
		// return {
		// 	...DEFAULT_ERROR_DECLARE,
		// 	...error,
		// } as Record<string, string>
		return mergeObjectValues(DEFAULT_ERROR_DECLARE, error);
	});

	readonly error = computed(() => {
		if (!this.errors()) {
			return void 0;
		}
		const current = Object.keys(this.errors() as Record<string, any>);
		const error = this.mergedErrorsMap()![current[0]];
		this.erl.nativeElement.setAttribute('has-error', String(error.length > 0));
		return error;
	});
}

@Component({
	selector: 'field-error-clickable',
	encapsulation: ViewEncapsulation.None,
	standalone: true,
	host: {
		class: `flex items-center w-fit text-red-500 cursor-pointer`,
		'(click)': 'errors() && clickedText.emit($any(errors().value))',
	},
	template: `
		@if ((this.control().dirty || this.control().touched || this.control().pristine) && this.errors()?.message) {
			{{ errors()?.message }}
			<div class="ml-1 error-exc text-sky-500">{{ clickableText() }}</div>
		}
	`,
})
export class FieldErrorClickableComponent extends BaseReactiveFieldControlErrors {
	readonly clickableText = input('[View]');
	/**
	 * passing controls as
	 * ```html
	 *  <field-error-clickable
	 *    [control]="form.controls[property]"
	 *    [errors]="form.controls[property].errors"
	 *  />
	 * ```
	 * */
	readonly errors = input.required<ValidationErrorsMap<FieldAsyncErrorProps>>();

	/**
	 * emit conflict id from error
	 * ```html
	 *  <field-error-clickable
	 *    [control]="form.controls[property]"
	 *    [errors]="form.controls[property].errors"
	 *    (clickedText)="handleClickedError($event)"
	 *  />
	 * ```
	 * */
	readonly clickedText = output<string>();
}
