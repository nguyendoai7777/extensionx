import { inject, InjectionToken, InjectOptions, Provider, Type } from '@angular/core';

export interface InjectFnc<T> {
  (): T;

  (opts: InjectOptions & { optional?: false }): T;

  (opts: InjectOptions & { optional?: true }): T | null;
}

export interface ProvideFnc<T> {
  (value: T): Provider;

  (deps: Array<Type<any>>, factory: (...args: any[]) => T): Provider;
}

export type InjectTokenCreatorReturn<T> = [InjectFnc<T>, ProvideFnc<T>, InjectionToken<T>];

export function createInjectionToken<T>(desc: string): InjectTokenCreatorReturn<T> {
  const token = new InjectionToken<T>(desc);

  function provideFnc(valueOrDeps: T | Type<any>[], factory?: (...args: any[]) => T) {
    if (factory) {
      return {
        provide: token,
        useFactory: factory,
        deps: valueOrDeps as Type<any>[],
      };
    }
    return {
      provide: token,
      useValue: valueOrDeps as T,
    };
  }

  function injectFnc(opts: InjectOptions = {}) {
    return inject(token, opts);
  }

  return [injectFnc as InjectFnc<T>, provideFnc, token];
}
