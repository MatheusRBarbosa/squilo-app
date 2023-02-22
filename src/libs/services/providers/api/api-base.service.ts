import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

export type Params = { [key: string]: any };

/**
 *
 */
export const toHttpParams = (params: Params = {}) => {
  let httpParams = new HttpParams();
  Object.keys(params)
    .filter((key) => params[key] != null)
    .forEach(
      (key) => (httpParams = httpParams.append(key, params[key].toString()))
    );
  return httpParams;
};

export class ApiBaseService<T extends { id: number }> {
  protected resource: string = '';
  protected get api(): string {
    return `http://localhost:8000/api/v1/${this.resource}`;
  }

  constructor(protected http: HttpClient) {}

  /**
   *
   */
  protected setResource = (resource: string) => (this.resource = resource);

  /**
   *
   */
  protected endpoint(route?: number | string): string {
    return !route ? this.api : `${this.api}/${route}`.trim();
  }

  /**
   *
   */
  save = (model: T, params?: Params) => {
    return model.id ? this.update(model, params) : this.create(model, params);
  };

  /**
   *
   */
  create = (model: T, params?: Params): Observable<T> => {
    return this.httpPost(this.api, model, params);
  };

  /**
   *
   */
  update = (model: Partial<T>, params?: Params): Observable<T> => {
    return this.httpPut(this.endpoint(model.id!), model, params);
  };

  /**
   *
   */
  get = (route: number | string, params?: Params): Observable<T> => {
    return this.httpGet(this.endpoint(route), params);
  };

  /**
   *
   */
  getAll = (route?: number | string, params?: Params): Observable<T[]> => {
    return this.http
      .get<T[]>(this.endpoint(route), { params: toHttpParams(params) })
      .pipe(share());
  };

  /**
   *
   */
  protected httpGet = (endpoint: string, params?: Params): Observable<T> => {
    return this.http
      .get<T>(endpoint, { params: toHttpParams(params) })
      .pipe(share());
  };

  /**
   *
   */
  protected httpPost = (
    endpoint: string,
    payload: any,
    params?: Params
  ): Observable<T> => {
    return this.http.post<T>(endpoint, payload, { params }).pipe(share());
  };

  /**
   *
   */
  protected httpPut = (endpoint: string, payload: any, params?: Params) => {
    return this.http.put<T>(endpoint, payload, { params }).pipe(share());
  };
}
