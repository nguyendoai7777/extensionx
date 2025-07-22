import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { LOCAL_STORAGE_KEY } from '@constants/local-storage.const';
import { inject } from '@angular/core';
import { ConfigService } from '@services/config.service';
import { catchError, defer, finalize, of, retry, switchMap, tap, throwError, timer } from 'rxjs';
import { GlobalState } from '@services/global-state.service';
import { AuthService } from '@services/auth.service';

const NO_TOKEN = 'NO_TOKEN_IN_LOCAL_STORAGE';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  const cf = inject(ConfigService).config,
    state = inject(GlobalState);

  if (req.url === '/config.json' || !req.url.startsWith('/api')) {
    return next(req);
  }
  const MAX_RETRIES = 5;
  const RETRY_DELAY_MS = 300;
  const auth = inject(AuthService);

  const getTokenObservable = defer(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY.AccessToken);
    if (token) {
      return of(token);
    } else {
      return throwError(() => new Error(NO_TOKEN));
    }
  });

  const configHeader = (token: string, url?: string) => {
    return req.clone({
      url,
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return getTokenObservable.pipe(
    retry({
      count: MAX_RETRIES,
      delay: (error, retryCount) => {
        if (error.message === NO_TOKEN && retryCount <= MAX_RETRIES) {
          state.checkingSSOLogin.set(true);
          console.info(`Retrying token fetch (attempt ${retryCount}/${MAX_RETRIES})...`);
          // localStorage.setItem(LOCAL_STORAGE_KEY.LoginAt, Date.now().toString());
          /* if(retryCount === MAX_RETRIES) {
            auth.ssoLogout();
          }*/
          return timer(RETRY_DELAY_MS).pipe(tap(() => state.checkingSSOLogin.set(false)));
        }
        return throwError(() => error);
      },
    }),
    switchMap((token) => {
      state.xhrRequesting.set(true);
      const url = `${cf.ApiUrl}${req.url}`;
      console.log({
        requestUrl: req.url,
        apiUrl: cf.ApiUrl,
        mappedUrl: url,
      });
      /*let r: any ;

      if (isDevMode()) {
        r = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        r = req.clone({
          url,
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }*/

      // check token expire
      if (auth.isAccessTokenExpired()) {
        state.checkingSSOLogin.set(true);
        return auth.refreshToken().pipe(
          switchMap(() => {
            const tk = localStorage.getItem(LOCAL_STORAGE_KEY.AccessToken)!;
            return next(configHeader(tk, url));
          }),
          finalize(() => state.checkingSSOLogin.set(false))
        );
      }

      return next(configHeader(token, url)).pipe(finalize(() => state.xhrRequesting.set(false)));
    }),
    catchError((error: HttpErrorResponse) => {
      console.log(`From Error final`, error);
      if (error.status === HttpStatusCode.Unauthorized) {
        auth.ssoLogout();
      }
      return throwError(() => error);
    })
  );
};
