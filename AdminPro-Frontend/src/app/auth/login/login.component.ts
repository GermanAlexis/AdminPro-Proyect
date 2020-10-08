import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';


import Swal from 'sweetalert2';

import { UserService } from '../../services/user.service';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public auth2: any;
  public loginForm = this.fb.group({
    email:    [ localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required ],
    remember: [false]
  });
  constructor( private router: Router, private fb: FormBuilder, private userservice: UserService) { }

  ngOnInit(): void {
    this.googleInit();
  }

  onSuccess(googleUser) {
    const token = googleUser.getAuthResponse().id_token;
  }
  onFailure(error) {
    console.log(error);
  }
  renderButton() {
    gapi.signin2.render('btngoogle', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
    });
    this.googleInit();
  }
  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          '1052296378840-oe0k1qfjn4tgqhidjfa64jlgnlad6cbo.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });
      this.attachSignIn(document.getElementById('btngoogle'));
    });
  }
  attachSignIn(element: HTMLElement) {
    this.auth2.attachClickHandler(element, {},
       (googleUser) => {
          const token = googleUser.getAuthResponse().id_token;
          console.log(token);
          this.userservice.loginGoogle(token).subscribe();
        }, (error) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }
  login() {
    if (this.loginForm.invalid ) {
      return;
    }
    this.userservice.login(this.loginForm.value).subscribe( (resp: any ) => {
      if ( this.loginForm.get('remember').value ) {
        localStorage.setItem('email', resp.email);
      } else {
        localStorage.removeItem('email');
      }
    }, (err) => {
     Swal.fire('Error', err.error.msg, 'error');
    });
   // this.router.navigateByUrl('/dashboard');
  }
}
