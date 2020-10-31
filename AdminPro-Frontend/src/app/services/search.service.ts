import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor( private http: HttpClient) { }

  get token(): string {
   return localStorage.getItem('token') || '';
  }

  get headers() {
    return{
      headers: {
        'x-token': this.token
      }
    };
  }

  private tranformarData( resultado: any[]): User[] {
    return resultado.map(
      user => new User( user.name, user.lastName, user.email, '', user.google, user.role, user.img, user.uid )
    );
  }
  searchCollection( type: 'users'|'medics'|'hospitals', word: string ) {
    const url = `${ base_url }/quests/${type}/${word}`;
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map( (resp: any ) => {
          switch (type) {
            case 'users':
                return this.tranformarData(resp.result);
            default:
              return [];
          }
        } )
      );
  }
}
