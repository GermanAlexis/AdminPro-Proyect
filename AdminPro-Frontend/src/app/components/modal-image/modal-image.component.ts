import { Component, OnInit } from '@angular/core';
import { ModalImageService } from '../../services/modal-image.service';
import { FileUploadService } from '../../services/file-upload.service';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [],
})
export class ModalImageComponent implements OnInit {

  public imgTemp: any = null;
  public upImg: File;

  constructor( public modalImageService: ModalImageService,
               public fileUploadService: FileUploadService ) {}

  ngOnInit(): void {}


  closeModal() {
    this.modalImageService.closeModal();
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

    const id = this.modalImageService.id;
    const type = this.modalImageService.type;

    this.fileUploadService.updatePhoto( this.upImg, type, id)
    .then( img => {
      Swal.fire('Camobio Excelente', 'Guardado con Exito', 'success');
      this.modalImageService.newImage.emit(img);
      this.closeModal();
    }).catch ( error => {
      Swal.fire('Fallo!', 'Fallo al subir', 'error');
    });
  }
}
