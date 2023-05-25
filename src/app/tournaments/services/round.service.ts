import { Injectable } from '@angular/core';
import { Ronda } from '../interfaces/ronda.interface';


@Injectable({
  providedIn: 'root'
})
export class RondaService {
  rondaActual!: Ronda;

  getRonda(): Ronda {
    return this.rondaActual;
  }

  actualizarRonda(ronda: Ronda): void {
    this.rondaActual = ronda;
  }
}
