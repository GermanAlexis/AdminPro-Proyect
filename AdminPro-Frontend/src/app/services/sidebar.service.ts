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
        { subtitle: 'Perfil de usuario', url: 'profile'},
      ]
    },
    {
      title: 'Mantenimiento',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        { subtitle: 'Usuarios', url: 'user'},
        { subtitle: 'Medicos', url: 'medic'},
        { subtitle: 'Hospitales', url: 'hospital'},
      ]
    }
  ];
  constructor() { }
}
