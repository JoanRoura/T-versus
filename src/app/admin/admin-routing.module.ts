import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home-admin',
        component: HomeAdminComponent
      },
      {
        path: '**',
        redirectTo: 'home-admin'
      }
    ]
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
