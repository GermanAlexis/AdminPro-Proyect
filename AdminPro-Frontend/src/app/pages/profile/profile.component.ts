import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup;
  public user: User;
  public upImg: File;
  public imgTemp: any;

  constructor( private fb: FormBuilder, private userService: UserService, private fileuploadService: FileUploadService) {
    this.user = userService.user;
  }

  ngOnInit(): void {
      this.profileForm = this.fb.group({
        name: [this.user.name, Validators.required],
        lastName: [this.user.lastName, Validators.required],
        email: [this.user.email, [Validators.required, Validators.email]]
      });
  }


  updateProfile() {
    this.userService.updateProfile( this.profileForm.value )
    .subscribe( resp => {
       const { name, lastName, email } = this.profileForm.value;
       this.user.name = name;
       this.user.lastName = lastName;
       this.user.email = email;
       Swal.fire('Guardado', 'Guardado con Exito', 'success');
    }, (err) => {
       Swal.fire('Fallo!!', err.error.msg, 'error');
    });
  }

  changeImage( file: File) {
    this.upImg = file;

    if (!file) {
     return this.imgTemp = null;
    }
    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  UpImagen() {
    this.fileuploadService.updatePhoto( this.upImg, 'users', this.user.uid)
    .then( img => {
      this.user.img = img,
      Swal.fire('Camobio Excelente', 'Guardado con Exito', 'success');
    });

  }
}
