import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from './../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiInterceptorService implements HttpInterceptor {

  private apiUrls = [
    environment.pexelBaseUrl,
    environment.openAiBaseUrl,
  ];

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let headers = req.headers;
    
    if (!this.apiUrls.some(url => req.url.includes(url))) {
      return new Observable(obs => obs.complete());
    }

    if (req.url.includes(environment.pexelBaseUrl)) {
      headers = headers.set('Authorization', environment.pexelApiKey);
    }

    if (req.url.includes(environment.openAiBaseUrl)) {
      headers = headers
      .set('Authorization', `Bearer ${environment.openAiApiKey}`)
      .set('Content-Type', 'application/json');
    }

    return next.handle(req.clone({ headers })).pipe(
      catchError(() => throwError(() => new Error('request failed')))
    );
  }
}
