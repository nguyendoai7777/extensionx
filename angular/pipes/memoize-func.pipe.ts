import { Pipe, PipeTransform } from '@angular/core';

/**
 * use when call function in template and only when component is `ChangeDetection.Default`.
 * 
 * only suported Standalone component.
 * 
 * >>
 * @template
 * 
 * ```html
 * for(c of [1,2,3,4]; track $index) {
 *   <div>{{ x10 | fn: c : 2 }}</div>
 * }
 * ```
 * ------
 *  >>
 * @Component
 * 
 * ```ts
 * Component({
 *   standalone: true,
 *   imports: [FnPipe]
 * })
  export class ExampleComponent {
    x10(num: number, opt?: number) {
      return num + this.value + (opt || 0);
    }
  }
 * 
 * ```
 */

@Pipe({
  standalone: true,
  name: 'fn',
})
export class FnPipe implements PipeTransform {
  transform<
    TFunc extends (...args: any[]) => any,
    TResult extends ReturnType<TFunc>
  >(fn: TFunc, ...args: Parameters<TFunc>): TResult {
    return fn(...args) as TResult;
  }
}
