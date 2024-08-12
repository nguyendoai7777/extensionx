import { WritableSignal } from '@angular/core';

export type CreateSignal = {
  /**
   */
  <T>(initialValue: T | (() => T)): WritableSignal<T>;
  /**
  // convenience overload when first argument is omitted
  */
  <T>(): WritableSignal<T | undefined>;
};
