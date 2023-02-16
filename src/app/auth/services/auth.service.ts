import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl: string = environment.baseUrl 

  constructor(private auth: Auth, private http: HttpClient) { }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }


  //TODO: implemntar auth: Auth
  registerWhitFirebase(user: User) {
    return this.http.post<User>(`${this._baseUrl}/signup`, user);
  }

  
  // //TODO: implemntar auth: Auth
  // registerWhitFirebase(user: User) {
  //   return this.http.post<any>(`${this._baseUrl}/signup`, { email: 'hol123@gmail.cpm', password: '1234567' });
  // }


}
