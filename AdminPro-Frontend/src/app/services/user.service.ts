import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/registerForm.interface';
import { LoginForm } from '../interfaces/loginiForm.interface';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient) { }

  createUser( formData: RegisterForm) {

    console.log(formData);
    return this.http.post(`${ base_url }/users`, formData )
    .pipe(
      tap( (resp: any ) => {
        localStorage.setItem('token', resp.token);
      })
      );
    }

  login( formData: LoginForm) {
    return this.http.post(`${ base_url }/login`, formData )
                  .pipe(
                    tap( (resp: any ) => {
                      localStorage.setItem('token', resp.token);
                    })
                  );
  }

  loginGoogle( token) {
    return this.http.post(`${ base_url }/login/google`, { token } )
                    .pipe(
                      tap( (resp: any ) => {
                        localStorage.setItem('token', resp.token);
                      })
                    );
  }
}
