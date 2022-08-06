import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  constructor(private cookieService: CookieService) { }

  hostUrl = "https://randomuser.me/api/?results=500";

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
