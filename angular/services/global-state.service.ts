import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalState {
  readonly checkingSSOLogin = signal<boolean | undefined>(void 0);
  readonly xhrRequesting = signal(false);
  readonly globalLoading = signal(false);
}
