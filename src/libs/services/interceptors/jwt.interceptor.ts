// import {
//   HttpErrorResponse,
//   HttpEvent,
//   HttpHandler,
//   HttpInterceptor,
//   HttpRequest,
//   HTTP_INTERCEPTORS,
// } from '@angular/common/http';
// import { Injectable, Injector } from '@angular/core';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { AccountQuery, AccountService } from '../state/account';

// @Injectable()
// export class JwtInterceptor implements HttpInterceptor {
//   private accountQuery!: AccountQuery;
//   private account!: AccountService;

//   constructor(private injector: Injector) {}

//   /**
//    *
//    */
//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     this.accountQuery = this.injector.get(AccountQuery);
//     this.account = this.injector.get(AccountService);

//     const newReq = req.headers.has('anonymous')
//       ? this.createAnonymousRequest(req)
//       : this.createAuthRequest(req);

//     return next.handle(newReq).pipe(
//       catchError((response: HttpErrorResponse) => {
//         if (response.status === 401) {
//           this.account.logout();
//         }

//         return throwError(() => response);
//       })
//     );
//   }

//   /**
//    *
//    */
//   protected createAuthRequest(req: HttpRequest<any>) {
//     return req.clone({
//       headers: req.headers.set(
//         'Authorization',
//         `Bearer ${this.accountQuery.token}`
//       ),
//     });
//   }

//   /**
//    *
//    */
//   protected createAnonymousRequest(req: HttpRequest<any>) {
//     return req.clone({ headers: req.headers.delete('anonymous') });
//   }
// }

// export const JwtInterceptorProvider = {
//   provide: HTTP_INTERCEPTORS,
//   useClass: JwtInterceptor,
//   multi: true,
// };
