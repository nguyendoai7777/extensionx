import { signal, WritableSignal } from '@angular/core';

import { CreateSignal } from './create-signal.d';

export const createSignal: CreateSignal = <T>(
  initialValue?: T
): WritableSignal<T | undefined> => {
  if (typeof initialValue === 'function') {
    return signal((initialValue as () => T)());
  }
  return signal(initialValue);
};
