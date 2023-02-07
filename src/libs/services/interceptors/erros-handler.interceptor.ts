import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface DefaultError {
  status: number;
  message: string;
  serverError: boolean;
}

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  /**
   *
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(this.normalizeServerError));
  }

  /**
   *
   */
  private normalizeServerError = (err: HttpErrorResponse | any) => {
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('Client error');
      return throwError(() => err.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      let message: string = 'Unexpected error happened!';
      let body: any;

      try {
        body = JSON.parse(err.error);
      } catch (error) {
        body = err.error;
      }

      if (err.status === 422) {
        const firstError = Object.keys(body.errors).shift();
        message = `${body.errors[firstError!].join(' ')}`;
      } else if (err.status === 400 && Array.isArray(body.errors)) {
        message = `${body.errors[0].message}`;
      } else {
        if (typeof body === 'string') {
          message = body;
        } else if (body && body.message) {
          message = body.message;
        } else if (body && body.error) {
          message = body.error;
        }
      }

      const error: DefaultError = {
        status: err.status,
        message,
        serverError: true,
      };

      return throwError(() => error);
    }
  };
}

export const ErrorHandlerInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorHandlerInterceptor,
  multi: true,
};
