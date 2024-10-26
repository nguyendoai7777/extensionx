import { computed, DestroyRef, effect, inject, isSignal, Signal } from '@angular/core';

interface WatcherOption {
  debounceTime?: number;
}

interface EffectOption extends WatcherOption {
  destroyRef?: DestroyRef;
}

function _debounce(callback: () => void, delay: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return () => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(callback, delay);
  };
}


export type WatcherRef = (cleanupFn?: () => void) => void
/**
 * something like useEffect of React
 *
 * @example
 * ```ts
 * @Component({})
 * class WatcherExample {
 *   cleanupWatcher!: WatcherRef
 *   count = signal(0)
 *   constructor() {
 *     this.cleanupWatcher = this.watcher(() => {
 *       // do something
 *     }, [this.count])
 *   }
 *   ngOnDestroy() {
 *     this.cleanupWatcher(() => {
 *       console.log(`Test Destroyed`);
 *     })
 *   }
 * }
 * ```
 * */

export function watcher<T>(
  callback: (values: T[]) => void,
  deps: Signal<T>[],
  option?: WatcherOption
): WatcherRef {
  if (!deps.every(isSignal)) {
    throw new Error('All dependencies must be signals.');
  }
  const watchEffect = computed(() => deps.map(dep => dep()));
  if (!option || !option?.debounceTime) {
    option = {
      debounceTime: 200
    };
  }
  const debouncedCallback = _debounce(() => {
    const values = watchEffect();
    callback(values);
  }, option.debounceTime!);

  const cleanupEffect = effect(() => {
    debouncedCallback();
  });

  return (cleanupFn) => {
    cleanupFn && cleanupFn();
    cleanupEffect.destroy();
  };

}

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
  callback: (values: T[]) => (() => void) | void,
  deps: Signal<T>[],
  option?: EffectOption
) {
  if (!deps.every(isSignal)) {
    throw new Error('All dependencies must be signals.');
  }

  const watchEffect = computed(() => deps.map(dep => dep()));
  let cleanupFn: (() => void) | void;

  if (!option) {
    option = {};
    if (!option.debounceTime) {
      option.debounceTime = 200;
    }
    if (!option.destroyRef) {
      option.destroyRef = inject(DestroyRef);
    }
  }
  const debouncedCallback = _debounce(() => {
    if (cleanupFn) {
      cleanupFn();
    }

    const values = watchEffect();
    cleanupFn = callback(values);
  }, option.debounceTime!);

  const cleanupEffect = effect(() => {
    debouncedCallback();
  });

  option.destroyRef!.onDestroy(() => {
    if (cleanupFn) {
      cleanupFn();
    }
    cleanupEffect.destroy();
  });
}
