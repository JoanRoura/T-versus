import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './pages/main/main.component';
import { ChoseTournamentComponent } from './pages/chose-tournament/chose-tournament.component';
import { CreateTournamentComponent } from './pages/create-tournament/create-tournament.component';
import { SearchTournamentComponent } from './pages/search-tournament/search-tournament.component';
import { EditTournamentComponent } from './pages/edit-tournament/edit-tournament.component';
import { TournamentComponent } from './pages/tournament/tournament.component';

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
        path: ':id',
        component: TournamentComponent
      },
      {
        path: 'edit-tournament/:id',
        component: EditTournamentComponent
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
        path: '**',
        redirectTo: 'main'
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
