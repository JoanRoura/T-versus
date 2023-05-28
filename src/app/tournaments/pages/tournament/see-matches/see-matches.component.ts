import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Equip } from 'src/app/tournaments/interfaces/equip.interface';
import { Match } from 'src/app/tournaments/interfaces/match.interface';

@Component({
  selector: 'app-see-matches',
  templateUrl: './see-matches.component.html',
  styleUrls: ['./see-matches.component.css']
})
export class SeeMatchesComponent implements OnInit{
  @Input() match!: Match;
  @Output() winnerSelected = new EventEmitter<any>();

  ganadorSeleccionado: string="";
  equipoGanador: Equip | undefined


  ngOnInit() {
    console.log("AAA"+this.match.ganador.nom)
  }

  selectWinner(match: any, event: any) {
    const ganador = event.target.value;
    this.ganadorSeleccionado=ganador
    if (this.ganadorSeleccionado===this.match.equipo1.nom){
      this.equipoGanador=this.match.equipo1
    }
    if (this.ganadorSeleccionado===this.match.equipo2.nom){
      this.equipoGanador=this.match.equipo2
    }
  }

  obtenerSeleccion(): any {
    console.log(this.match.equipo1.nom)
    console.log(this.match.equipo2.nom)
    console.log(this.match.ganador?.nom ?? 'Valor predeterminado');
    console.log(this.equipoGanador)

  }
}

