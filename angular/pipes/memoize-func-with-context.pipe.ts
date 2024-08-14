import { Pipe, PipeTransform } from '@angular/core';

/**
 * use when call function in template with context (bind context for object)  and only when component is `ChangeDetection.Default`.
 * 
 * only suported Standalone component.
 * >>
 * @template
 * 
 * ```html
 * for(c of [1,2,3,4]; track $index) {
 *   <div>{{ someObject.x10 | fnWith: someObject: c }}</div>
 * }
 * ```
 * ------
 *  >>
 * @Component
 * 
 * ```ts
 * Component({
 *   standalone: true,
 *   imports: [FnWithContextPipe]
 * })
  export class ExampleComponent {
    someObject = {
      value: 42,
      x10(num: number) {
        return num + this.value;
      }
    }
  }
 * 
 * ```
 * 
 */
@Pipe({
  standalone: true,
  name: 'fnWith',
})
export class FnWithContextPipe implements PipeTransform {
  transform<
    PFuncInp extends (...args: any[]) => any,
    PContext,
    PResult extends ReturnType<PFuncInp>
  >(
    fn: PFuncInp,
    context: PContext,
    ...args: Parameters<PFuncInp>
  ): PResult {
    return fn.call(context, ...args) as PResult;
  }
}
