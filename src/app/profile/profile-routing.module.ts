import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeProfileComponent } from './pages/home-profile/home-profile.component';
import { ViewProfileComponent } from './pages/view-profile/view-profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomeProfileComponent,
    children: [
      {
        path: 'view-profile',
        component: ViewProfileComponent
      },
      {
        path: '**',
        redirectTo: 'buy-tokens'
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
