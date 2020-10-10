import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/registerForm.interface';
import { LoginForm } from '../interfaces/loginiForm.interface';

const base_url = environment.base_url;

declare const gapi: any;
@Injectable({
  providedIn: 'root',
})
export class UserService {
  public auth2: any;
  constructor(private http: HttpClient) {}

  logout() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          '1052296378840-oe0k1qfjn4tgqhidjfa64jlgnlad6cbo.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });
    });
  }
  validToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
        }
    }).pipe(
      tap((resp: any ) => {
        localStorage.setItem('token', resp.token);
      }),
      map( (resp: boolean) => {
        return true;
      }),
      catchError( error => of(false))
    );
  }

  createUser(formData: RegisterForm) {
    return this.http.post(`${base_url}/users`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  loginGoogle(googleToken) {
    return this.http.post(`${base_url}/login/google`, { googleToken }).pipe(
      tap((resp: any) => {
        console.log(resp);
        localStorage.setItem('token', resp.token);
      })
    );
  }
}
