import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';

import {AppConfigService} from './app-config.service'
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient, private appConfigService: AppConfigService) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  public sendGetRequest() : Observable<any> {
    return this.httpClient.get("https://randomuser.me/api/?results=500").pipe(catchError(this.handleError));
  }

  public getProductDetailsById(productId) {
    return this.httpClient.get(this.appConfigService.hostUrl+"/productDetail/"+productId).pipe(catchError(this.handleError));
  }

  public getStatementListByAccountId(accountId) {
    return this.httpClient.get(this.appConfigService.hostUrl+"/account/statement/"+accountId).pipe(catchError(this.handleError));
  }
  
  public getStatementById(statementId) {
    return this.httpClient.get(this.appConfigService.hostUrl+"/statement/"+statementId).pipe(catchError(this.handleError));
  }

  public getProductsForUser(payload) {
    return this.httpClient.post(this.appConfigService.hostUrl+"/products/",payload).pipe(catchError(this.handleError));
  }

  public authenticateUser(payload) {
    return this.httpClient.post(this.appConfigService.hostUrl+"/login/auth/",payload).pipe(catchError(this.handleError));
  }

  public getBenficiaryDetails() {
    return this.httpClient.get(this.appConfigService.hostUrl+"/benificiaryDetails/").pipe(catchError(this.handleError));
  }

  public Transferto(payload) {
    return this.httpClient.post(this.appConfigService.hostUrl+"/transfer",payload).pipe(catchError(this.handleError));
  }
}
