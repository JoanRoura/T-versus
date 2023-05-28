import { Component, OnInit } from '@angular/core';
import { Tournament } from '../../interfaces/tournament.interface';
import { ActivatedRoute } from '@angular/router';
import { TournamentsService } from '../../services/tournaments.service';
import { switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AuthUser } from 'src/app/auth/interfaces/auth-user.interface';

@Component({
  selector: 'app-show-tournaments',
  templateUrl: './show-tournaments.component.html',
  styleUrls: ['./show-tournaments.component.css']
})
export class ShowTournamentsComponent implements OnInit {

  tournaments!: Tournament[];
  tournamentType: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private tournamnetService: TournamentsService,
    private authService: AuthService) { }

    userProfile!: AuthUser;
    email:string=""

  ngOnInit(): void {

    this.userProfile=this.authService.getCurrentUser;
    console.log("Email"+this.userProfile.email)
    this.email=this.userProfile.email??""

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.tournamnetService.getTournamentType(id))
      )
      .subscribe(tournaments => {
        this.tournaments = tournaments;
      });

    this.activatedRoute.params.subscribe(params => {
      this.tournamentType = params['id'];
      console.log(this.tournamentType);
    });
  }
}
