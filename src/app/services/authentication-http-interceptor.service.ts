import { Inject, Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, finalize } from 'rxjs/operators';

@Injectable()
export class AuthenticationHttpInterceptor implements HttpInterceptor {

  private requests: HttpRequest<any>[] = [];

  constructor() { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    let httpEvent: HttpEvent<any>;
    let errorResponse: HttpErrorResponse;

    const header = this.getHeaders();
    if (header) {
      request = request.clone({ headers: header });
      this.requests.push(request);
    }
    const busyIndicatorTimerRef = setTimeout(() => {
      // this.busyIndicatorService.show();
    }, 50);

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        httpEvent = event;
        if (event instanceof HttpResponse) {
          this.removeRequestAndHandleBusyIndicator(busyIndicatorTimerRef, request);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        errorResponse = error;
        clearTimeout(busyIndicatorTimerRef);
        this.removeRequests(request);
        // this.busyIndicatorService.hide();
        return throwError(error);
      }),
      finalize(() => {
        // To handle cancelled xhr request
        if ((httpEvent.type === HttpEventType.Sent) && !errorResponse) {
          this.removeRequestAndHandleBusyIndicator(busyIndicatorTimerRef, request);
        }
      })
    );
  }

  private removeRequestAndHandleBusyIndicator(busyIndicatorTimerRef: any, request: HttpRequest<any>): void {
    clearTimeout(busyIndicatorTimerRef);
    this.removeRequests(request);
    if (this.requests.length === 0) {
      // this.busyIndicatorService.hide();
    }
  }

  private removeRequests(request: HttpRequest<any>): void {
    const requestIndex = this.requests.indexOf(request);
    if (requestIndex >= 0) {
      this.requests.splice(requestIndex, 1);
    }
  }

  private getHeaders(): HttpHeaders {
    // const token = localStorage.getItem(jsonConstant.ACCESS_TOKEN_KEY);
    return new HttpHeaders(Object.assign({}, {
      Accept: 'application/json',
      'Content-Type': 'application/json'
      // Authorization: (token != null ? token : '')
    }));
  }
}
