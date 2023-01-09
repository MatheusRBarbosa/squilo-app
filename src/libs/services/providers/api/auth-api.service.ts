import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials, Token } from '@squilo/domain';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const endpoint = (route: number | string): string => {
  const api = `http://localhost:8000/api/v1`;
  return !route ? api : `${api}/${route}`.trim();
};

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  /**
   *
   */
  constructor(private http: HttpClient) {}

  /**
   *
   */
  login = (credentials: Credentials | Token): Observable<Token> => {
    return this.http
      .post<{ token: Token }>(endpoint('login'), credentials, {
        headers: new HttpHeaders({ anonymous: 'true' }),
      })
      .pipe(map(({ token }) => token));
  };
}
