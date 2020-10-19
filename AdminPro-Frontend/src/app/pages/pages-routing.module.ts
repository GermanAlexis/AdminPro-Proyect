import { Routes, RouterModule, CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../guards/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { GraphicsComponent } from './graphics/graphics.component';
import { AccountSettingComponent } from '../components/accountSetting/account-setting.component';
import { PromiseComponent } from './promise/promise.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { HospitalComponent } from './mantenimiento/hospital/hospital.component';
import { MedicComponent } from './mantenimiento/medic/medic.component';
import { UserComponent } from './mantenimiento/user/user.component';



const pagesroutes: Routes = [
    { path: 'dashboard',
      component: PagesComponent,
      canActivate: [AuthGuard],
      children: [
             { path: '', component: DashboardComponent,
               data: { title: 'Dashboard', description: 'PAGINA PRINCIPAL ' } },
             { path: 'progressbar', component: ProgressbarComponent ,
              data: { title: 'Progreso' , description: 'BARRAS DE PROGRESOS'}},
             { path: 'graphics', component: GraphicsComponent ,
              data: { title: 'Graficas', description: 'GRAFICAS DONAS' }},
             { path: 'accountsetting', component: AccountSettingComponent ,
              data: { title: 'Ajuste de Usuario', description: 'CAMBIAR COLORES' }},
              { path: 'promise', component: PromiseComponent ,
              data: { title: 'Promesas', description: 'USOS DE PROMESAS ' }},
              { path: 'rxjs', component: RxjsComponent ,
              data: { title: 'Rxjs', description: 'APLICACIONES DE RXJS' }},
              { path: 'profile', component: ProfileComponent ,
              data: { title: 'Perfil del Usuario', description: 'Perfil de Usuario' }},
              // manttenimeinto
              { path: 'user', component: UserComponent ,
              data: { title: 'Manejo del Usuario', description: 'CRUD de Usuario' }},
              { path: 'medic', component: MedicComponent ,
              data: { title: 'Manejo del Medico', description: 'CRUD de Usuario' }},
              { path: 'hoapital', component: HospitalComponent ,
              data: { title: 'Manejo del Hospital', description: 'CRUD de Hospital' }}
         ]}
];

@NgModule({
    imports: [RouterModule.forChild(pagesroutes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
