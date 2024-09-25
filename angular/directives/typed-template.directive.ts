import { Directive, Input } from '@angular/core'

export type TypedTemplate<TImplicit, TRest> = {
	[K in keyof TRest]: TRest[K]
} & {
	$implicit: TImplicit
}

/**
 * @template
 * 
 ```html
 <ng-template #test let-position let-age="age" let-name="name" [inferType]="dataTest">
   <div>My name is {{name}}, {{age}}.</div>
   <div>I'm {{position}}</div>
 </ng-template>

 <ng-container *ngTemplateOutlet="test; context: { $implicit: 'ng-d', age: 26, name: 'doai' }" />

 ```
 * 
 * ---
 * @component
 *
 ```ts
 @Component({
  ...,
   imports: [TemplateTypeInfer]
 })
 export class SomeComponent {
   dataTest!: {
     $implicit: string
     name: string
     age: number
   }
 }
 ```
 * 
 * */


@Directive({
	selector: 'ng-template[inferType]',
	standalone: true,
})
export class TemplateTypeInfer<T> {
	@Input() inferType!: T

	static ngTemplateContextGuard<T>(_: TemplateTypeInfer<T>, _ctx: any): _ctx is T {
		return true
	}
}
