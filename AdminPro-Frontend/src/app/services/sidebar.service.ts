import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any [] = [
    {
      title: 'Componetes',
      icon: 'mdi mdi-gauge',
      submenu: [
        { subtitle: 'main', url: '/dashboard'},
        { subtitle: 'ProgressBar', url: 'progressbar'},
        { subtitle: 'Graficas', url: 'graphics'},
        { subtitle: 'Promesas', url: 'promise'},
        { subtitle: 'RxJs', url: 'rxjs'},
      ]
    }
  ];
  constructor() { }
}
