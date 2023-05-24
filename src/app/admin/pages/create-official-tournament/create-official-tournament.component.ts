import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Tournament } from 'src/app/tournaments/interfaces/tournament.interface';

@Component({
  selector: 'app-create-official-tournament',
  templateUrl: './create-official-tournament.component.html',
  styleUrls: ['./create-official-tournament.component.css']
})
export class CreateOfficialTournamentComponent {

  tournament!: Tournament;

  formNewTournament!: FormGroup;

  tournamentDialog!: boolean;

  tournamentType: boolean = false;


  createTournament() {

  }

}
