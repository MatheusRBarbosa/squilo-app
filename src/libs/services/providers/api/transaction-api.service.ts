import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '@squilo/domain';
import { Observable } from 'rxjs';
import { ApiBaseService, Params } from './api-base.service';

@Injectable({ providedIn: 'root' })
export class TransactionApiService extends ApiBaseService<Transaction> {
  constructor(public override http: HttpClient) {
    super(http);
    this.setResource('vault');
  }
}
