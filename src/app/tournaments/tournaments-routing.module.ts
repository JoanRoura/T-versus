import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './pages/main/main.component';
import { ChoseTournamentComponent } from './pages/chose-tournament/chose-tournament.component';
import { CreateTournamentComponent } from './pages/create-tournament/create-tournament.component';
import { SearchTournamentComponent } from './pages/search-tournament/search-tournament.component';
import { EditTournamentComponent } from './pages/edit-tournament/edit-tournament.component';
import { TournamentComponent } from './pages/tournament/tournament.component';
import { ShowTournamentsComponent } from './pages/show-tournaments/show-tournaments.component';
import { AdminTournamentRondesComponent } from '../admin-tournament-rondes/admin-tournament-rondes.component';
import { TournamentCreatorComponent } from './pages/tournament/tournament-creator/tournament-creator.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'main',
        component: MainComponent
      },
      {
        path: 'search-tournament',
        component: SearchTournamentComponent
      },
      {
        path: 'chose-tournament',
        component: ChoseTournamentComponent
      },
      {
        path: 'create-tournament',
        component: CreateTournamentComponent
      },
      {
        path: 'show-tournaments/:id',
        component: ShowTournamentsComponent
      },
      {
        path: 'edit-tournament/:id',
        component: EditTournamentComponent
      },
      {
        path: ':id',
        component: TournamentComponent
      },
      {
        path: 'creator/:id',
        component: TournamentCreatorComponent
      },
      {
        path: '**',
        redirectTo: 'main'
      },
      {
        path: 'roundsAdmin/:id',
        component: AdminTournamentRondesComponent
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
export class TournamentsRoutingModule { }
