import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';



const pagesroutes: Routes = [
    { path: 'dashboard',
      component: PagesComponent,
      children: [
             { path: '', component: DashboardComponent,
               data: { title: 'Dashboard' } },
            { path: 'progressbar', component: ProgressbarComponent ,
              data: { title: 'Dashboard' }}
         ]}
];

@NgModule({
    imports: [RouterModule.forChild(pagesroutes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
