import { Injectable } from '@angular/core';
import { applyTransaction, resetStores } from '@datorama/akita';
import { Credentials, Token, User } from '@squilo/domain';
import { ApiFacade } from '@squilo/services';
import { Observable, of } from 'rxjs';
import { finalize, mergeMap } from 'rxjs/operators';
import { AccountQuery, AccountStore } from '.';
import { LoadingService } from '../../providers/loading.service';
import { JwtHelper } from './jwt.helper';

@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(
    private query: AccountQuery,
    private store: AccountStore,
    private api: ApiFacade,
    private jwt: JwtHelper,
    private loading: LoadingService
  ) {}

  /**
   *
   */
  logout = (): Observable<void> => {
    resetStores();
    return of();
  };

  /**
   *
   */
  login = (credentials: Credentials | Token): Observable<User> => {
    this.loading.show('Please wait...');
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
  private createUserFromToken = (
    token: Token = this.query.token
  ): Observable<User> => {
    const { id } = this.jwt.decodedToken(token);
    const user: User = {
      ...new User(),
      id,
    };

    applyTransaction(() => {
      this.store.setToken(token);
      this.store.setUser(user);
    });

    return of(user);
  };
}
