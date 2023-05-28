import { Equip } from "./equip.interface";
import { Match } from "./match.interface";

export interface Ronda {
  roundNumber: number;
  tournamentId: string;
  estadoRonda: string;
  matches: Match[];
  teams: Equip[];

}




