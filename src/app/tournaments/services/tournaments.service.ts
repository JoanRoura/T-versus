import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  sendPasswordResetEmail, sendEmailVerification, signOut, signInWithPopup,
  GoogleAuthProvider
} from '@angular/fire/auth';

import { environment } from '../../../environments/environment';

import { Tournament } from '../interfaces/tournaments.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TournamentsService {

  private _baseUrl: string = environment.baseUrl;

  constructor(private auth: Auth, private http: HttpClient) { }


  listTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`${this._baseUrl}/tournaments`);
  }

}
