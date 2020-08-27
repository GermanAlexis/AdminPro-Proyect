import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { IncrementComponent } from './increment/increment.component';
import { DoughnutComponent } from './doughnut/doughnut.component';
import { AccountSettingComponent } from './accountSetting/account-setting.component';



@NgModule({
  declarations: [
    IncrementComponent,
    DoughnutComponent,
    AccountSettingComponent ],
  exports: [
      IncrementComponent,
      DoughnutComponent,
      AccountSettingComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
  ]
})
export class ComponentModule { }
