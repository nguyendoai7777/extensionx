import { WritableSignal } from '@angular/core';

declare function useSignal<S>(initialValue: S | (() => S)): WritableSignal<S>;
declare function useSignal<S = undefined>(): WritableSignal<S | undefined>;

export { useSignal };
