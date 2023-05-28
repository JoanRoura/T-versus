import { Component, OnInit } from '@angular/core';
import { TournamentsService } from '../../services/tournaments.service';
import { Tournament } from '../../interfaces/tournament.interface';
import { AuthUser } from 'src/app/auth/interfaces/auth-user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  tournaments!: Tournament[];
  userProfile!: AuthUser;
  email:string=""

  constructor(private tournamentsService: TournamentsService, private authService: AuthService) { }

  ngOnInit(): void {

    this.userProfile=this.authService.getCurrentUser;
    console.log("Email"+this.userProfile.email)
    this.email=this.userProfile.email??""

    this.tournamentsService.listTournaments()
      .subscribe(tournaments => {
        this.tournaments = tournaments;
      })
  }
}
