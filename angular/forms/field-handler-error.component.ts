import { Component, computed, ElementRef, inject, input, output, ViewEncapsulation } from '@angular/core'
import { FormControl, ValidationErrors } from '@angular/forms'
import type { FieldAsyncErrorProps } from '@/src/app/shared/ui/form-fields/reactive-form.extension'
import { ValidationMessage } from '@/src/app/shared/constants/validation-message.const'

const DEFAULT_ERROR_DECLARE = {
	email: ValidationMessage.InvalidEmail.message,
	required: ValidationMessage.RequiredField.message,
}

const acceptFormat = (val: unknown) => {
	return !!(typeof val === 'string' && val.replaceAll(' ', '').length)
}

const eventTransformer = (v: string) => (!v ? '[View]' : v)

@Component({
	selector: 'field-error',
	encapsulation: ViewEncapsulation.None,
	standalone: true,
	host: {
		class: `text-red-500 inline-block content-center`,
		'[attr.role]': `isConflictIdError ? 'button' : ''`,
		'(click)': `isConflictIdError && clickedError.emit(isConflictIdError.value)`,
	},
	styles: `
		:host {
			@apply text-sm;
		}
	`,
	template: `@if ((this.control().dirty || this.control().touched) && this.error()) {
		{{ error() }}
		@if (isConflictIdError) {
			<span class="ml-1 text-sky-500">{{ clickable() }}</span>
		}
	}`,
})
export class FieldErrorComponent {
	readonly control = input.required<FormControl>()
	readonly errors = input.required<ValidationErrors | null>()
	readonly clickable = input('[View]', {
		transform: eventTransformer,
	})

	readonly clickedError = output<any>()
	private readonly elr = inject<ElementRef<HTMLElement>>(ElementRef)

	isConflictIdError?: FieldAsyncErrorProps
	readonly errorMap = input<Record<string, string>>(DEFAULT_ERROR_DECLARE)

	readonly error = computed(() => {
		if (!this.errors()) {
			return void 0
		}
		const current = Object.keys(this.errors() as Record<string, any>)
		if (current.length > 1) {
			this.elr.nativeElement.classList.add('cursor-pointer')
			this.isConflictIdError = this.errors() as FieldAsyncErrorProps
		} else {
			this.isConflictIdError = void 0
			this.elr.nativeElement.classList.contains('cursor-pointer') &&
				this.elr.nativeElement.classList.remove('cursor-pointer')
		}
		const rawError = this.errors()![current[0]]
		const mappedError = this.errorMap()![current[0]]
		return acceptFormat(rawError) ? rawError : mappedError
	})
}
