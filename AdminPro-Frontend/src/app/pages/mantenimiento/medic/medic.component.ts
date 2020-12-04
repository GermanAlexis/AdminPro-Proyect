import { Component, OnInit, OnDestroy } from '@angular/core';
import { Medic } from 'src/app/models/medic.model';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { MedicService } from '../../../services/medic.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SearchService } from '../../../services/search.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medic',
  templateUrl: './medic.component.html',
  styles: []
})
export class MedicComponent implements OnInit, OnDestroy {

  loading = true;
  medics: Medic [] = [];
  imgSubs: Subscription;
  constructor( private medicService: MedicService,
               private searchService: SearchService,
               private modalImageService: ModalImageService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.loadmedics();
    this.imgSubs = this.modalImageService.newImage
    .pipe(
      delay (100)
      ).subscribe( img => this.loadmedics() );
  }
  searchMedic( termino: string) {
    if ( termino.length > 0) {
      this.searchService.searchCollection('medics', termino).subscribe( (resp: Medic[]) => { this.medics = resp; } );
    } else { this.loadmedics(); }
  }
  loadmedics() {
    this.loading = true;
    this.medicService.loadMedics().subscribe( (resp: any) => {
      this.loading = false;
      this.medics = resp.medics;
    } );
  }


  deleteMedic(medic: Medic) {


    Swal.fire({
      title: 'Estas Seguro?',
      text: `Esta por eliminar al Medico ${ medic.name_medic }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar '
    }).then((result) => {
       if (result.value) {
           this.medicService.deleteMedic(medic.mid)
               .subscribe(
                  resp => {
                         this.loadmedics();
                         Swal.fire(
                            'Eliminado',
                            `${ medic.name_medic } has sido eliminado`,
                            'success'
                          );
              });
            }
          }
      );
  }
  openModal(medic: Medic) {
    this.modalImageService.openModal('medics', medic.mid, medic.img);
  }

}
