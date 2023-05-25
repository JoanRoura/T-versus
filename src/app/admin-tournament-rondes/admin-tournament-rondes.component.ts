import { Component, Input } from '@angular/core';
import { TournamentsService } from 'src/app/tournaments/services/tournaments.service';
import { Tournament } from '../tournaments/interfaces/tournament.interface';
import { Ronda } from '../tournaments/interfaces/ronda.interface';

@Component({
  selector: 'app-admin-tournament-rondes',
  templateUrl: './admin-tournament-rondes.component.html',
  styleUrls: ['./admin-tournament-rondes.component.css']
})
export class AdminTournamentRondesComponent {
  @Input() tournamentId: string="";

  constructor(private tournamentService: TournamentsService) {
    this.listarTorneos()
  }

  tournament: any
  onClickButton(ronda:Ronda) {

    console.log(ronda);
  }

  listarTorneos(): void {
    this.tournamentService.listTournaments().subscribe((tournaments: Tournament[]) => {

    console.log(tournaments);
     this.tournament = tournaments.find(tournament => tournament.id == this.tournamentId);

        if (this.tournament) {
          const tournamentId = this.tournament.id;
          console.log(tournamentId);

          this.tournamentService.getRondes(tournamentId??"0").subscribe((rondas: Ronda[]) => {
            // Actualizar el campo "rondas" del torneo con lo que devuelve getRondes
            this.tournament.rounds = rondas;

            console.log("Torneo actualizado con las rondas:");
            console.log(this.tournament);
          }, (error) => {
            // Manejar el error de getRondes
            console.error("Error al obtener las rondas del torneo:", error);
          });


        }
    }, (error) => {
      // Manejar el error
      console.error(error);
    });
  }

  manejarCambios(ronda: Ronda) {
    console.log('Ronda modificada:', ronda);

  }
}
