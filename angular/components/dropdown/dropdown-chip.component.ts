import { ChangeDetectionStrategy, Component, computed, inject, output, ViewEncapsulation } from '@angular/core'
import { Dropdown } from '@/src/app/shared/components/form-field/dropdown/dropdown.component'
import { IconSvgDirective } from '@directives/icon-svg.directive'
import { DropdownOptionWithInternalId } from '@/src/app/shared/components/form-field/dropdown/dropdown.types'

@Component({
	selector: 'dropdown-chip-remove',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		'[class]': `rootClass()`,
	},
	styles: `
		dropdown dropdown-chip-remove {
			display: flex;
			border-radius: 4px;
			/*background-color: #1a6dd8;*/
			padding: 2px 5px;
			gap: 4px;
			white-space: nowrap;
			flex-wrap: nowrap;
			color: var(--text-base-color);

			&.lg .ChipClose {
				width: 16px;
				height: 16px;
			}

			&.md {
				@apply text-xs;
				.ChipClose {
					width: 12px;
					height: 12px;
				}
			}

			transition: var(--base-transition);

			&.disabled {
				border: 1px solid var(--control-dropdown-chip-border-color);
			}

			&:not(.disabled) {
				cursor: pointer;
				background-color: var(--control-dropdown-chip-bg-color);

				&:hover {
					box-shadow: 0 0 6px 1px var(--control-dropdown-chip-shadow-color);
					transform: translateY(-1px);
				}
			}
		}
	`,
	template: `
		<ng-content />
		@if (!parent._disabled()) {
			<button tabindex="-1" class="PreventCloseOption" svg-icon="close" svgClass="ChipClose"></button>
		}
	`,
	imports: [IconSvgDirective],
})
export class DropdownChip {
	protected readonly parent = inject(Dropdown)
	readonly rootClass = computed(
		() => `PreventCloseOption ${this.parent.fieldSize()} ${this.parent.disabled() ? 'disabled' : ''}`
	)
	readonly removed = output<void>()

	remove<T extends DropdownOptionWithInternalId>(value: T) {
		if (!this.parent._disabled()) {
			this.parent.removeItem(value)
			this.parent.markMultipleChange()
			this.removed.emit()
		}
	}
}
