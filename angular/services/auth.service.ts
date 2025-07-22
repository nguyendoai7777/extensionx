import { inject, Injectable } from '@angular/core';
import { ConfigService } from '@services/config.service';
import { tap } from 'rxjs';
import { LOCAL_STORAGE_KEY } from '@constants/local-storage.const';
import { HttpClient } from '@angular/common/http';
import { JWTData, RefreshTokenResponse } from '@type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly SSOUrl = inject(ConfigService).config.SSOUrl;

  ssoLogin = async () => {
    try {
      return await (async () =>
        new Promise((e, t) => {
          const o = setTimeout(() => {
            t('Time out!');
          }, 5000);
          window.addEventListener('message', (i) => {
            if (i.origin.indexOf(this.SSOUrl) >= 0) {
              if ('logout' == i.data) {
                window.location.reload();
              } else {
                const s = i.data;
                ((s && s.AccessToken) || t('Null credentials!'), clearTimeout(o));
                Object.keys(s).forEach((e) => {
                  localStorage[e] = s[e];
                });
                e(s);
              }
            }
          });

          const i = document.createElement('iframe');
          i.setAttribute('id', 'authIframe');
          const s = document.body;
          (i.setAttribute('style', 'width:0;height:0;border:0;border:none;position:absolute;'),
            i.setAttribute('src', this.SSOUrl + '/iframe-sso.html'),
            s.appendChild(i));
        }))();
    } catch (e) {
      const t = this.SSOUrl + `/login?redirect=${window.location.href}`;
      window.location.replace(t);
      return void 0;
    }
  };
  ssoLogout = (logoutSSO?: string | number | undefined) => {
    localStorage.clear();
    if (logoutSSO === undefined) logoutSSO = 1;
    var mode = 'sso';
    if (localStorage.getItem('RefreshToken') !== 'null') mode = 'cognito';
    var base_url = window.location.origin;
    const e = this.SSOUrl + `/login?logout_sso=` + logoutSSO + `&mode=` + mode + `&redirect=${base_url}`;
    // localStorage.clear();
    window.location.replace(e);
  };

  /////

  refreshToken() {
    const rt = localStorage.getItem(LOCAL_STORAGE_KEY.RefreshToken)!;
    return this.http.get<RefreshTokenResponse>(`https://api-sit.f88.co/auth/main/auth/refresh-token?refreshToken=${rt}`).pipe(
      tap((res) => {
        // !TODO
        /*if (fail_refreshed_Action) {
          this.ssoLogout()
        }*/
        // success refresh
        localStorage.setItem(LOCAL_STORAGE_KEY.AccessToken, res.AccessToken);
      })
    );
  }

  isAccessTokenExpired() {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY.AccessToken);
    if (!token) {
      this.ssoLogout();
      return;
    }
    const { exp } = this.decodeJWT(token),
      expirationTime = exp * 1000;
    /*console.log({
      AccessTokenExpireAfter: `${day.duration(expirationTime - Date.now()).hours()}h ${day.duration(expirationTime - Date.now()).minutes()}m ${day.duration(expirationTime - Date.now()).seconds()}s`,
    });*/
    return Date.now() >= expirationTime;
  }

  decodeJWT(token: string) {
    const base64Url = token.split('.')[1],
      base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'),
      jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      ),
      jwtToken = JSON.parse(jsonPayload);
    return jwtToken as JWTData;
  }
}
