import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';

import { Tournament } from '../../interfaces/tournament.interface';

import { TournamentsService } from '../../services/tournaments.service';
import { AuthUser } from 'src/app/auth/interfaces/auth-user.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {

  loading: boolean = false;

  tournament!: Tournament;
  usersInTournament!: AuthUser[];

  userJoinedInTournament!: AuthUser;

  get user() {
    return this.authService.getCurrentUser;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private tournamentsService: TournamentsService,
    private authService: AuthService,
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
    
    // Obtenir el current user
    this.authService.getOneUser(this.user.email)
      .subscribe(user => {
        console.log(user)
        this.userJoinedInTournament = user;
      })
  }

  ngAfterViewInit(): void {
    this.tournamentsService.getUsersInTournament(this.tournament.id!)
      .subscribe(users => {
        this.usersInTournament = users
      });
  }

  goBack(): void {
    this.router.navigate(['/tournaments/main']);
  }

  joinTournament() {
    // console.log(this.user.email, this.tournament.id!)

    this.userJoinedInTournament = {
      isJoined: this.userJoinedInTournament.isJoined!,
    }

    console.log(this.userJoinedInTournament);
  
    this.tournamentsService.joinTournament(this.user.email, this.tournament.id!)
      .subscribe(resp => {
        location.reload();
        console.log(resp);
      });
  }

  updateTokens() {

  }
}
