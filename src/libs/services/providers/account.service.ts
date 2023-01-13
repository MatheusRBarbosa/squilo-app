import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Credentials, Token, User } from '@squilo/domain';
import { Observable, of } from 'rxjs';
import { finalize, mergeMap } from 'rxjs/operators';
import {
  AccountState,
  JwtHelper,
  resetStore,
  setToken,
  setUser,
} from '../state/account';
import { ApiFacade } from './api';
import { LoadingService } from './loading.service';

@Injectable({ providedIn: 'root' })
export class AccountService {
  account$: Observable<AccountState>;

  constructor(
    private store: Store<{ account: AccountState }>,
    private loading: LoadingService,
    private api: ApiFacade,
    private jwt: JwtHelper
  ) {
    this.account$ = this.store.select('account');
  }

  /**
   *
   */
  login = (credentials: Credentials | Token): Observable<User> => {
    this.loading.show('Aguarde...');
    const login$ =
      typeof credentials === 'string'
        ? of(credentials)
        : this.api.auth.login(credentials);

    return login$.pipe(
      mergeMap((token) => this.createUserFromToken(token)),
      finalize(this.loading.dismiss)
    );
  };

  /**
   *
   */
  logout = (): Observable<void> => {
    this.store.dispatch(resetStore());
    return of();
  };

  /**
   *
   */
  private createUserFromToken = (token: Token): Observable<User> => {
    const { id } = this.jwt.decodedToken(token);
    const user: User = {
      ...new User(),
      id,
    };

    this.store.dispatch(setUser({ user }));
    this.store.dispatch(setToken({ token }));

    return of(user);
  };
}
