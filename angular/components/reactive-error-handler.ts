import { Component, computed, input, ViewEncapsulation } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

const DEFAULT_ERROR_DECLARE = {
  email: 'Chưa đúng định dạng email',
  required: 'Bắt buộc',
};

function mergeObjectValues(obj1: Record<string, any>, obj2: Record<string, any>) {
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
  selector: 'field-error',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  host: {
    class: `block text-caption text-red-alert mt-1.5`,
  },
  template: `@if (control().dirty || control().touched) {
    {{ error() }}
  }`,
  imports: [],
})
export class FieldErrorComponent {
  // private readonly elr = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly control = input.required<FormControl>();
  /**
   * passing controls as
   * ```html
   * <field-error
   *   [errors]="form.controls[property].errors"
   * />
   * ```
   * */
  readonly errors = input.required<ValidationErrors | null>();
  /*protected readonly extractAsyncError = computed<ReactiveAsyncError<number> | undefined>(() => {
    if (this.asyncErrorKey() && this.errors()?.[this.asyncErrorKey()!]) {
      return {
        message: this.errors()?.[this.asyncErrorKey()!]['message'] as string,
        value: this.errors()?.[this.asyncErrorKey()!]['value'] as number,
      };
    }
    return void 0;
  });*/
  /**
   * override errors message,
   * passing as
   *
   * ```html
   * <field-error
   *   [control]="form.controls[property]"
   *   [errors]="form.controls[property].errors"
   *   [errorMap]="errorMap"
   * />
   * ```
   *
   *  ```ts
   *  @Component({...})
   *  class Example {
   *    errorMap = {
   *      required: 'Required field', // override message for required validator
   *      email: 'Email format incorrect' // override message for email validator
   *    }
   *  }
   *  ```
   *
   * */
  readonly errorMap = input<Record<string, string> | null | undefined>(DEFAULT_ERROR_DECLARE);
  private readonly mergedErrorsMap = computed(() => {
    const error = this.errorMap() ?? {};
    return mergeObjectValues(DEFAULT_ERROR_DECLARE, error);
  });

  protected readonly error = computed(() => {
    if (!this.errors()) {
      return void 0;
    }
    const current = Object.keys(this.errors() as Record<string, any>);
    const error = this.mergedErrorsMap()![current[0]] ?? this.errors()?.['message'] ?? '';
    // this.elr.nativeElement.setAttribute('has-error', String(error.length > 0));
    return error;
  });
}
