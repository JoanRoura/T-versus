import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';

import { Tournament } from '../../interfaces/tournament.interface';

import { TournamentsService } from '../../services/tournaments.service';
import { AuthUser } from 'src/app/auth/interfaces/auth-user.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';

// interface isJoined2 {
//   idTournament: string;
//   isJoined: boolean;
// }

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {

  loading: boolean = false;

  // msgTournamentButton: isJoined2 = {
  //   idTournament: "",
  //   isJoined: false
  // };

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
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.tournamentsService.getOneTournament(id)),
        // tap(console.log)
      )
      .subscribe((tournament) => {
        this.tournament = tournament
      });

    // Obtenir el current user
    this.authService.getOneUser(this.user.email)
      .subscribe(user => {
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

    if (this.userJoinedInTournament.tokens! < this.tournament.price!) {
      this.toastr.error('No tienes suficientes creditos para ingressar. ', 'Error');
      return;
    }

    if (this.userJoinedInTournament.isJoined == true) {
      this.toastr.error('Ya te has inscrito en un torneo. ', 'Error');
      return;
    }

    this.userJoinedInTournament = {
      isJoined: !this.userJoinedInTournament.isJoined,
      tournament_id: this.tournament.id,
      tokens: this.userJoinedInTournament.tokens! - this.tournament.price!
    }

    console.log(this.userJoinedInTournament.tokens!, this.tournament.price!);

    this.tournamentsService.joinTournament(this.user.email, this.userJoinedInTournament)
      .subscribe(resp => {
        this.toastr.success('Te has unido al torneo. ', 'Success');
        console.log(resp);
        // location.reload();
      });

    // if (this.msgTournamentButton.idTournament != "" && this.msgTournamentButton.isJoined == true) {

    // } else {
    //   this.msgTournamentButton = {
    //     idTournament: this.tournament.id!,
    //     isJoined: true
    //   }
    // }

    // console.log("Id del torneo del user: ", this.msgTournamentButton.idTournament, "\nId del Torneo actual: ", this.tournament.id);
  }

  disjoinTournament() {

    console.log(this.userJoinedInTournament.tournament_id, this.tournament.id)

    if (this.userJoinedInTournament.tournament_id != this.tournament.id) {
      this.toastr.error('No puedes salir de de un torneo del que no estas inscrito. ', 'Error');
      return;
    }

    this.userJoinedInTournament = {
      isJoined: !this.userJoinedInTournament.isJoined,
      tournament_id: "",
      tokens: this.userJoinedInTournament.tokens! + this.tournament.price!
    }

    this.tournamentsService.joinTournament(this.user.email, this.userJoinedInTournament)
      .subscribe(resp => {
        this.toastr.info('Has salido del torneo. ', 'Info');
        console.log(resp);
        // location.reload();
      });
  }

  // userIsJoined(): string {
  //   return (this.msgTournamentButton.isJoined && this.msgTournamentButton.idTournament == this.tournament.id)
  //     ? "Salir del Torneo"
  //     : "Unirse al Torneo";
  // }
}
