import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	forwardRef,
	inject,
	input,
	model,
	signal,
	viewChild,
	ViewEncapsulation,
} from '@angular/core'
import { NgClass } from '@angular/common'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { createInjectionToken } from '@/src/app/shared/services/di'
import { FormFieldSize } from '@/src/app/shared/components/form-field/form-field.types'

export const [injectToggleSize, provideToggleSize] = createInjectionToken<FormFieldSize>(`provide size for toggle`)

@Component({
	selector: 'switch, toggle',
	standalone: true,
	imports: [NgClass],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SwitchComponent),
			multi: true,
		},
	],
	styleUrl: 'switch.component.css',
	host: {
		'[class]': `size()`,
	},
	template: `
		<button
			#button
			(click)="handleClick()"
			[disabled]="_disabled()"
			[class.viewonly]="viewonly()"
			[ngClass]="{
				unchecked: !value(),
				checked: value()
			}"
			type="button"
			[attr.aria-checked]="value()"
			role="switch"
		>
			<div class="switch-point {{ size() }}"></div>
		</button>
	`,
})
export class SwitchComponent implements ControlValueAccessor {
	private readonly injectSize = injectToggleSize({
		optional: true,
	})
	readonly buttonRef = viewChild<ElementRef<HTMLButtonElement>>('button')
	readonly size = input<FormFieldSize>(this.injectSize ?? 'md', { alias: 'size' })
	readonly viewonly = input(false, { transform: booleanAttribute })
	readonly value = model<boolean>(false)
	readonly disabled = input(false, { transform: booleanAttribute })
	protected readonly elr = inject<ElementRef<HTMLElement>>(ElementRef)
	readonly _disabled = signal(false)
	private onChange = (_: boolean) => {}
	private onTouched = () => {}

	ngOnInit() {
		this.setDisabledState(this.disabled())
	}

	setDisabledState(isDisabled: boolean) {
		isDisabled
			? this.buttonRef()?.nativeElement.setAttribute('disabled', '')
			: this.buttonRef()?.nativeElement.removeAttribute('disabled')
		this._disabled.set(isDisabled)
	}

	writeValue(value: boolean) {
		this.value.set(value)
	}

	registerOnChange(fn: any): void {
		this.onChange = fn
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn
	}

	handleClick() {
		if (this._disabled() || this.viewonly()) return
		this.value.set(!this.value())
		this.onChange(this.value())
		this.onTouched()
	}
}
