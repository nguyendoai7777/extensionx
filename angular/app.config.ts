/**
 * AppInitConfig is interface for fetch config.json from public/config.json use instead for environments folder (build mistake)
 *
 */

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
