import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TournamentsService } from '../../services/tournaments.service';
import { AuthService } from 'src/app/auth/services/auth.service';

import { Tournament } from '../../interfaces/tournament.interface';
import { idGenerated } from '../../utils/gen-tournament-id';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-tournament',
  templateUrl: './create-tournament.component.html',
  styleUrls: ['./create-tournament.component.css']
})
export class CreateTournamentComponent {

  newTournament: FormGroup;
  tournamentdb!: Tournament;
  selectedModality: string="";
  teamsNumber: string="8";
  errorMessage: string = '';


  onModalityChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedModality = target.value;
  }

  loading: boolean = false;

  get user() {
    return this.authService.getCurrentUser;
  }

  constructor(
    private tournamentService: TournamentsService,
    private fb: FormBuilder,
    private authService: AuthService,private router: Router
   ) {

    this.newTournament = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required]
    });
  }

  //Hacer otro para los torneos por rondas
  createTournament() {
    const name = this.newTournament.value.name;
    const description = this.newTournament.value.description;

    if (!name || !description) {
      this.errorMessage = 'Por favor, completa todos los campos';
      return;
    }

    this.loading = true;

    this.tournamentdb = {
      name: name,
      id: idGenerated().toString(),
      game: "Valorant",
      organizer: this.user.email,
      description: description,
      price: 0,
      type: "unofficial",
      reward: 0,
      image: 2131165640,
      modality: "Individual"
    };


    this.tournamentService.createTournament(this.tournamentdb)
      .subscribe(resp => {
        console.log(resp);
      });

      this.router.navigate(['/tournaments/chose-tournament']);
      //Navigate
  }

  createTournamentEquips() {
    const name = this.newTournament.value.name;
    const description = this.newTournament.value.description;

    if (!name || !description) {
      this.errorMessage = 'Por favor, completa todos los campos';
      return;
    }

    this.loading = true;

    this.tournamentdb = {
      name: name,
      id: this.getTournamentId().toString(),
      game: "Valorant",
      organizer: this.user.email,
      description: description,
      price: 0,
      type: "unofficial",
      rounds: [],
      users: [],
      teamsNumber: +this.teamsNumber,
      reward: 0,
      actualRound: 0,
      image: 2131165640,
      modality: "Teams"
    };

    this.tournamentService.createTeamsTournament(this.tournamentdb)
      .subscribe(resp => {
        console.log(resp);
      });

      //Navigate
      this.router.navigate(['/tournaments/chose-tournament']);
  }

  onNumberOfTeamsChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedModality = target.value;
  }

  getTournamentId(): number {
    const min = 100000;
    const max = 200000000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
