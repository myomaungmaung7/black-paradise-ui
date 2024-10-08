/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AuthResponse } from '../../models/auth-response';
import { UserDto } from '../../models/user-dto';

export interface Register3$Params {
      body: UserDto
}

export function register3(http: HttpClient, rootUrl: string, params: Register3$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthResponse>> {
  const rb = new RequestBuilder(rootUrl, register3.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<AuthResponse>;
    })
  );
}

register3.PATH = '/api/v1/admin/register';
