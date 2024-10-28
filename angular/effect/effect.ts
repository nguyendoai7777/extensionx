import { DestroyRef, effect, inject, Signal } from '@angular/core';

/**
 * something like useEffect of React
 *
 * @example
 * ```ts
 * @Component({})
 * class UseEffectExample {
 *   count = signal(0)
 *   constructor() {
 *     useEffect(() => {
 *       // do something
 *       return () => {
 *         console.log(`Test Destroyed`);
 *       }
 *     }, [this.count]);
 *   }
 * }
 * ```
 * */

export function useEffect<T>(
	callback: () => (() => void) | void,
	deps: Signal<T>[],
) {
	const destroyRef = inject(DestroyRef);
	let cleanupFn: (() => void) | void;
	const stopEffect = effect(() => {
		cleanupFn = callback();
		for (const dep of deps) {
			dep();
		}
	});

	destroyRef.onDestroy(() => {
		cleanupFn?.();
		stopEffect.destroy();
	});
}
