import { Component, OnInit } from '@angular/core';
import { SettingService } from '../services/setting.service';

declare function customInitFuntion();
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor( private setting: SettingService) { }
  Date = new Date().getFullYear();
  ngOnInit(): void {
    customInitFuntion();
  }

}
