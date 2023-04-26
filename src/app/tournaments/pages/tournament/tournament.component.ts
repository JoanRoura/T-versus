import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';

import { Tournament } from '../../interfaces/tournament.interface';

import { TournamentsService } from '../../services/tournaments.service';
import { AuthUser } from 'src/app/auth/interfaces/auth-user.interface';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {

  loading: boolean = false;
  
  tournament!: Tournament;
  usersInTournament!: AuthUser;

  constructor(
    private activatedRoute: ActivatedRoute,
    private tournamentsService: TournamentsService,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.tournamentsService.getOneTournament(id)),
        tap(console.log)
      )
      .subscribe((tournament) => {
        this.tournament = tournament
      });
  }

  ngAfterViewInit(): void {
    this.tournamentsService.getUsersInTournament(this.tournament.id!)
      .subscribe(users => {
        console.log(users);
      });
    
  }

  goBack(): void {
    this.router.navigate(['/tournaments/main'])
  }
}
