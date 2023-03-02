import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, getAuth } from '@angular/fire/auth';
import { tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl: string = environment.baseUrl;
  private _user: any | undefined;
  user = this.auth.currentUser;

  constructor(private auth: Auth, private http: HttpClient) { }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // .then(resp => {
  //   this._user = resp.user;
  // }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // sendEmail() {
  //   return sendEmailVerification(_user)
  // }

  // Llistar usuaris de la DB
  listUsers() {
    return this.http.get<any>(`${this._baseUrl}/users`);
  }

  // Crear usuaris a la DB
  createUser(username: string, email: string, password: string, borndate: string) {
    return this.http.post<any>(`${this._baseUrl}/new-user`, {username, email, password, borndate});
  }

  // Obtenir un usuari de la DB
  getOneUser(id: string) {
    return this.http.get<any>(`${this._baseUrl}/edit-user/${id}`);
  }

  // Eliminar usuaris de la DB
  deleteUser(id: string) {
    return this.http.get(`${this._baseUrl}/delete-user/${id}`);
  }

  // Actualitzar usuaris de la DB
  updateUser(id: string, username: string,  email: string, password: string, borndate: string) {
    return this.http.post(`${this._baseUrl}/update-user/${id}`, {username, email, password, borndate});
  }
}
