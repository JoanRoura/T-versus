import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TournamentsService } from '../../services/tournaments.service';
import { Tournament } from '../../interfaces/tournament.interface';

@Component({
  selector: 'app-create-tournament',
  templateUrl: './create-tournament.component.html',
  styleUrls: ['./create-tournament.component.css']
})
export class CreateTournamentComponent {

  newTournament: FormGroup;
  tournamentdb!: Tournament;

  constructor(
    private tournamentService: TournamentsService,
    private fb: FormBuilder) {

    this.newTournament = this.fb.group({
      name: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required]
    });
  }

  createTournament() {
    const name = this.newTournament.value.name;
    const price = this.newTournament.value.price;
    const description = this.newTournament.value.description;

    this.tournamentdb = {
      description: "Hola",
      game: "hola",
      id: "hola",
      image: 2,
      name: "hola",
      organizer: "hola",
      price: 2,
      type: "hola"
    }

    // this.tournamentService.createTournament(this.tournamentdb)
    //   .subscribe(resp => {
    //     console.log(resp);
    //   });
  }
}
