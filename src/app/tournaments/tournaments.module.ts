import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TournamentsRoutingModule } from './tournaments-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';

import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './pages/main/main.component';

import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { SearchTournamentComponent } from './pages/search-tournament/search-tournament.component';
import { ChoseTournamentComponent } from './pages/chose-tournament/chose-tournament.component';
import { CreateTournamentComponent } from './pages/create-tournament/create-tournament.component';
import { TournamentCardComponent } from './components/tournament-card/tournament-card.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { EditTournamentComponent } from './pages/edit-tournament/edit-tournament.component';
import { TournamentComponent } from './pages/tournament/tournament.component';
import { ShowTournamentsComponent } from './pages/show-tournaments/show-tournaments.component';

import { ImagePipe } from './pipes/image.pipe';


@NgModule({
  declarations: [
    HomeComponent,
    SearchTournamentComponent,
    ChoseTournamentComponent,
    CreateTournamentComponent,
    MainComponent,
    TournamentCardComponent,
    CarouselComponent,
    EditTournamentComponent,
    TournamentComponent,
    ImagePipe,
    ShowTournamentsComponent
  ],
  imports: [
    CommonModule,
    TournamentsRoutingModule,
    ReactiveFormsModule,
    PrimeNgModule,
    SharedModule
  ],
  exports: [
    ImagePipe
  ]
})
export class TournamentsModule { }
