import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountService } from '../providers';
import { AccountState, ACCOUNT_STORE } from '../state';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private accountService!: AccountService;
  private token!: string | undefined;

  constructor(
    private store: Store<{ account: AccountState }>,
    private injector: Injector
  ) {
    this.store
      .select(ACCOUNT_STORE)
      .subscribe((account) => (this.token = account.token));
  }

  /**
   *
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.accountService = this.injector.get<AccountService>(AccountService);

    const newReq = req.headers.has('anonymous')
      ? this.createAnonymousRequest(req)
      : this.createAuthRequest(req);

    return next.handle(newReq).pipe(
      catchError((response: HttpErrorResponse) => {
        if (response.status === 401) {
          this.accountService.logout();
        }

        return throwError(() => response);
      })
    );
  }

  /**
   *
   */
  protected createAuthRequest(req: HttpRequest<any>) {
    return req.clone({
      headers: req.headers.set('Authorization', `Bearer ${this.token}`),
    });
  }

  /**
   *
   */
  protected createAnonymousRequest(req: HttpRequest<any>) {
    return req.clone({ headers: req.headers.delete('anonymous') });
  }
}

export const JwtInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptor,
  multi: true,
};
