import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { IncrementComponent } from './increment/increment.component';
import { DoughnutComponent } from './doughnut/doughnut.component';
import { AccountSettingComponent } from './accountSetting/account-setting.component';
import { ModalImageComponent } from './modal-image/modal-image.component';



@NgModule({
  declarations: [
    IncrementComponent,
    DoughnutComponent,
    AccountSettingComponent,
    ModalImageComponent ],
  exports: [
      IncrementComponent,
      DoughnutComponent,
      AccountSettingComponent,
      ModalImageComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
  ]
})
export class ComponentModule { }
