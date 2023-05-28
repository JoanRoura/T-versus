import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Equip } from '../../interfaces/equip.interface';

@Component({
  selector: 'app-admin-componente-match',
  templateUrl: './admin-componente-match.component.html',
  styleUrls: ['./admin-componente-match.component.css']
})
export class AdminComponenteMatchComponent {
  @Input() match: any;

  @Output() winnerSelected = new EventEmitter<any>();

  ganadorSeleccionado: string="";
  equipoGanador: Equip | undefined


  ngOnInit() {
    console.log(this.match)
  }

  selectWinner(match: any, event: any) {
    const ganador = event.target.value;
    this.ganadorSeleccionado=ganador

    if (this.ganadorSeleccionado===this.match.equipo1.nom){
      this.equipoGanador=this.match.equipo1
      console.log(this.equipoGanador?.nom)
    }
    if (this.ganadorSeleccionado===this.match.equipo2.nom){
      this.equipoGanador=this.match.equipo2
      console.log(this.equipoGanador?.nom)
    }

  }

  obtenerSeleccion(): Equip|undefined {
    console.log(this.match.equipo1.nom)
    console.log(this.match.equipo2.nom)
    console.log(this.ganadorSeleccionado)
    console.log(this.equipoGanador)
    return this.equipoGanador;

  }
}
