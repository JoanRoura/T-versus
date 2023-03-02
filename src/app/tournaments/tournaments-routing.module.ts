import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ChoseTournamentComponent } from './pages/chose-tournament/chose-tournament.component';
import { CreateTournamentComponent } from './pages/create-tournament/create-tournament.component';
import { SearchTournamentComponent } from './pages/search-tournament/search-tournament.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        component: HomeComponent
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
        redirectTo: 'home'
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
