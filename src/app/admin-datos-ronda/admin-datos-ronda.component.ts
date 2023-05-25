import { Component, Input, Output, EventEmitter, OnInit, ViewChildren, QueryList } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminDetallMatchComponent } from '../admin-detall-match/admin-detall-match.component';
import { Match } from '../tournaments/interfaces/match.interface';
import { Ronda } from '../tournaments/interfaces/ronda.interface';
import { Equip } from '../tournaments/interfaces/equip.interface';
import { TournamentsService } from '../tournaments/services/tournaments.service';

@Component({
  selector: 'app-admin-datos-ronda',
  templateUrl: './admin-datos-ronda.component.html',
  styleUrls: ['./admin-datos-ronda.component.css']
})

export class AdminDatosRondaComponent implements OnInit {
  @Input() ronda!: Ronda;
  @Output() rondaEnviada = new EventEmitter<Ronda>();
  @ViewChildren(AdminDetallMatchComponent) matchComponents!: QueryList<AdminDetallMatchComponent>;

  matchForm: FormGroup;
  matches: Match[] | undefined;

  constructor(private formBuilder: FormBuilder, private tournamentService: TournamentsService) {
    this.matchForm = this.formBuilder.group({});
  }

  previewExpanded: boolean = false;

  togglePreview() {
    this.previewExpanded = !this.previewExpanded;
  }
  
  ngOnInit() {
    this.matches = this.ronda.matches;
  }

  equip1: any;
  equip2: any;

  handleWinnerSelected(equipo: any) {
    console.log(equipo);
    if (equipo === this.equip1) {
      console.log(equipo);
    } else if (equipo === this.equip2) {
      console.log(equipo);
    }
  }

  enviarVariable() {
    this.rondaEnviada.emit(this.ronda);
  }

  obtenerGanadores() {
    let i: number = 0;
    let j: number = 0;

    this.matchComponents.forEach((component: AdminDetallMatchComponent) => {
      const ganador = component.obtenerSeleccion();
      console.log('Ganador:', ganador);

      this.ronda.matches[i].ganador = ganador;
      this.ronda.matches[i].ganadorSeleccionado = true;

      if (ganador === undefined) {
        j++;
      } else {
        console.log("Todo correcto");
      }
      i++;
    });

    console.log(this.ronda.matches);
    console.log(j);

    if (j === 0) {
      this.updateRound();
    }
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
