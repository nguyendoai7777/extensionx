import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'indicator-ios',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: { class: `IOS-spinner`, '[style]': `'--ios-spinner-size:' + size()` },
	template: `
		<div class="bar"></div>
		<div class="bar"></div>
		<div class="bar"></div>
		<div class="bar"></div>
		<div class="bar"></div>
		<div class="bar"></div>
		<div class="bar"></div>
		<div class="bar"></div>
	`,
	styles: `
		@keyframes IOSSpin {
			0% {
				opacity: 0.85;
			}
			50% {
				opacity: 0.25;
			}
			100% {
				opacity: 0.25;
			}
		}

		.IOS-spinner {
			position: relative;
			width: var(--ios-spinner-size);
			height: var(--ios-spinner-size);
			display: block;

			.bar {
				--translate-y: calc(var(--ios-spinner-size) * -0.325);
				position: absolute;
				top: calc(var(--ios-spinner-size) * 0.325);
				left: calc(var(--ios-spinner-size) * 0.425);
				width: calc(var(--ios-spinner-size) * 0.125);
				height: calc(var(--ios-spinner-size) * 0.325);
				border-radius: calc(var(--ios-spinner-size) * 0.0625);
				background-color: #8e8e93;
				animation: IOSSpin 1s linear infinite;

				&:nth-child(1) {
					transform: rotate(45deg) translateY(var(--translate-y));
					animation-delay: -1.625s;
				}

				&:nth-child(2) {
					transform: rotate(90deg) translateY(var(--translate-y));
					animation-delay: -1.5s;
				}

				&:nth-child(3) {
					transform: rotate(135deg) translateY(var(--translate-y));
					animation-delay: -1.375s;
				}

				&:nth-child(4) {
					transform: rotate(180deg) translateY(var(--translate-y));
					animation-delay: -1.25s;
				}

				&:nth-child(5) {
					transform: rotate(225deg) translateY(var(--translate-y));
					animation-delay: -1.125s;
				}

				&:nth-child(6) {
					transform: rotate(270deg) translateY(var(--translate-y));
					animation-delay: -1s;
				}

				&:nth-child(7) {
					transform: rotate(315deg) translateY(var(--translate-y));
					animation-delay: -0.875s;
				}

				&:nth-child(8) {
					transform: rotate(360deg) translateY(var(--translate-y));
					animation-delay: -0.75s;
				}
			}
		}
	`,
})
export class IOSIndicator {
	/**
	 * follow width css (px, em, rem...)
	 * */
	readonly size = input('20px');
}
