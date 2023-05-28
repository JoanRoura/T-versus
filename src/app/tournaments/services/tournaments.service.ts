import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

import { Tournament } from '../interfaces/tournament.interface';
import { Observable } from 'rxjs';
import { AuthUser } from 'src/app/auth/interfaces/auth-user.interface';
import { Ronda } from '../interfaces/ronda.interface';

@Injectable({
  providedIn: 'root'
})
export class TournamentsService {

  private _baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  listTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`${this._baseUrl}/tournaments`);
  }

  getOneTournament(idTournament: string): Observable<Tournament> {
    return this.http.get<Tournament>(`${this._baseUrl}/get-tournament/${idTournament}`);
  }

  createTournament(tournament: Tournament): Observable<Tournament> {
    return this.http.post<Tournament>(`${this._baseUrl}/new-tournament`, tournament);
  }

  createTeamsTournament(tournament: Tournament): Observable<Tournament> {
    return this.http.post<Tournament>(`${this._baseUrl}/new-tournament-teams`, tournament);
  }

  getUsersInTournament(id: string): Observable<AuthUser[]> {
    return this.http.get<AuthUser[]>(`${this._baseUrl}/get-players-by-tournament/${id}`)
  }

  joinTournament(idUser: string, user: AuthUser): Observable<AuthUser> {
    return this.http.post<AuthUser>(`${this._baseUrl}/join-tournament/${idUser}`, user);
  }

  getTournamentType(typeTournament: string): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`${this._baseUrl}/get-tournaments-type/${typeTournament}`);
  }

  deleteTournament(idTournament: string): Observable<Tournament> {
    return this.http.get<Tournament>(`${this._baseUrl}/delete-tournament/${idTournament}`);
  }

  // updateTournament(idTournament: string, tournament: Tournament): Observable<Tournament> {
  //   return this.http.post<Tournament>(`${this._baseUrl}/update-tournament/${idTournament}`, tournament);
  // }

  //Rondes

  getRondes(tournament_id: string): Observable<Ronda[]>{
    return this.http.get<Ronda[]>(`${this._baseUrl}/rounds/${tournament_id}`);
  }

  deleteRondes(tournament_id: string): Observable<Ronda> {
    return this.http.delete<Ronda>(`${this._baseUrl}/deleteRounds/${tournament_id}`);
  }

  updateRonda(tournamentId: string, roundNumber: number, round: Ronda): Observable<Ronda> {
    return this.http.put<Ronda>(`${this._baseUrl}/updateRounds/${tournamentId}/${roundNumber}`, round);
  }
    //Actualizar torneo
  updateTournament(tournamentId: string, tournament: Tournament): Observable<Tournament>{
    return this.http.patch<Tournament>(`${this._baseUrl}/updateTournamentValues/${tournamentId}`,tournament);
  }

  addRound(tournamentId: string, round: Ronda): Observable<Ronda> {
    return this.http.post<Ronda>(`${this._baseUrl}/add-round/${tournamentId}`, round);
  }





}
