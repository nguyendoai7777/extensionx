import { Directive, HostBinding, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

/**
 * @example
 * ```html
 * <input int>
 * ```
 */
@Directive({
  selector: 'input[int]',
  standalone: true,
})
export class IntegerDirective {
  @HostBinding('type') type = 'text';
  #elr = inject(NgControl);
  @HostListener('input', ['$event']) onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let replace = inputElement.value.replace(/[^0-9]/g, '');
    this.#elr.control?.setValue(replace);
  }
}
