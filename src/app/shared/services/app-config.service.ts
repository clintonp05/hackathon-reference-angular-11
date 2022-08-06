import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  constructor(private cookieService: CookieService) { }

  hostUrl = "https://df53b3f3-a87a-4848-bebf-93e7db0e08cd.mock.pstmn.io"

  STATUS_CODE_SUCCESS = 200;
  STATUS_CODE_NO_CONTENT = 204;
  STATUS_CODE_UNAUTHORIZED = 401;
  STATUS_CODE_FORBIDDEN = 403;
  STATUS_CODE_INTERNAL_SERVER_ERROR = 500;

  getAccessToken(): string {
    return this.cookieService.get('token');
  }

  removeAccessToken(): void {
    this.cookieService.deleteAll();
  }

  setAccessToken(token: string): void {
    this.cookieService.set('token', token);
  }

  setLoggedInUsername(username : string ) {
    sessionStorage.setItem('username',username);
  }

  getLoggedInUsername(username : string ) {
    sessionStorage.getItem('username');
  }

  


}
