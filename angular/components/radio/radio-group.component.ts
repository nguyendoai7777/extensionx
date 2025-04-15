import { booleanAttribute, ChangeDetectionStrategy, Component, forwardRef, input, signal, ViewEncapsulation, } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'radio-group',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  template: `
    <ng-content />
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true,
    },
  ],
  styles: [`
    radio-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class RadioGroupComponent<T = any> implements ControlValueAccessor {
  private readonly _uuid = crypto.randomUUID();
  readonly name = input(`radio-control-${this._uuid}`);
  readonly disabled = input(false, { transform: booleanAttribute });

  readonly _disabled = signal(false);
  readonly value = signal<T | null>(null);

  constructor() {
    this._disabled.set(this.disabled());
  }

  private onChange = (_: T) => {};
  private onTouched = () => {};

  select(val: T) {
    if (this._disabled()) return;
    this.value.set(val);
    this.onChange(val);
    this.onTouched();
  }

  writeValue(val: T) {
    this.value.set(val);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean) {
    this._disabled.set(isDisabled);
  }

}
