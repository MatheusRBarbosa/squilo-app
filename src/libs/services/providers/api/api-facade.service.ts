import { Injectable } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { TransactionApiService } from './transaction-api.service';
import { UserApiService } from './user-api.service';
import { VaultApiService } from './vault-api.service';

@Injectable({
  providedIn: 'root',
})
export class ApiFacade {
  /**
   *
   */
  constructor(
    public auth: AuthApiService,
    public user: UserApiService,
    public vault: VaultApiService,
    public transaction: TransactionApiService
  ) {}
}
