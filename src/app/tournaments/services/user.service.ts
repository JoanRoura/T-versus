import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  sendPasswordResetEmail, sendEmailVerification, signOut, signInWithPopup,
  GoogleAuthProvider
} from '@angular/fire/auth';

import { environment } from '../../../environments/environment';

import { Tournament } from '../interfaces/tournament.interface';
import { Observable } from 'rxjs';
import { AuthUser } from 'src/app/auth/interfaces/auth-user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _baseUrl: string = environment.baseUrl;

  constructor(private auth: Auth, private http: HttpClient) { }

  buyTokens(idUser:string, tokens:number){
    return this.http.post<AuthUser>(`${this._baseUrl}/buy-tokens/${idUser}`,{ tokens });
  } 

}