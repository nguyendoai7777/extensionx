import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation,
  DestroyRef,
  Component,
  computed,
  contentChild,
  inject,
  input,
  signal,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
 
const DEFAULT_ERROR_DECLARE = {
  email: 'This email is invalid.',
  required: 'Trường bắt buộc nhập',
};
function mergeObjectValues(
  obj1: Record<string, any>,
  obj2: Record<string, any>
) {
  const result: Record<string, any> = { ...obj2 };
 
  for (const key in obj1) {
    if (obj2.hasOwnProperty(key)) {
      if (obj2[key] === true) {
        result[key] = obj1[key];
      }
    }
  }
 
  return { ...obj1, ...result } as Record<string, string>;
}
@Component({
  standalone: true,
  selector: 'field-control',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-content></ng-content>
    @if (controlX(); as ctrl) {
      @if ((ctrl.touched || ctrl.dirty) && error()) {
        <div class="text-red-600 text-sm mt-2">{{ error() }}</div>
      }
    }
  `,
  imports: [],
  host: {
    class: 'block',
  },
})
export class FieldControlComponent {
  readonly errorMap = input<Record<string, string>>({});
  protected controlX = contentChild(NgControl);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly dr = inject(DestroyRef);
  readonly stateTrigger = signal(0);
 
  readonly mergedErrorsMap = computed(() => {
    const error = this.errorMap() ?? {};
    return mergeObjectValues(DEFAULT_ERROR_DECLARE, error);
  });
 
  readonly error = computed(() => {
    this.stateTrigger();
    const ctrl = this.controlX();
    if (!ctrl) return undefined;
    const rawErrors = ctrl.control?.errors;
 
    if (!rawErrors) {
      return undefined;
    }
    const currentKeys = Object.keys(rawErrors);
    return this.mergedErrorsMap()[currentKeys[0]];
  });
 
  ngAfterContentInit() {
    const ngControl = this.controlX();
    const control = ngControl?.control;
 
    if (!control) return;
 
    merge(control.valueChanges, control.statusChanges)
      .pipe(takeUntilDestroyed(this.dr))
      .subscribe(() => {
        this.stateTrigger.update((v) => v + 1);
        this.cdr.markForCheck();
      });
 
    const originalMarkAsTouched = control.markAsTouched;
    control.markAsTouched = (...args) => {
      originalMarkAsTouched.apply(control, args);
      this.stateTrigger.update((v) => v + 1);
      this.cdr.markForCheck();
    };

    this.dr.onDestroyed(() => {
      control.markAsTouched = originalMarkAsTouched;
    })
  }
}

