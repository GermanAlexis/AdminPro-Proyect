import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Medic } from '../models/medic.model';
import { map } from 'rxjs/operators';


const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class MedicService {

  constructor( private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: { 'x-token': this.token }
    };
  }

  loadMedics() {
    return this.http.get(`${base_url}/medics`, this.headers );
  }

  createMedic(medic: {name_medic: string, area: string, hospital: string }) {
    console.log(medic);
    return this.http.post(`${base_url}/medics`, medic, this.headers );
  }

  updateMedic(medic: Medic) {
    return this.http.put(`${base_url}/medics/${medic.mid}`, medic, this.headers );
  }
  deleteMedic(id: string) {
    return this.http.delete(`${base_url}/medics/${id}`, this.headers );
  }

  medicGetById(id: string) {
    return this.http.get(`${base_url}/medics/${id}`, this.headers )
    .pipe(
      // tslint:disable-next-line: ban-types
      map( (resp: {ok: Boolean,  medic: Medic }) => resp.medic )
    );
  }
}
