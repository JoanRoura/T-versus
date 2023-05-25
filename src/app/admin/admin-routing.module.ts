import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { ListTournamentsComponent } from './pages/list-tournaments/list-tournaments.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { CreateOfficialTournamentComponent } from './pages/create-official-tournament/create-official-tournament.component';

const routes: Routes = [
  {
    path: '',
    component: HomeAdminComponent,
    children: [
      {
        path: 'list-tournaments',
        component: ListTournamentsComponent
      },
      {
        path: 'list-users',
        component: ListUsersComponent
      },
      {
        path: 'create-official-tournament',
        component: CreateOfficialTournamentComponent
      },
      {
        path: '**',
        redirectTo: 'list-tournaments'
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
