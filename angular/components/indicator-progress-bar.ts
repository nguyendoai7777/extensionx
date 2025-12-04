import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'indicator-progress-bar',
  imports: [],
  template: ` <div class="progressing" [style.height]="height()"></div> `,
  styles: `
    @keyframes processing {
      to {
        width: 100%;
      }
    }
    indicator-progress-bar {
      display: block;
      width: 100%;
      .progressing {
        position: absolute;
        top: 0;
        height: 100%;
        background: var(--primary-color, #005CBBFF);
        animation: processing 1.2s ease-out;
        width: 0%;
      }
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarIndicator {
 /**
  * css unit
  */
  readonly height = input('3px');
}
