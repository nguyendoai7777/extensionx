import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	computed,
	effect,
	ElementRef,
	forwardRef,
	inject,
	input,
	model,
	signal,
	ViewEncapsulation,
} from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
	selector: 'checkbox',
	standalone: true,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => CheckboxComponent),
			multi: true,
		},
	],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'custom-form-control',
		'(click)': 'handleClickCheckBox()',
	},
	styles: `
		checkbox {
			display: flex;
			gap: 4px;
			align-items: center;
			width: fit-content;

			.checkbox {
				width: var(--control-icon-size);
				height: var(--control-icon-size);
				border-radius: 4px;

				svg {
					width: 100%;
					height: 100%;
					transition: var(--icon-color-transition);
				}
			}
		}
	`,
	template: `
		<button [disabled]="_disabled()" [class.viewonly]="viewonly()" class="checkbox">
			<svg>
				<use [attr.href]="iconUrl()" />
			</svg>
		</button>
		<ng-content />
	`,
})
export class CheckboxComponent implements ControlValueAccessor {
	readonly label = input<string>()
	readonly checked = model(false)
	readonly disabled = input(false, { transform: booleanAttribute })
	readonly viewonly = input(false, { transform: booleanAttribute })

	private readonly elr = inject<ElementRef<HTMLElement>>(ElementRef)

	readonly _disabled = signal(false)
	readonly value = signal(false)

	protected iconUrl = computed(() => {
		this.elr.nativeElement.setAttribute('aria-checked', String(this.checked() || false))
		return `assets/svg/icons-button.svg#${this.checked() ? 'CheckboxChecked' : 'CheckBoxUnChecked'}`
	})

	private onChange = (_: boolean) => {}
	private onTouched = () => {}

	constructor() {
		effect(() => {
			if (this._disabled()) {
				this.elr.nativeElement.setAttribute('disabled', '')
			} else {
				this.elr.nativeElement.removeAttribute('disabled')
			}
		})
	}

	ngOnInit() {
		this._disabled.set(this.disabled())
	}

	writeValue(val: boolean) {
		this.checked.set(val)
		this.value.set(val)
	}

	registerOnChange(fn: any) {
		this.onChange = fn
	}

	registerOnTouched(fn: any) {
		this.onTouched = fn
	}

	setDisabledState?(isDisabled: boolean) {
		this._disabled.set(isDisabled)
	}

	handleClickCheckBox() {
		if (this._disabled() || this.viewonly()) {
			return
		}
		this.checked.set(!this.checked())
		this.onTouched()
		this.onChange(this.checked())
		this.value.set(this.checked())
	}
}
