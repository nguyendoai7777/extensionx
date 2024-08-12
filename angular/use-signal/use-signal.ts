import { signal, WritableSignal } from '@angular/core';
import { useSignal as useSignalFn } from './use-signal.d';

const createSignalImpl = <S>(
  initialState?: S | (() => S)
): WritableSignal<S | undefined> => {
  if (typeof initialState === 'function') {
    return signal((initialState as () => S)());
  }
  return signal(initialState);
};

export const useSignal = createSignalImpl as typeof useSignalFn;
