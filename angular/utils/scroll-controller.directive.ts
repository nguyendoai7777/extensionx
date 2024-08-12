import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

/**
 * detect position of scroll view, emit event if scroll is bottom or top and type of scroll (bottom | top)
 *
 */

@Directive({
	selector: '[scrollController]',
})
export class ScrollControllerDirective implements OnInit {
	/**
	 * type: string
	 *
	 * example: 100px, 100vh, calc(...)
	 * */
	@Input() scrollHeight!: string;
	/**
	 * type: EventEmitter<void>
	 *
	 * Emit when scroll to bottom
	 * */
	@Output() toBottom = new EventEmitter<void>();
	/**
	 * type: EventEmitter<void>
	 *
	 * Emit when scroll to bottom
	 * */
	@Output() toTop = new EventEmitter<void>();
	/**
	 * $event = 'top' | 'bottom'  as string
	 *
	 * type: EventEmitter<'top' | 'bottom'>
	 *
	 * Emit when scroll to bottom or top
	 * */
	@Output() scrollType = new EventEmitter<'top' | 'bottom'>();

	constructor(private elr: ElementRef<HTMLElement>) {}

	ngOnInit() {
		this.elr.nativeElement.style.height = this.scrollHeight;
		this.elr.nativeElement.style.overflowY = 'auto';
	}

	@HostListener('scroll', ['$event']) scroll(ev: Event) {
		try {
			const top = (ev.target as HTMLElement)?.scrollTop;
			const height = this.elr.nativeElement.scrollHeight;
			const offset = this.elr.nativeElement.offsetHeight;

			if (top > height - offset - 1) {
				this.scrollType.emit('bottom');
				this.toBottom.emit();
			}
			if (top === 0) {
				this.scrollType.emit('top');
				this.toTop.emit();
			}
		} catch {}
	}
}
