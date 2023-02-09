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
import { Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { AccountService } from '../providers';
import { AccountState } from '../state';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private accountService!: AccountService;
  private account$: Observable<AccountState>;

  constructor(
    private store: Store<{ account: AccountState }>,
    private injector: Injector
  ) {
    this.account$ = this.store.select('account');
  }

  /**
   *
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.accountService = this.injector.get<AccountService>(AccountService);

    return this.account$.pipe(
      mergeMap((state) => this.createRequest(req, state.token)),
      mergeMap((newReq) => next.handle(newReq)),
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
  protected createRequest(req: HttpRequest<any>, token?: string) {
    return of(
      req.headers.has('anonymous')
        ? this.createAnonymousRequest(req)
        : this.createAuthRequest(req, token!)
    );
  }

  /**
   *
   */
  protected createAuthRequest(req: HttpRequest<any>, token: string) {
    return req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
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
