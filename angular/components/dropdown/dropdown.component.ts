import {
	booleanAttribute,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	computed,
	ContentChild,
	ContentChildren,
	effect,
	ElementRef,
	forwardRef,
	inject,
	input,
	output,
	QueryList,
	signal,
	ViewChild,
	ViewEncapsulation,
} from '@angular/core'
import { CdkConnectedOverlay, CdkOverlayOrigin, Overlay } from '@angular/cdk/overlay'
import { FormFieldAppearance, FormFieldSize } from '@/src/app/shared/components/form-field/form-field.types'
import { NgClass, NgStyle } from '@angular/common'
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms'
import {
	DropdownInternalValue,
	DropdownOptionWithInternalId,
	DropdownOutputWithInternalId,
} from '@/src/app/shared/components/form-field/dropdown/dropdown.types'
import { useSignal } from '@/src/app/shared/helpers/use-signal.helper'
import { ImplCdkElementFocusMonitorDirective } from '@directives/focus-monitor.directive'
import { DropdownOption } from '@/src/app/shared/components/form-field/dropdown/dropdown-option.component'

@Component({
	selector: 'dropdown',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [CdkOverlayOrigin, NgClass, CdkConnectedOverlay, NgStyle, ReactiveFormsModule],
	templateUrl: './dropdown.component.html',
	styleUrl: './dropdown.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => Dropdown),
			multi: true,
		},
	],
	host: {
		'[class]': 'rootAppearance()',
		role: 'select',
		class: `form-field-root`,
		/*'[id]': 'uuid()',*/
	},
})
export class Dropdown<
		V,
		TOutput extends DropdownOutputWithInternalId<object>,
		TOptionProps extends DropdownInternalValue<V>,
	>
	extends ImplCdkElementFocusMonitorDirective
	implements ControlValueAccessor
{
	@ViewChild('panelListTemplate') panelList: ElementRef<HTMLElement>
	@ViewChild('search') readonly searcher: ElementRef<HTMLInputElement>
	@ContentChildren(DropdownOption) panelQList: QueryList<DropdownOption<V>>
	@ContentChild(DropdownOption) panelItem: DropdownOption<V>

	readonly size = input<FormFieldSize>('md')
	readonly multiple = input(false, { transform: booleanAttribute })
	readonly appearance = input<FormFieldAppearance>('flat')
	readonly disabled = input(false, { transform: booleanAttribute })
	readonly useSuffixIcon = input(false, { transform: booleanAttribute })
	readonly placeholder = input('Select...')

	readonly searchChanges = output<string>()
	readonly selectChanges = output<TOutput>()
	readonly opened = output<void>()
	readonly closed = output<void>()

	private readonly overlay = inject(Overlay)
	private readonly cdr = inject(ChangeDetectorRef)

	protected scrollStrategy = this.overlay.scrollStrategies.reposition()

	// protected readonly uuid = signal(`dropdown_${crypto.randomUUID()}`)
	readonly fieldSize = signal<FormFieldSize>('md')
	readonly _disabled = signal(false)
	readonly selectedValues = signal<Array<DropdownInternalValue<V>>>([])
	readonly selectedUUID = signal<string[]>([])
	readonly selectedValue = useSignal<TOptionProps>()
	readonly rootAppearance = computed(() =>
		[
			this.appearance(),
			this.fieldSize(),
			this.useSuffixIcon() ? 'UseSuffixIcon' : '',
			this.isOpen() ? 'opened' : '',
		].join(' ')
	)
	private _suggestionIndexes = 0
	protected _elements: Element[] = []
	private _selectedValues: DropdownInternalValue<V>[] = []

	constructor() {
		super()
		effect(() => {
			if (this.isOpen()) {
				this.setSuggestionOption()
				this.scrollToSelectedElement()
			}
		})
	}

	onChange = (_: unknown) => {}
	onTouched = () => {}

	clearSearch() {
		this.searcher && (this.searcher.nativeElement.value = '')
	}

	focusSearch() {
		this.searcher && this.searcher.nativeElement.focus()
	}

	markMultipleChange = () => {
		this.onChange(this.selectedValues().map((c) => ({ ...c.value, __id: c.__id })))
	}

	findExistedItem = <T extends DropdownOptionWithInternalId>(item: T) => {
		const f = this.selectedValues().find((c) => c.__id === item.__id),
			i = this.selectedValues().findIndex((c) => c.__id === item.__id)
		return { item: f, index: i }
	}

	selectSingle = (item: DropdownInternalValue<V>, label: string) => {
		this.onChange(item.value)
		this.selectedValue.set({ ...item, label } as TOptionProps)
		this.closePanel()
		this.clearSearch()
	}

	selectMultiple = (item: DropdownInternalValue<V>) => {
		const { index } = this.findExistedItem(item)
		if (index === -1) {
			this.selectedValues.update((c) => [...this._selectedValues, item])
			this.selectedUUID.update((c) => [...c, item.__id])
		} else {
			this.removeItem(item)
		}
		this._selectedValues = this.selectedValues()
		this.focusSearch()
		this.clearSearch()
		this.markMultipleChange()
	}

	removeItem = <T extends DropdownOptionWithInternalId>(item: T) => {
		this._selectedValues = this._selectedValues.filter((x) => x.__id !== item.__id)
		this.selectedUUID.update((c) => [...c.filter((x) => x !== item.__id)])
		this.selectedValues.update(() => [...this._selectedValues])
	}

	setDefaultSelected() {
		const data = this.panelQList.toArray()
		if (this.multiple()) {
			data.forEach((item) => {
				if (item.selected()) {
					this.selectedValues.update((c) => [...c, item.internalValue()])
					this.selectedUUID.update((c) => [...c, item.internalValue().__id])
				}
			})
			this.markMultipleChange()
			this._selectedValues = this.selectedValues()
		} else {
			const selected = data.find((c) => c.selected())
			selected?.selectSingle()
		}
	}

	writeValue(value: any) {
		if (this.multiple()) {
			this.selectedValues.set(value ?? [])
		} else {
			this.selectedValue.set(value)
		}
	}

	registerOnChange(fn: any) {
		this.onChange = fn
	}

	registerOnTouched(fn: any) {
		this.onTouched = fn
	}

	setDisabledState(isDisabled: boolean) {
		this._disabled.set(isDisabled)
	}

	scrollToSelectedElement() {
		this.cdr.detectChanges()
		const pl = this.panelList?.nativeElement
		if (pl) {
			const target = pl.querySelector('dropdown-option.selected')
			target?.scrollIntoView({
				block: 'center',
				behavior: 'smooth',
			})
		}
	}

	listenKeydown = (e: KeyboardEvent) => {
		const token = `suggestion`
		let idx = this._suggestionIndexes,
			items = this._elements
		let max = items.length - 1
		const play = (next: number) => {
			items.at(idx)?.classList.remove(token)
			items.at(next)?.classList.add(token)
			items.at(next)?.scrollIntoView({
				block: 'nearest',
				behavior: 'smooth',
			})
		}
		const write = () => {
			if ((e.target as HTMLElement).matches('.TrapEnter')) {
				e.preventDefault()
				this.cdr.markForCheck()
				this.panelQList.get(this._suggestionIndexes)?.onPanelItemClick()
			}
		}
		const action: Record<string, () => void> = {
			ArrowUp: () => {
				let prev = idx - 1
				if (prev <= 0) {
					prev = 0
				}
				this._suggestionIndexes = prev
				play(prev)
			},
			ArrowDown: () => {
				let next = idx + 1
				if (idx >= max) {
					next = max
				}
				this._suggestionIndexes = next
				play(next)
			},
			Enter: write,
			Space: write,
		}
		action[e.code]?.()
	}

	setSuggestionOption = () => {
		const token = `suggestion`
		this.cdr.detectChanges()
		const panel = this.panelList.nativeElement
		const items = Array.from(panel.children ?? [])
		this._elements = items
		if (panel.children.length) {
			items.forEach((c) => c.classList.contains(token) && c.classList.remove(token))
			panel.children.item(0)?.classList.add('suggestion')
			window.addEventListener('keydown', this.listenKeydown)
		}
	}

	private destroyKeydownEvent = () => {
		this._suggestionIndexes = 0
		this._elements = []
		window.removeEventListener('keydown', this.listenKeydown)
	}

	openPanel(e: MouseEvent) {
		if (this._disabled()) {
			return
		}
		const target = e.target as HTMLElement
		this.focusSearch()

		if (!target.matches('.PreventCloseOption')) {
			this.isOpen.set(true)
			this.opened.emit()
		}
	}

	closePanel() {
		this.isOpen.set(false)
		this.destroyKeydownEvent()
		this.closed.emit()
	}

	overlayOutsideClick(e: MouseEvent) {
		const target = e.target as HTMLElement
		// const	targetExactly = this.elr.nativeElement.id === this.uuid()

		if (
			!(
				(target.matches('.PreventCloseOption') || target.matches('button.dropdown-controller')) /*||
				target.matches('.ChipPlaceholder') ||
				target.matches('.TrapEnter')*/
			)
		) {
			this.isOpen.set(false)
			this.closed.emit()
			this.clearSearch()
			this.onTouched()
			this.destroyKeydownEvent()
		}
	}

	onSearchChange(e: Event) {
		let target = e.target as HTMLInputElement
		let value = target.value
		this.searchChanges.emit(value)
	}

	override ngOnInit() {
		super.ngOnInit()
		this._disabled.set(this.disabled())
		this.fieldSize.set(this.size())
	}

	override ngAfterViewInit() {
		super.ngAfterViewInit()
		this.setDefaultSelected()
	}

	override ngOnDestroy() {
		super.ngOnDestroy()
		this.destroyKeydownEvent()
	}
}
