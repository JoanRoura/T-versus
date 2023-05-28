import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Equip } from 'src/app/tournaments/interfaces/equip.interface';
import { Match } from 'src/app/tournaments/interfaces/match.interface';
import { Ronda } from 'src/app/tournaments/interfaces/ronda.interface';
import { TournamentsService } from 'src/app/tournaments/services/tournaments.service';


@Component({
  selector: 'app-see-rounds',
  templateUrl: './see-rounds.component.html',
  styleUrls: ['./see-rounds.component.css']
})
export class SeeRoundsComponent implements OnInit{
  @Input() ronda!: Ronda;
  @Output() rondaEnviada = new EventEmitter<Ronda>();
  

  matchForm: FormGroup;
  matches: Match[] = [];

  constructor(private formBuilder: FormBuilder, private tournamentService: TournamentsService) {

    this.matchForm = this.formBuilder.group({});

  }
  ngOnInit() {
    this.matches = this.ronda.matches;
    // console.log("Asignar matches"+this.ronda.matches)
    for (let i = 0; i < this.matches.length; i++) {
      console.log(this.matches[i]);
      console.log('Ganador:', this.matches[i].ganador.nom);
      console.log('Nombre del ganador:', this.matches[i].ganador?.nom);
    }
  }

  previewExpanded: boolean = false;

  togglePreview() {
    this.previewExpanded = !this.previewExpanded;
  }

  updateRound() {
    this.ronda.estadoRonda = "Cerrada";
    this.tournamentService.updateRonda(this.ronda.tournamentId, this.ronda.roundNumber, this.ronda).subscribe((updatedRound: Ronda) => {
      console.log('Ronda actualizada:', updatedRound);
    });

    this.createNewRound();

    console.log("Hecho");
  }

  createMatches(teams: Equip[]): Match[] {
    const newMatches: Match[] = [];

    for (let i = 0; i < teams.length; i += 2) {

      const team1 = teams[i];
      const team2 = teams[i + 1];

      const equipoGanador: Equip = {
        nom: "null",
        integrantes: [null, null, null, null, null]
      };

      const match: Match = { equipo1: team1, equipo2: team2, ganador: equipoGanador, ganadorSeleccionado: false };

      newMatches.push(match);
    }
    return newMatches;
  }

  createNewRound() {
    const ganadoresRondaAnterior: Equip[] = [];

    if (this.matches) {
      for (const match of this.matches) {
        if (match.ganador) {
          ganadoresRondaAnterior.push(match.ganador);
        }
      }
    }

    const listaMatches = this.createMatches(ganadoresRondaAnterior);

    const rondaCreada: Ronda = {
      roundNumber: this.ronda.roundNumber + 1,
      tournamentId: this.ronda.tournamentId,
      matches: listaMatches,
      estadoRonda: "Abierta",
      teams: ganadoresRondaAnterior
    };

    this.tournamentService.addRound(this.ronda.tournamentId, rondaCreada).subscribe((newRound: Ronda) => {
      console.log('Ronda creada:', newRound);
    });
  }

}


