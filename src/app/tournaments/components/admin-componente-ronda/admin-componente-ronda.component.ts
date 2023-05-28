import { Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Equip } from '../../interfaces/equip.interface';
import { Match } from '../../interfaces/match.interface';
import { Ronda } from '../../interfaces/ronda.interface';
import { AdminDetallMatchComponent } from '../../pages/tournament/admin-detall-match/admin-detall-match.component';
import { TournamentsService } from '../../services/tournaments.service';
import { AdminComponenteMatchComponent } from '../admin-componente-match/admin-componente-match.component';
import { Tournament } from '../../interfaces/tournament.interface';

@Component({
  selector: 'app-admin-componente-ronda',
  templateUrl: './admin-componente-ronda.component.html',
  styleUrls: ['./admin-componente-ronda.component.css']
})
export class AdminComponenteRondaComponent {
  @Input() torneig!: Tournament;
  @Input() ronda!: Ronda;
  @Output() rondaEnviada = new EventEmitter<Ronda>();
  @ViewChildren(AdminComponenteMatchComponent) matchComponents!: QueryList<AdminComponenteMatchComponent>;

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

    this.matchComponents.forEach((component: AdminComponenteMatchComponent) => {
      const ganador = component.obtenerSeleccion();
      console.log('Ganador:', ganador);

      if (ganador) {
        this.ronda.matches[i].ganador = ganador;
      } else {
        console.log("algo va mal")
      }
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
    console.log("Torneig "+this.torneig.actualRound)
    if (this.torneig.actualRound !== undefined) {
      this.torneig.actualRound=this.torneig.actualRound+1
    }

    console.log("Torneig "+this.torneig.actualRound)
    this.tournamentService.updateTournament (this.ronda.tournamentId,this.torneig)
      .subscribe(resp => {
        console.log(resp);
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
