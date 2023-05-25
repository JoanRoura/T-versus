import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  sendPasswordResetEmail, sendEmailVerification, signOut, signInWithPopup,
  GoogleAuthProvider
} from '@angular/fire/auth';
// import { AngularFireAuth } from '@angular/fire/compat/auth';

import { environment } from '../../../environments/environment';
import { AuthUser } from '../interfaces/auth-user.interface';
import { FirebaseCodeErrorEnum } from '../utils/firebase-code-error';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl: string = environment.baseUrl;
  private _user: any | undefined;

  get getCurrentUser() {
    return { ...this._user };
  }

  constructor(private auth: Auth, private http: HttpClient) {
    // Obtenir el 'currentUser'
    this.auth.onAuthStateChanged(user => {
      // console.log(user);

      if (user) {
        this._user = user;
      }
    });
  }

  // Gestio de error de Firebase Auth
  codeError(code: string) {
    switch (code) {
      // Correu ja existeix
      case FirebaseCodeErrorEnum.EmailAlreadyInUse:
        return 'El usuario ya existe';

      // Contrasenya debil
      case FirebaseCodeErrorEnum.WeakPassword:
        return 'La contraseña es muy debil';

      // Correo invalid
      case FirebaseCodeErrorEnum.InvalidEmail:
        return 'Correo invalido';

      // El usuari no existeix
      case FirebaseCodeErrorEnum.UserNotFound:
        return 'El usuario no existe';

      // Contrasenya incorrecta
      case FirebaseCodeErrorEnum.WrongPassword:
        return 'Contraseña incorrecta';

      default:
        return 'Error desconocido'
    }
  }

  currentUser() {
    this.auth.onAuthStateChanged(user => {
      console.log(user);

      if (user) {
        this._user = user;

      } else return console.log("No s'ha pogut guardar");
    });
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout() {
    return signOut(this.auth);
  }

  resetEmail(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  verifyMail() {
    return sendEmailVerification(this._user);

    // this.auth.onAuthStateChanged(user => {
    //   console.log(user);

    //   if (user != null) {
    //     return sendEmailVerification(user);
    //   } else return console.log("error");
    // });
  }

  // Llistar usuaris de la DB
  listUsers(): Observable<AuthUser[]> {
    return this.http.get<AuthUser[]>(`${this._baseUrl}/users`);
  }

  // Crear usuaris a la DB
  createUser(user: AuthUser): Observable<AuthUser> {
    return this.http.post<AuthUser>(`${this._baseUrl}/new-user`, user);
  }

  // Obtenir un usuari de la DB
  getOneUser(id: string): Observable<AuthUser> {
    return this.http.get<AuthUser>(`${this._baseUrl}/get-user/${id}`);
  }

  // Eliminar usuaris de la DB
  deleteUser(id: string) {
    return this.http.delete(`${this._baseUrl}/delete-user/${id}`);
  }

  // Actualitzar usuaris de la DB
  updateUser(user: AuthUser) {
    return this.http.post(`${this._baseUrl}/update-user/${user.email}`, user);
  }

  private shopitems = [
    { id: 1, name: 'Puñado de tokens', imageUrl: 'assets/images/ttokens.png', price: 10.0, valor: 1000 },
    { id: 2, name: 'Saco de tokens', imageUrl: 'assets/images/ttokens.png', price: 20.0, valor: 2500 },
    { id: 3, name: 'Caja de tokens', imageUrl: 'assets/images/ttokens.png', price: 50.0, valor: 6000 },
    { id: 4, name: 'Cofre de tokens', imageUrl: 'assets/images/ttokens.png', price: 90.0, valor: 12000 },
  ];

  getShopItems() {
    return this.shopitems;
  }
}

