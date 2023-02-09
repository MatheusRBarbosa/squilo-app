import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vault } from '@squilo/domain';
import { ApiBaseService } from './api-base.service';

@Injectable({ providedIn: 'root' })
export class VaultApiService extends ApiBaseService<Vault> {
  constructor(public override http: HttpClient) {
    super(http);
    this.setResource('vault');
  }
}
