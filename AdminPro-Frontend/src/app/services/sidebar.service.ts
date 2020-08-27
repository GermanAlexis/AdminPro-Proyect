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
        { subtitle: 'main', url: '/'},
        { subtitle: 'ProgressBar', url: 'progressbar'},
        { subtitle: 'Graficas', url: 'graphics'}
      ]
    }
  ];
  constructor() { }
}
