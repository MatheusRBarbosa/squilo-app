import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Token } from '@squilo/domain';

@Injectable({ providedIn: 'root' })
export class JwtHelper {
  private helper: JwtHelperService;

  constructor() {
    this.helper = new JwtHelperService();
  }

  /**
   *
   */
  decodedToken = (token: Token) => this.helper.decodeToken(token);

  /**
   *
   */
  isExpired = (token: Token) => this.helper.isTokenExpired(token);
}
