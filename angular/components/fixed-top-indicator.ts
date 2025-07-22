import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'fixed-top-indicator',
  imports: [],
  template: ` <div class="progressing"></div> `,
  styles: `
    @keyframes processing {
      to {
        width: 100%;
      }
    }
    fixed-top-indicator {
      display: block;
      width: 100%;
      height: 3px;
      .progressing {
        position: absolute;
        top: 0;
        height: 100%;
        background: var(--text-main);
        animation: processing 1.2s ease-out;
        width: 0%;
      }
    }
  `,
  encapsulation: ViewEncapsulation.None,
})
export class FixedTopIndicator {}
