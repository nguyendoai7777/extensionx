import {
  ApplicationConfig,
  EnvironmentProviders,
  importProvidersFrom,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  Provider,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { provideNzI18n, vi_VN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideNzConfig } from 'ng-zorro-antd/core/config';
import { NZIcons } from './icons-provider';
import { firstValueFrom, tap } from 'rxjs';
import { AppInitConfig } from '@type';
import { ConfigService } from '@services/config.service';
import { appInterceptor } from './shared/interceptors/app.interceptor';

registerLocaleData(vi);

const NZConfig: (Provider | EnvironmentProviders)[] = [
  provideNzIcons([
    ...NZIcons,
    { icon: 'f-down', name: 'f-down.svg', theme: 'outline' },
    { icon: 'f-datepicker', name: 'f-datepicker.svg', theme: 'outline' },
    { icon: 'f-menu', name: 'f-menu.svg', theme: 'outline' },
    { icon: 'f-invest', name: 'f-invest.svg', theme: 'outline' },
    { icon: 'f-invest', name: 'f-invest.svg', theme: 'outline' },
    { icon: 'f-search', name: 'f-search.svg', theme: 'outline' },
    { icon: 'back', name: 'back.svg', theme: 'outline' },
  ]),
  provideNzI18n(vi_VN),
  importProvidersFrom(FormsModule),
  provideNzConfig({
    button: {},
    message: {},
    select: {
      nzSuffixIcon: 'f-down',
      nzOptionHeightPx: 42,
    },
    datePicker: {
      nzSuffixIcon: 'f-datepicker',
    },
    pagination: {},
  }),
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => {
      const http = inject(HttpClient),
        cg = inject(ConfigService);

      return firstValueFrom(
        http.get<AppInitConfig>('/config.json').pipe(
          tap((config) => {
            cg.setConfig(config);
          })
        )
      );
    }),
    provideHttpClient(withInterceptors([appInterceptor])),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideAnimationsAsync(),
    ...NZConfig,
  ],
};
