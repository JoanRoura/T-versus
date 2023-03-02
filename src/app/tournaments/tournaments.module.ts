import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TournamentsRoutingModule } from './tournaments-routing.module';

import { HomeComponent } from './pages/home/home.component';
import { SearchTournamentComponent } from './pages/search-tournament/search-tournament.component';
import { ChoseTournamentComponent } from './pages/chose-tournament/chose-tournament.component';
import { CreateTournamentComponent } from './pages/create-tournament/create-tournament.component';


@NgModule({
  declarations: [
    HomeComponent,
    SearchTournamentComponent,
    ChoseTournamentComponent,
    CreateTournamentComponent
  ],
  imports: [
    CommonModule,
    TournamentsRoutingModule
  ]
})
export class TournamentsModule { }
