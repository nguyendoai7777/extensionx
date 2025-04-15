import {
	booleanAttribute,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	computed,
	ElementRef,
	inject,
	input,
	signal,
	viewChild,
	ViewEncapsulation,
} from '@angular/core'
import { Dropdown } from '@/src/app/shared/components/form-field/dropdown/dropdown.component'
import {
	DropdownOptionWithInternalId,
	DropdownInternalValue,
} from '@/src/app/shared/components/form-field/dropdown/dropdown.types'

@Component({
	selector: 'dropdown-option',
	standalone: true,
	imports: [],
	template: ` <ng-content /> `,
	styleUrl: './dropdown.component.scss',
	host: {
		role: 'option',
		'[id]': 'id()',
		'(click)': 'onPanelItemClick()',
		'[class]': 'rootClass()',
		class: `dropdown-option panel-item-spacing`,
	},
	styles: `
		dropdown-option {
			position: relative;

			&:after {
				content: '';
				display: block;
				position: absolute;
				width: 0;
				height: 0;
				border-top: 10px solid transparent;
				border-right: 10px solid transparent;
				background-color: transparent;
				top: 0;
				left: 0;
				z-index: 3;
				transition: var(--base-transition, 0.15s);
			}

			&.selected {
				&.dropdown-option {
					background-color: var(--control-dropdown-selected-item-bg-color);
				}
			}

			&:not([disabled]) {
				cursor: pointer;
			}

			&.suggestion:after {
				border-top-color: #4b96ef;
			}

			&.dropdown-option {
				transition: var(--base-transition);
				display: inline-flex;
				width: 100%;
				align-items: center;

				&:hover:not(.selected) {
					background-color: var(--control-dropdown-selected-item-bg-color);
				}

				&.md {
					min-height: var(--control-h-md);
					max-height: var(--control-h-md);
				}

				&.lg {
					min-height: var(--control-h-lg);
					max-height: var(--control-h-lg);
				}
			}
		}
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class DropdownOption<V> {
	protected readonly content = inject<ElementRef<HTMLElement>>(ElementRef)
	protected readonly cdr = inject(ChangeDetectorRef)
	readonly id = signal(crypto.randomUUID())
	readonly value = input.required<V>()
	readonly selected = input(false, { transform: booleanAttribute })
	readonly internalValue = computed<DropdownInternalValue<V>>(() => {
		return {
			__id: this.id(),
			value: this.value(),
			label: this.content.nativeElement.innerHTML,
		}
	})

	protected readonly parent = inject(Dropdown)

	readonly rootClass = computed(() => {
		const mode = this.parent.multiple()
			? this.parent.selectedUUID().includes(this.id())
			: this.parent.selectedValue()?.__id === this.id()
		const state = mode ? 'selected' : ''
		return [state, this.parent.fieldSize()].join(' ')
	})

	selectSingle = () => {
		this.parent.selectSingle(this.internalValue(), this.content?.nativeElement.innerHTML)
	}

	selectMultiple = this.parent.selectMultiple

	onPanelItemClick() {
		this.parent.multiple() ? this.selectMultiple(this.internalValue()) : this.selectSingle()
	}
}
