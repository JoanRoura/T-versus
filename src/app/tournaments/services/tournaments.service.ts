import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

import { Tournament } from '../interfaces/tournament.interface';
import { Observable } from 'rxjs';
import { AuthUser } from 'src/app/auth/interfaces/auth-user.interface';

@Injectable({
  providedIn: 'root'
})
export class TournamentsService {

  private _baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  listTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`${this._baseUrl}/tournaments`);
  }

  getOneTournament(id: string): Observable<Tournament> {
    return this.http.get<Tournament>(`${this._baseUrl}/get-tournament/${id}`);
  }

  createTournament(tournament: Tournament): Observable<Tournament> {
    return this.http.post<Tournament>(`${this._baseUrl}/new-tournament`, tournament);
  }

  getUsersInTournament(id: string): Observable<AuthUser[]> {
    return this.http.get<AuthUser[]>(`${this._baseUrl}/get-players-by-tournament/${id}`)
  }

  joinTournament(idUser: string, user: AuthUser): Observable<AuthUser> {
    return this.http.post<AuthUser>(`${this._baseUrl}/join-tournament/${idUser}`, user);
  }

  getTournamentType(type: string): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`${this._baseUrl}/get-tournaments-type/${type}`);
  }
}
