import { Component, OnInit, Inject } from '@angular/core';
import { SettingService } from '../../services/setting.service';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.css']
})
export class AccountSettingComponent implements OnInit {


  constructor( private setting: SettingService) { }

  ngOnInit(): void {
    this.setting.checkCurrentTheme();
  }
  changetheme( theme: string) {
    this.setting.changetheme( theme );
  }
}
