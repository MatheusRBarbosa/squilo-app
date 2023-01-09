// import { Injectable } from '@angular/core';
// import { Token, User } from '@squilo/domain';
// import { Query } from '@datorama/akita';
// import { distinctUntilChanged, filter, map } from 'rxjs/operators';
// import { AccountStore } from '.';
// import { AccountState } from './account.store';
// import { JwtHelper } from './jwt.helper';

// @Injectable({ providedIn: 'root' })
// export class AccountQuery extends Query<AccountState> {
//   token$ = this.select((account) => account.token);

//   login$ = this.token$.pipe(
//     distinctUntilChanged(),
//     map(() => this.isLoggedIn),
//     filter((isLoggedIn) => !!isLoggedIn)
//   );

//   logout$ = this.token$.pipe(
//     distinctUntilChanged(),
//     map(() => !this.isLoggedIn),
//     filter((isLoggedOut) => isLoggedOut)
//   );

//   user$ = this.select((account) => account.user);

//   /**
//    *
//    */
//   get user(): User {
//     return this.getValue().user!;
//   }

//   /**
//    *
//    */
//   get token(): Token {
//     return this.getValue().token!;
//   }

//   /**
//    *
//    */
//   get isLoggedIn(): boolean {
//     return this.isValidToken;
//   }

//   /**
//    *
//    */
//   get isValidToken(): boolean {
//     return this.jwt.isExpired(this.token);
//   }

//   constructor(protected override store: AccountStore, private jwt: JwtHelper) {
//     super(store);
//   }
// }
