import { Pipe, PipeTransform } from '@angular/core'

/**
 * @demo
 *
 * */

@Pipe({
	standalone: true,
	name: 'dFilter',
})
export class DFilter<T extends object> implements PipeTransform {
	transform(value: T[], search: string) {
		if (!search) return value
		return value.filter((c: any) => c.name.toLowerCase().includes(search.toLowerCase()))
	}
}
