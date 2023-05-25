import { Ronda } from "./ronda.interface";

export interface Tournament {
  name?:        string;
  id?:          string;
  game?:        string;
  organizer?:   string;
  description?: string;
  price?:       number;
  image?:       number;
  type?:        string;
  rounds?:      Ronda[]
  users:        Map<any, any>[]
  teamsNumber:  number,
  reward:       number,
  actualRound:  number
}
