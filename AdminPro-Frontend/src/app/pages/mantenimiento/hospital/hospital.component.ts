import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styles: []
})
export class HospitalComponent implements OnInit {

  Hospitales: Hospital[] = [];
  loading = true;

  // tslint:disable-next-line: variable-name
  name_hospital = 'Hospital general';

  constructor( private hospitalService: HospitalService) { }

  ngOnInit(): void {
    this.loadHospitals();
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
    const { value  } = await Swal.fire<string>({
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
}

