// Required @angular/cdk

import {
	ChangeDetectionStrategy,
	Component,
	Directive,
	ElementRef,
	inject,
	InjectionToken,
	Injector,
	Input,
	OnDestroy,
	ViewContainerRef,
	ViewEncapsulation,
} from '@angular/core'
import { Overlay, OverlayRef } from '@angular/cdk/overlay'
import { ComponentPortal } from '@angular/cdk/portal'
import { createInjectionToken } from './di'

interface TooltipPublicApi {
	tooltip: any

	keepTooltipVisible(): void

	hide(): void
}

const TOOL_DIRECTIVE_DATA = new InjectionToken<TooltipPublicApi>('TOOLTIP_DATA')
const [injectShowTooltip, provideShowTooltip] = createInjectionToken<boolean>(`Config show or not show tooltip`)

@Component({
	standalone: true,
	template: ` <div class="tooltip-text">{{ directive.tooltip }}</div>`,
	selector: `tooltip-text`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	styles: `
		tooltip-text {
			display: block;
			padding-bottom: 10px;
		}

		.tooltip-text {
			--bgc: #424242;
			padding: 0.7rem;
			font-size: 0.85rem;
			color: #fff;
			background: var(--bgc);
			border-radius: 0.25rem;
			box-sizing: border-box;
			position: relative;
			max-width: 400px;

			&:after {
				content: '';
				display: block;
				position: absolute;
				width: 0;
				height: 0;
				border-left: 5px solid transparent;
				border-right: 5px solid transparent;
				left: 50%;
				transform: translateX(-50%);
			}
		}

		.tooltip-position-top .tooltip-text:after {
			border-top: 5px solid var(--bgc);
			top: 100%;
		}

		.tooltip-position-bottom .tooltip-text:after {
			border-bottom: 5px solid var(--bgc);
		}

		.cdk-overlay-container .tooltip-overlay {
			z-index: 1001 !important;
		}
	`,
	host: {
		'(mouseenter)': 'keepAlive()',
		'(mouseleave)': 'hide()',
	},
})
class TooltipText {
	readonly directive = inject(TOOL_DIRECTIVE_DATA)

	keepAlive() {
		this.directive.keepTooltipVisible()
	}

	hide() {
		this.directive.hide()
	}
}

@Directive({
	selector: '[tooltip]',
	standalone: true,
	host: {
		'(mouseenter)': 'show()',
		'(mouseleave)': 'scheduleHide()',
	},
})
export class TooltipDirective implements OnDestroy, TooltipPublicApi {
	@Input({
		alias: 'tooltip',
		required: true,
		transform: (val: any) => (!val ? '' : String(val)),
	})
	tooltip: string

	@Input() showWhen = true

	private readonly overlay = inject(Overlay)
	private readonly vcr = inject(ViewContainerRef)
	private readonly elr = inject<ElementRef<HTMLElement>>(ElementRef)

	private hideTimeout?: number
	private overlayRef: OverlayRef | null = null

	protected show() {
		if (!(this.tooltip as string).length || !this.showWhen) {
			return
		}
		this.attachTooltip()
	}

	hide() {
		if (this.overlayRef?.hasAttached()) {
			this.overlayRef?.detach()
		}
	}

	protected scheduleHide() {
		this.hide()
		// this.hideTimeout = window.setTimeout(() => this.hide(), 100)
	}

	keepTooltipVisible() {
		clearTimeout(this.hideTimeout)
	}

	private getPositionStrategy() {
		return this.overlay
			.position()
			.flexibleConnectedTo(this.elr)
			.withPositions([
				{
					originX: 'center',
					originY: 'top',
					overlayX: 'center',
					overlayY: 'bottom',
					panelClass: 'tooltip-position-top',
				},
				{
					originX: 'center',
					originY: 'bottom',
					overlayX: 'center',
					overlayY: 'top',
					panelClass: 'tooltip-position-bottom',
				},
			])
	}

	private attachTooltip() {
		if (this.overlayRef === null || !this.overlayRef.hasAttached()) {
			const positionStrategy = this.getPositionStrategy()
			this.overlayRef = this.overlay.create({ positionStrategy, panelClass: 'tooltip-directive-container' })
		}

		const injector = Injector.create({
			providers: [
				{
					provide: TOOL_DIRECTIVE_DATA,
					useValue: this,
				},
			],
		})

		const component = new ComponentPortal(TooltipText, this.vcr, injector)
		this.overlayRef?.attach(component)
	}

	ngOnDestroy() {
		this.overlayRef?.dispose()
	}
}
