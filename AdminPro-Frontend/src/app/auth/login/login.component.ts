import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { UserService } from '../../services/user.service';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public auth2: any;
  public loginForm = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: ['', Validators.required],
    remember: [false],
  });
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userservice: UserService,
    private ngzone: NgZone
  ) {}

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
      this.userservice.logout();
      this.attachSignIn(document.getElementById('btngoogle'));
  }
  attachSignIn(element: HTMLElement) {
    this.auth2.attachClickHandler(
      element,
      {},
      (googleUser) => {
        const token = googleUser.getAuthResponse().id_token;
        console.log(token);
        this.userservice.loginGoogle(token).subscribe(
          resp => {
            this.ngzone.run(() => {
              this.router.navigateByUrl('/dashboard');
            });
          }
        );
      },
      (error) => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }
  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.userservice.login(this.loginForm.value).subscribe(
      (resp: any) => {
        if (this.loginForm.get('remember').value) {
          localStorage.setItem('email', resp.email);
        } else {
          localStorage.removeItem('email');
        }
        this.router.navigateByUrl('/dashboard');
      },
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }
}
