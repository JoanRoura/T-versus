import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { AuthUser } from 'src/app/auth/interfaces/auth-user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private _baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  buyTokens(idUser:string, tokens:number): Observable<AuthUser> {
    return this.http.post<AuthUser>(`${this._baseUrl}/buy-tokens/${idUser}`, { tokens });
  } 
}
