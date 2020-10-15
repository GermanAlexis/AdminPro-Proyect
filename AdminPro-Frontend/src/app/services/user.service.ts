import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/registerForm.interface';
import { LoginForm } from '../interfaces/loginiForm.interface';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

const base_url = environment.base_url;

declare const gapi: any;
@Injectable({
  providedIn: 'root',
})
export class UserService {
  public auth2: any;
  public user: User;
  constructor(private http: HttpClient, private router: Router, private ngzone: NgZone ) { this.googleInit(); }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.user.uid;
  }
  googleInit() {
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise ( resolve => {

      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '1052296378840-oe0k1qfjn4tgqhidjfa64jlgnlad6cbo.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin'
        });
        resolve();
      });
    });
  }
  logout() {
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      this.ngzone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }
  validToken(): Observable<boolean> {

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
        }
    }).pipe(
      map((resp: any ) => {
        const { name, lastName, email, password, img = '', google, role, uid } = resp.user;
        this.user = new User( name, lastName, email, '', google, role, img, uid );
        localStorage.setItem('token', resp.token);
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

  updateProfile(formData: { email: string, name: string, role: string}) {

    formData = {
      ...formData,
      role: this.user.role
    };

    return this.http.put(`${base_url}/users/${this.uid}`, formData, {
      headers: {
        'x-token': this.token
        }
    }).pipe(
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
