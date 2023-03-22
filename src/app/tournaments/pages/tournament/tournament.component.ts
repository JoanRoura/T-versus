import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';

import { Tournament } from '../../interfaces/tournaments.interface';

import { TournamentsService } from '../../services/tournaments.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {

  tournament!: Tournament;

  constructor(
    private activatedRoute: ActivatedRoute,
    private tournamentsService: TournamentsService) { }


  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.tournamentsService.getOneTournament(id)),
        tap(console.log)
      )
      .subscribe((tournament) => {
        console.log(tournament);
      });
  }
}
