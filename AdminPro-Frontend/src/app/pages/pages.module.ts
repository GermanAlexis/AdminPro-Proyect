import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { ComponentModule } from '../components/component.module';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { GraphicsComponent } from './graphics/graphics.component';
import { PromiseComponent } from './promise/promise.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './mantenimiento/user/user.component';
import { MedicComponent } from './mantenimiento/medic/medic.component';
import { HospitalComponent } from './mantenimiento/hospital/hospital.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    ProgressbarComponent,
    GraphicsComponent,
    PromiseComponent,
    RxjsComponent,
    ProfileComponent,
    UserComponent,
    MedicComponent,
    HospitalComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentModule,
    PipesModule
  ],
  exports: [DashboardComponent, ProgressbarComponent],
})
export class PagesModule {}
