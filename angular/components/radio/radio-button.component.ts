import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	input,
	signal,
	ViewEncapsulation,
} from '@angular/core'
import { RadioGroupComponent } from './radio-group.component'

@Component({
	selector: 'radio-button',
	standalone: true,
	template: `
		<button
			[tabIndex]="viewonly() && -1"
			(click)="onChange($event, r)"
			[class.viewonly]="viewonly()"
			[class.disabled]="_disabled()"
		>
			<input #r hidden type="radio" [checked]="checked()" [disabled]="_disabled()" [name]="group?.name() ?? name()" />
			<svg class="radio-check-icon box" viewBox="0 0 18 18">
				<path
					fill-rule="evenodd"
					d="M1 9C1 13.4183 4.58172 17 9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9ZM9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0Z"
					type="stroke"
				/>
				<path
					type="check"
					d="M3 9C3 5.68629 5.68629 3 9 3V3C12.3137 3 15 5.68629 15 9V9C15 12.3137 12.3137 15 9 15V15C5.68629 15 3 12.3137 3 9V9Z"
					fill="currentColor"
				/>
			</svg>
			<ng-content />
		</button>
	`,
	host: {
		class: 'custom-form-control',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	styleUrl: `./radio-button.css`,
})
export class RadioButtonComponent<T> {
	protected group = inject(RadioGroupComponent, { optional: true })

	readonly value = input.required<T>()
	readonly disabled = input(false, { transform: booleanAttribute })
	readonly viewonly = input(false, { transform: booleanAttribute })
	readonly name = input('')

	readonly checked = signal(false)

	protected readonly _disabled = computed(() => this.group?.disabled() || this.disabled())
	protected readonly _preventEvent = computed(() => this.viewonly() || this._disabled())

	ngOnChanges() {
		if (this.group) {
			this.checked.set(this.group.value() === this.value())
		}
	}

	onChange(ev: Event, inp: HTMLInputElement) {
		if (this._preventEvent()) {
			ev.stopPropagation()
			ev.preventDefault()
			return
		}
		inp.checked = !inp.checked
		console.log(`lick ??`, inp.checked)
		if (this._disabled()) {
			this.group?.select(this.value())
		}
	}
}
