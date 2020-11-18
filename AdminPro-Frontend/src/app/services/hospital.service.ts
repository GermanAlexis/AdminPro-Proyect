import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Hospital } from '../models/hospital.model';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor( private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  loadHospitales() {
    return this.http.get(`${base_url}/hospitals`).pipe(
      map( (resp: {ok: true, hospitals: Hospital[]}) => resp.hospitals )
    );
  }

  createHospital(name: string) {
    return this.http.post( `${base_url}/hospitals`, { name_hospital: name  }, this.headers );
  }

  updateHospital(id: string, name: string) {
    return this.http.put( `${base_url}/hospitals/${id}`, { name_hospital: name  }, this.headers );
  }

  deleteHospital(id: string) {
    return this.http.delete( `${base_url}/hospitals/${id}`, this.headers );
  }
}
