import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { GraphicsComponent } from './graphics/graphics.component';
import { AccountSettingComponent } from '../components/accountSetting/account-setting.component';



const pagesroutes: Routes = [
    { path: 'dashboard',
      component: PagesComponent,
      children: [
             { path: '', component: DashboardComponent,
               data: { title: 'Dashboard' } },
             { path: 'progressbar', component: ProgressbarComponent ,
              data: { title: 'Progreso' }},
             { path: 'graphics', component: GraphicsComponent ,
              data: { title: 'Graficas' }},
             { path: 'accountsetting', component: AccountSettingComponent ,
              data: { title: 'Ajuste de Usuario' }}
         ]}
];

@NgModule({
    imports: [RouterModule.forChild(pagesroutes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
