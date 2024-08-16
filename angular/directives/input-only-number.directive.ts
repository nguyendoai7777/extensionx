import {
  Directive,
  HostBinding,
  HostListener,
  inject,
  Input,
} from '@angular/core';
import { NgControl } from '@angular/forms';

/**
 * using with Angular built-in form [ReactiveFormsModule, FormsModule]
 *
 * ```html
 * <input [formControl]="example" onlyNumber>
 * ```
 */
@Directive({
  selector: 'input[onlyNumber]',
  standalone: true,
})
export class OnlyNumberDirective {
  @HostBinding('type') type = 'text';
  @Input() decimalPoint = 2;
  #ngControl = inject(NgControl);
  #oldValue = '';
  #regExpr =
    this.decimalPoint > 0
      ? new RegExp(`^([1-9]\\d*|0)?(\\.\\d\{0,${this.decimalPoint}\})?$`)
      : new RegExp(`^([1-9]\\d*|0)?$`);

  @HostListener('input', ['$event']) onInput(event: Event): void {
    let item = event.target as HTMLInputElement;
    let value = item.value;
    let pos = item.selectionStart || 0;
    let noMatch = value && !this.#regExpr.test(value);
    if (noMatch) {
      item.selectionStart = item.selectionEnd = pos - 1;
      if (item.value.length < this.#oldValue.length && pos == 0) {
        pos = 2;
      }
      this.#ngControl.control?.setValue(this.#oldValue, { emit: false });
      item.value = this.#oldValue;
      item.selectionStart = item.selectionEnd = pos - 1;
    } else {
      this.#oldValue = value;
    }
  }
}
