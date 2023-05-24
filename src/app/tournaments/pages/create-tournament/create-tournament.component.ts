import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TournamentsService } from '../../services/tournaments.service';
import { AuthService } from 'src/app/auth/services/auth.service';

import { Tournament } from '../../interfaces/tournament.interface';
import { idGenerated } from '../../utils/gen-tournament-id';

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
      description: description,
      game: "Valorant",
      id: idGenerated().toString(),
      image: 2131165640,
      name: name,
      organizer: this.user.email,
      price: 0,
      type: "unofficial"
    }

    this.tournamentService.createTournament(this.tournamentdb)
      .subscribe(resp => {
        console.log(resp);
      });
  }
}
