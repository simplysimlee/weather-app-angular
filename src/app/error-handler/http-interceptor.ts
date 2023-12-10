// error.interceptor.ts

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse) {
          this.handleHttpError(error);
        }
        return throwError(error);
      })
    );
  }

  private handleHttpError(error: HttpErrorResponse): void {
    console.error('HTTP error occurred:', error);
    // Customize the error handling based on the status code
    if (error.status === 401) {
      // Redirect to login page or show unauthorized message
      error.error.message = 'Unauthorized';
     
    } else if (error.status === 500) {
      // Show a generic error message
      error.error.message = 'An internal server error occurred. Please try again later.';
    } else {
      // Show a generic error message for other status codes
      error.error.message = `HTTP error ${error.status}: ${error.statusText}`;
    }
  }


}
