import { Component, input, ViewEncapsulation } from '@angular/core';
import { notificationMotion } from 'ng-zorro-antd/core/animation';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { AbstractMessage } from '@components/toast-nzc/toast.abstract';

// ref template: https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/components/notification/notification.component.ts

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'toast-ui-nzc',
  exportAs: 'nzNotification',
  animations: [notificationMotion],
  template: `
    <div
      class="ant-notification-notice ant-notification-notice-closable"
      [style]="instance().options.nzStyle"
      [class]="instance().options.nzClass"
      [@notificationMotion]="state"
      (@notificationMotion.done)="animationStateChanged.next($any($event))"
      (click)="onClick($event)"
      (mouseenter)="onEnter()"
      (mouseleave)="onLeave()"
    >
      <div [class.ant-notification-notice-with-icon]="instance().type !== 'blank'" class="flex gap-2 items-start">
        @switch (instance().type) {
          @case ('success') {
            <svg class="min-w-6 max-w-6 aspect-square" viewBox="0 0 24 24">
              <path
                d="M15.173 8.25492L10.168 13.2716L8.24301 11.3466C8.13842 11.2245 8.00972 11.1253 7.86498 11.0552C7.72024 10.9852 7.56258 10.9459 7.40191 10.9397C7.24124 10.9334 7.08101 10.9605 6.9313 11.0192C6.78159 11.0778 6.64562 11.1668 6.53192 11.2805C6.41822 11.3942 6.32926 11.5302 6.2706 11.6799C6.21195 11.8296 6.18488 11.9898 6.19108 12.1505C6.19729 12.3112 6.23664 12.4688 6.30667 12.6136C6.37669 12.7583 6.47588 12.887 6.59801 12.9916L9.33968 15.7449C9.44869 15.853 9.57798 15.9386 9.72012 15.9967C9.86227 16.0547 10.0145 16.0841 10.168 16.0833C10.4741 16.082 10.7674 15.9605 10.9847 15.7449L16.818 9.91158C16.9274 9.80313 17.0142 9.67409 17.0734 9.53192C17.1326 9.38976 17.1631 9.23727 17.1631 9.08325C17.1631 8.92924 17.1326 8.77675 17.0734 8.63458C17.0142 8.49241 16.9274 8.36337 16.818 8.25492C16.5994 8.03763 16.3037 7.91566 15.9955 7.91566C15.6873 7.91566 15.3916 8.03763 15.173 8.25492ZM11.9997 0.333252C9.69223 0.333252 7.4366 1.01749 5.51803 2.29944C3.59945 3.58139 2.10411 5.40347 1.22109 7.53528C0.338063 9.66708 0.107024 12.0129 0.557185 14.276C1.00735 16.5391 2.11849 18.6179 3.7501 20.2495C5.38171 21.8811 7.46051 22.9923 9.72363 23.4424C11.9867 23.8926 14.3325 23.6615 16.4643 22.7785C18.5961 21.8955 20.4182 20.4001 21.7002 18.4816C22.9821 16.563 23.6663 14.3074 23.6663 11.9999C23.6663 10.4678 23.3646 8.95074 22.7783 7.53528C22.192 6.11981 21.3326 4.83369 20.2493 3.75034C19.1659 2.66699 17.8798 1.80763 16.4643 1.22132C15.0489 0.635019 13.5318 0.333252 11.9997 0.333252ZM11.9997 21.3333C10.1537 21.3333 8.34922 20.7859 6.81436 19.7603C5.2795 18.7347 4.08322 17.2771 3.3768 15.5716C2.67039 13.8662 2.48556 11.9896 2.84568 10.1791C3.20581 8.36859 4.09473 6.70555 5.40002 5.40026C6.70531 4.09497 8.36835 3.20605 10.1788 2.84592C11.9893 2.48579 13.8659 2.67063 15.5714 3.37704C17.2768 4.08346 18.7345 5.27974 19.7601 6.8146C20.7856 8.34945 21.333 10.154 21.333 11.9999C21.333 14.4753 20.3497 16.8492 18.5993 18.5996C16.849 20.3499 14.475 21.3333 11.9997 21.3333Z"
                fill="url(#paint0_linear_217_3434)"
              />
              <defs>
                <linearGradient id="paint0_linear_217_3434" x1="0.333008" y1="11.9999" x2="23.6663" y2="11.9999" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#4FA800" />
                  <stop offset="1" stop-color="#00844E" />
                </linearGradient>
              </defs>
            </svg>
          }
          @case ('info') {
            <nz-icon nzType="info-circle" class="w-6 aspect-square text-2xl ant-notification-notice-icon-info" />
          }
          @case ('warning') {
            <nz-icon nzType="exclamation-circle" class="w-6 aspect-square text-2xl ant-notification-notice-icon-warning" />
          }
          @case ('error') {
            <nz-icon nzType="close-circle" class="w-6 aspect-square text-2xl ant-notification-notice-icon-error" />
          }
        }
        <div>
          <div class="text-heading-h4 mb-2" style="line-height: 24px">
            {{ instance().title }}
          </div>
          <div>{{ instance().content }}</div>
        </div>
      </div>
      <a tabindex="0" class="ant-notification-notice-close " (click)="close()">
        <nz-icon nzType="close" class="ant-notification-close-icon !text-white" />
      </a>
    </div>
  `,
  imports: [NzIconModule, NzOutletModule],
  host: {
    '[class]': `'toast-' + instance().type`,
  },
})
export class ToastUi extends AbstractMessage {
  readonly placement = input<string>();

  constructor() {
    super();
    this.destroyRef.onDestroy(() => {
      this.instance().onClick.complete();
    });
  }

  onClick(event: MouseEvent): void {
    this.instance().onClick.next(event);
  }

  close(): void {
    this.destroy(true);
  }

  get state(): string | undefined {
    if (this.instance().state === 'enter') {
      switch (this.placement()) {
        case 'topLeft':
        case 'bottomLeft':
          return 'enterLeft';
        case 'topRight':
        case 'bottomRight':
          return 'enterRight';
        case 'top':
          return 'enterTop';
        case 'bottom':
          return 'enterBottom';
        default:
          return 'topRight';
      }
    } else {
      return this.instance().state;
    }
  }
}
