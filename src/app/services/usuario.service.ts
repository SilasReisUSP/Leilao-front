import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Usuario } from '../models/Usuario';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable()
export class UsuarioService {

  private usuarioUrl = 'http://localhost:2828/'
  
  private tokenSource = new BehaviorSubject('');
  token = this.tokenSource.asObservable();

  constructor(private http: HttpClient) { }

  addUsuario(usuario: Usuario) : Observable<any> {
    return this.http.post<Usuario>(this.usuarioUrl+"cadastro", usuario, httpOptions).pipe();
  }

  fazerLogin(email: string, senha: string) : Observable<any>{
    return this.http.post<Usuario>(this.usuarioUrl+"login", {email, senha}, httpOptions).pipe();
  }

  armazenarDadosLogin(token: string) {
    this.tokenSource.next(token);
  }
}
