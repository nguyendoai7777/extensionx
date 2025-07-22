import { inject, Injectable, TemplateRef } from '@angular/core';
import { NzMNService } from 'ng-zorro-antd/message';
import { NzNotificationData, NzNotificationDataOptions } from 'ng-zorro-antd/notification';
import { Toast } from '@components/toast-nzc/toast';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { ToastConfig } from '@components/toast-nzc/toast.types';

let notificationId = 0;

@Injectable({
  providedIn: 'root',
})
export class ToastService extends NzMNService<Toast> {
  protected componentPrefix = 'notification-';

  success(options: ToastConfig) {
    return this.create('success', options.title, options.content, options.options);
  }

  error(options: ToastConfig) {
    return this.create('error', options.title, options.content, options.options);
  }

  info(options: ToastConfig) {
    return this.create('info', options.title, options.content, options.options);
  }

  warning(options: ToastConfig) {
    return this.create('warning', options.title, options.content, options.options);
  }

  blank(options: ToastConfig) {
    return this.create('blank', options.title, options.content, options.options);
  }

  create(type: 'success' | 'info' | 'warning' | 'error' | 'blank', title: string, content: string | undefined, options?: NzNotificationDataOptions) {
    return this.createInstance({ type, title, content }, options);
  }

  template(
    template: TemplateRef<{
      $implicit: Toast;
      data: NzSafeAny;
    }>,
    options?: NzNotificationDataOptions
  ) {
    return this.createInstance({ template }, options);
  }

  protected generateMessageId(): string {
    return `${this.componentPrefix}-${notificationId++}`;
  }

  private createInstance(message: NzNotificationData, options?: NzNotificationDataOptions) {
    this.container = this.withContainer(Toast);

    return this.container.create({
      ...message,
      ...{
        createdAt: new Date(),
        messageId: options?.nzKey || this.generateMessageId(),
        options,
      },
    });
  }
}

export const toast = () => inject(ToastService);
