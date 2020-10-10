import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    name:      ['alex', [Validators.required, Validators.minLength(3)] ],
    lastName:  ['ALvarez', Validators.required],
    email:     ['alexalva@correo.com', [Validators.required, Validators.email]],
    password:  ['123', Validators.required],
    password2: ['123', Validators.required],
    terms:     [true, Validators.required]
  }, {validators: this.passwordEqual('password', 'password2')});

  constructor(private fb: FormBuilder, private router: Router,  private userService: UserService) {}

  createUser() {
    this.formSubmitted = true;
    if (this.registerForm.invalid ) {
      return;
    }
    // console.log(this.registerForm.value);
    this.userService.createUser(this.registerForm.value).subscribe( (resp) => {
      Swal.fire('Exitos', 'Usuario Registrado', 'success');
      this.router.navigateByUrl('/dashboard');
     }, (err) => {
        Swal.fire('Error', err.error.mgs, 'error');
     });
  }

  campoValid( campo: string): boolean {
    if (this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  contrasenaNoValid() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;


    if ( (pass1 !== pass2) && this.formSubmitted) {
        return true;
    } else {
      return false;
    }
  }
  passwordEqual(pass1: string, pass2: string) {
    return (formGroup: FormGroup) => {
      const passcontrol1 = formGroup.get(pass1);
      const passcontrol2 = formGroup.get(pass2);

      if (passcontrol1.value === passcontrol2.value) {
        passcontrol2.setErrors(null);
      } else {
        passcontrol2.setErrors( {noEsIgual: true});
      }

    };
  }
  aceptTerm() {
    return !this.registerForm.get('terms').value && this.formSubmitted;
  }
}
