import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { ModalImageService } from '../../../services/modal-image.service';
import { HospitalService } from '../../../services/hospital.service';
import { SearchService } from '../../../services/search.service';

import { Hospital } from '../../../models/hospital.model';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styles: []
})
export class HospitalComponent implements OnInit, OnDestroy {

  Hospitales: Hospital[] = [];
  imgSubs: Subscription;
  loading = true;

   constructor( private hospitalService: HospitalService,
                private modalImageService: ModalImageService,
                private searchService: SearchService) { }

  ngOnInit(): void {
    this.loadHospitals();
    this.imgSubs = this.modalImageService.newImage
    .pipe(
      delay (100)
      ).subscribe( img => this.loadHospitals() );
  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  searchHospital( termino: string) {
    if ( termino.length > 0) {
      this.searchService.searchCollection('hospitals', termino).subscribe( (resp: Hospital[]) => { this.Hospitales = resp; } );
    } else { this.loadHospitals(); }
  }
  loadHospitals() {
    this.loading = true;
    this.hospitalService.loadHospitales().subscribe(
      hospitals => {
                    this.Hospitales = hospitals;
                    this.loading = false;
       }
    );
  }

  async openSweetHospital() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Escriba el nombre del hospital',
      input: 'text',
      showCancelButton: true,
      inputPlaceholder: 'Nombre del Hospital'
    });

    if (value.trim().length > 0) {
      this.hospitalService.createHospital(value).subscribe((resp: any) => { this.Hospitales.push( resp.hospital );  } );
    }
  }

  updateHospital(hospital: Hospital) {
    this.hospitalService.updateHospital(hospital.hid, hospital.name_hospital)
    .subscribe((resp: any) => {
      Swal.fire( 'Exitos', resp.mgs, 'success' );
      this.loadHospitals();
    });
  }

  deleteHospital(hospital: Hospital) {
    this.hospitalService.deleteHospital(hospital.hid)
    .subscribe((resp: any) => {
      Swal.fire( 'Eliminado', resp.mgs, 'success' );
      this.loadHospitals();
    });
  }

  openModal(hospital: Hospital) {
    this.modalImageService.openModal('hospitals', hospital.hid, hospital.img);
  }

}

