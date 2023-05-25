import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { AdminRoutingModule } from './admin-routing.module';

import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { ListTournamentsComponent } from './pages/list-tournaments/list-tournaments.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { CreateOfficialTournamentComponent } from './pages/create-official-tournament/create-official-tournament.component';
import { TournamentsModule } from '../tournaments/tournaments.module';

@NgModule({
  declarations: [
    HomeAdminComponent,
    SidebarComponent,
    HeaderComponent,
    ListTournamentsComponent,
    ListUsersComponent,
    CreateOfficialTournamentComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    PrimeNgModule,
    TournamentsModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }
