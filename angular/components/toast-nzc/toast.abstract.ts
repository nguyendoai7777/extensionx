import { ChangeDetectorRef, DestroyRef, Directive, inject, input, OnInit, output } from '@angular/core';
import { NzMessageDataOptions } from 'ng-zorro-antd/message';
import { filter, Subject, take } from 'rxjs';
import { NzNotificationData } from 'ng-zorro-antd/notification';

@Directive()
export abstract class AbstractMessage implements OnInit {
  readonly instance = input.required<Required<NzNotificationData>>();
  readonly index = input.required<number>();
  readonly destroyed = output<{ id: string; userAction: boolean }>();

  protected cdr = inject(ChangeDetectorRef);
  protected destroyRef = inject(DestroyRef);
  readonly animationStateChanged: Subject<AnimationEvent> = new Subject<AnimationEvent>();

  protected options!: Required<NzMessageDataOptions>;
  protected autoClose?: boolean;
  protected closeTimer?: ReturnType<typeof setTimeout>;
  protected userAction: boolean = false;
  protected eraseTimer?: ReturnType<typeof setTimeout>;
  protected eraseTimingStart?: number;
  protected eraseTTL!: number;

  protected constructor() {
    this.destroyRef.onDestroy(() => {
      if (this.autoClose) {
        this.clearEraseTimeout();
      }
      this.animationStateChanged.complete();
    });
  }

  ngOnInit(): void {
    this.options = this.instance().options as Required<NzMessageDataOptions>;

    if (this.options.nzAnimate) {
      this.instance().state = 'enter';
      this.animationStateChanged
        .pipe(
          filter((event) => (event as any).phaseName === 'done' && (event as any).toState === 'leave'),
          take(1)
        )
        .subscribe(() => {
          clearTimeout(this.closeTimer);
          this.destroyed.emit({ id: this.instance().messageId, userAction: this.userAction });
        });
    }

    this.autoClose = this.options.nzDuration > 0;

    if (this.autoClose) {
      this.initErase();
      this.startEraseTimeout();
    }
  }

  onEnter(): void {
    if (this.autoClose && this.options.nzPauseOnHover) {
      this.clearEraseTimeout();
      this.updateTTL();
    }
  }

  onLeave(): void {
    if (this.autoClose && this.options.nzPauseOnHover) {
      this.startEraseTimeout();
    }
  }

  protected destroy(userAction: boolean = false): void {
    this.userAction = userAction;
    if (this.options.nzAnimate) {
      this.instance().state = 'leave';
      this.cdr.detectChanges();
      this.closeTimer = setTimeout(() => {
        this.closeTimer = undefined;
        this.destroyed.emit({ id: this.instance().messageId, userAction });
      }, 200);
    } else {
      this.destroyed.emit({ id: this.instance().messageId, userAction });
    }
  }

  private initErase(): void {
    this.eraseTTL = this.options.nzDuration;
    this.eraseTimingStart = Date.now();
  }

  private updateTTL(): void {
    if (this.autoClose) {
      this.eraseTTL -= Date.now() - this.eraseTimingStart!;
    }
  }

  private startEraseTimeout(): void {
    if (this.eraseTTL > 0) {
      this.clearEraseTimeout();
      this.eraseTimer = setTimeout(() => this.destroy(), this.eraseTTL);
      this.eraseTimingStart = Date.now();
    } else {
      this.destroy();
    }
  }

  private clearEraseTimeout(): void {
    if (this.eraseTimer !== null) {
      clearTimeout(this.eraseTimer);
      this.eraseTimer = undefined;
    }
  }
}
