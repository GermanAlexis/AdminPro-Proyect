import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  private linktheme = document.querySelector('#theme');

  constructor() {
    const url = localStorage.getItem('theme') || `./assets/css/colors/default-dark.css`;
    this.linktheme.setAttribute('href', url);
   }
   changetheme( theme: string) {
    const url = `assets/css/colors/${theme}.css`;
    this.linktheme.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    const links = document.querySelectorAll('.selector');
    links.forEach(element => {
      element.classList.remove('working');
      const btntheme = element.getAttribute('data-theme');
      const btnthemeUrl = `./assets/css/colors/${ btntheme }.css`;
      const currenttheme = this.linktheme.getAttribute('href');

      if (btnthemeUrl === currenttheme) {
        element.classList.add('working');
      }
    });
  }
}
