import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingService } from './setting.service';


@NgModule({
  declarations: [SettingService],
  imports: [
    CommonModule
  ],
  exports: [SettingService]
})
export class ServicesModule { }
