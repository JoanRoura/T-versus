import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TournamentsService } from '../../services/tournaments.service';
import { Tournament } from '../../interfaces/tournament.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-create-tournament',
  templateUrl: './create-tournament.component.html',
  styleUrls: ['./create-tournament.component.css']
})
export class CreateTournamentComponent {

  newTournament: FormGroup;
  tournamentdb!: Tournament;

  loading: boolean = false;

  get user() {
    return this.authService.getCurrentUser;
  }

  constructor(
    private tournamentService: TournamentsService,
    private fb: FormBuilder,
    private authService: AuthService) {

    this.newTournament = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required]
    });
  }

  createTournament() {
    const name = this.newTournament.value.name;
    const description = this.newTournament.value.description;

    this.loading = true;

    this.tournamentdb = {
      name: name,
      id: this.getTournamentId().toString(),
      game: "Valorant",
      organizer: this.user.email,
      description: description,
      price: 0,
      image: 2131165640,
      type: "unofficial",
      rounds: [],
      users: [],
      teamsNumber: 0,
      reward: 0,
      actualRound: 0
    };

    this.tournamentService.createTournament(this.tournamentdb)
      .subscribe(resp => {
        console.log(resp);
      });
  }

  getTournamentId(): number {
    const min = 100000;
    const max = 200000000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
