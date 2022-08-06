import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class HttpInterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    console.log("interceptor called");
    // const newReq = req.clone();
    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'authToken')
    });

    // Clone the request and set the new header in one step.
    // const authReq = req.clone({ setHeaders: { Authorization: authToken } });

    // copy the body and trim whitespace from the name property
    const newBody = { ...req.body, requestTime: new Date().getTime() };
    // clone request and set its body
    const newReq = req.clone({ body: newBody });
    // send the cloned request to the next handler.
    return next.handle(newReq);

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
