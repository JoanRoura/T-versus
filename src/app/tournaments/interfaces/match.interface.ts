import { Equip } from "./equip.interface";

export interface Match {
  equipo1: Equip,
  equipo2: Equip,
  ganador: Equip,
  ganadorSeleccionado: Boolean
}
