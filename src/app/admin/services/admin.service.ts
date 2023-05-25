import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tournament } from 'src/app/tournaments/interfaces/tournament.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private _baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getSuggestionsTournaments(nameTournament: string): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`${this._baseUrl}/get-suggestion-tournaments/${nameTournament}`);

  }

}
