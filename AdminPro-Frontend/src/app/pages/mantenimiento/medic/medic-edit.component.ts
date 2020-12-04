import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Hospital } from 'src/app/models/hospital.model';
import { Medic } from '../../../models/medic.model';

import { HospitalService } from '../../../services/hospital.service';
import { MedicService } from '../../../services/medic.service';

@Component({
  selector: 'app-medic-edit',
  templateUrl: './medic-edit.component.html',
  styles: [],
})
export class MedicEditComponent implements OnInit {
  medicForm: FormGroup;
  hospitales: Hospital[] = [];
  medicSelected: Medic;
  hospitalSelected: Hospital;
  constructor(
    private hospitalService: HospitalService,
    private fb: FormBuilder,
    private medicService: MedicService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.medicGetById(id)); // Get params of url current

    this.medicForm = this.fb.group({
      name_medic: ['', Validators.required],
      area_medic: ['', Validators.required],
      hospital: ['', Validators.required],
    });
    this.loadHospital();
    this.medicForm
      .get('hospital')
      .valueChanges.pipe(delay(100))
      .subscribe((hid) => {
        this.hospitalSelected = this.hospitales.find((h) => h.hid === hid);
      });
  }
// method of Load all Medic
  loadHospital() {
    this.hospitalService
      .loadHospitales()
      .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
      });
  }
  // method of  Get By ID Medic
  medicGetById(id: string) {
    if (id === 'nuevo') {
      return;
    }
    this.medicService.medicGetById(id).subscribe((medico: any) => {  // servicio desde el back para obtener medico por id
      if (!medico) {
        return this.router.navigateByUrl(`/dashboard/medics`);
      }
      const {
        name_medic,
        hospital: { _id },
        area_medic,
      } = medico; // desestructurar medico, y obtener id del hospital
      this.medicSelected = medico;
      this.medicForm.setValue({ name_medic, hospital: _id, area_medic }); // Setear Valores a medicForm
    });
  }
  // method of Save Medic
  saveMedic() {
    const { name_medic } = this.medicForm.value;
    if (this.medicSelected) {
      const data = { ...this.medicForm.value, mid: this.medicSelected.mid }; // desestructurar el formulario y asiganar valor a mid
      this.medicService.updateMedic(data).subscribe((resp) => {
        Swal.fire(
          'Actualizado',
          `${name_medic} Actualizo Correctamente`,
          'success'
        );
      });
    } else {
      this.medicService
        .createMedic(this.medicForm.value)
        .subscribe((resp: any) => {
          Swal.fire('Creado', `${name_medic} Guardado`, 'success');
          this.router.navigateByUrl(`/dashboard/medic/${resp.Medic.mid}`);
        });
    }
  }
}
