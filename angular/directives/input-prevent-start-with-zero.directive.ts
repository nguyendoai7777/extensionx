import { Directive, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

/**
 * using with Angular built-in form [ReactiveFormsModule, FormsModule]
 *
 * ```html
 * <input [formControl]="example" preventStartWithZero>
 * ```
 */
@Directive({
  selector: '[preventStartWithZero]',
  standalone: true,
})
export class PreventStartWithZeroDirective {
  #ngControl = inject(NgControl);

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    if (value.startsWith('0')) {
      this.#ngControl.control?.setValue(value.substring(1));
    }
  }
}
