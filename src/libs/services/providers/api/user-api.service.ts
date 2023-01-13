import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@squilo/domain';
import { ApiBaseService } from './api-base.service';

@Injectable({ providedIn: 'root' })
export class UserApiService extends ApiBaseService<User> {
  constructor(public override http: HttpClient) {
    super(http);
    this.setResource('user');
  }
}
